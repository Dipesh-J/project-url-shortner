const axios = require("axios");
const urlModel = require("../model/urlModel");
const shortid = require("shortid");
const redis = require("redis");
const isUrl = require("is-valid-http-url");

const redisClient = redis.createClient({
  password: "FGmkeqY4cCrwW8rDaSHSHYQVZwOWJlHb",
  socket: {
    host: "redis-10549.c302.asia-northeast1-1.gce.cloud.redislabs.com",
    port: 10549,
  },
});
const newLocal = "Connected to redis db";
redisClient.connect(console.log(newLocal));

// CREATE API
exports.createUrl = async (req, res) => {
  try {
    const { longUrl } = req.body;
    // CHECKING IF THE REQUEST BODY IS EMPTY
    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({
        message: "Please provide a longUrl",
      });
    }
    // CHECKING IF THE URL IS VALID USING REGEX
    if (!isUrl(longUrl)) {
      return res.status(400).json({
        message: "Please provide a valid longUrl",
      });
    }
    // CHECKING IF THE URL EXISTS IN REALITY
    let checkUrlExistence = await axios
      .get(longUrl)
      .then(() => longUrl)
      .catch(() => null);
    if (!checkUrlExistence) {
      return res.status(404).json({
        message: "This longUrl does not exist",
      });
    }
    // CHECKING IF THE URL FOR THE LONG URL PROVIDED IS PRESENT IN CACHE
    const cacheCheck = await redisClient.get(longUrl);
    if (cacheCheck) {
      return res.status(200).json({
        data: JSON.parse(cacheCheck), // CONVERTING THE DATA INTO JSON FORMAT
      });
    }
    // CHECKING IF THE URL FOR THE LONG URL PROVIDED IS PRESENT IN MONGO-DB
    const mongoCheck = await urlModel.findOne({ longUrl: longUrl });
    if (mongoCheck) {
      return res.status(200).json({
        data: mongoCheck,
      });
    }
    // NOW CREATING THE SHORT URL AS IT IS NOT FOUND IN ANY OF THE DB
    const shortUrlCode = shortid.generate().toLocaleLowerCase();

    // `shortUrlCode` RETURNS A CODE WHICH IS NEEDS TO BE WRITTEN AFTER THE localhost:3000/
    // SO, SETTING THE NEW SHORT URL INSIDE THE REQUEST BODY
    req.body.urlCode = shortUrlCode;
    req.body.shortUrl = `http://localhost:3000/${shortUrlCode}`;

    // STORING THE SHORT URL IN BOTH CACHE AND MONGO-DB
    const createShortUrl = await urlModel.create(req.body);

    // CREATING A SEPARATE OBJECT FOR CREATING DATA IN REDIS
    let urls = {
      shortUrlCode: shortUrlCode,
      longUrl: longUrl,
      shortUrl: `http://localhost:3000/${shortUrlCode}`,
    };
    await redisClient.setEx(longUrl, 60, JSON.stringify(urls)); // CONVERTING INTO STRING AND PROVIDING AN EXPIRY OF 60 SECONDS

    return res.status(201).json({
      data: urls,
    });
  } catch (error) {
    return res.sendStatus(500);
  }
};

exports.getUrl = async function (req, res) {
  try {
    let shortUrlCode = req.params.shortUrlCode;

    // GETTING DATA FROM REDIS (CACHING) SERVER
    let cachedData = await redisClient.get(shortUrlCode);
    if (cachedData) return res.status(302).redirect(cachedData);

    // CHECKING IF SHORT URL CODE IS PRESENT IN DB
    let foundurl = await urlModel.findOne({ shortUrlCode: shortUrlCode });
    if (!foundurl)
      return res.status(404).json({ message: "Short Url doesn't exist in DB" });

    // SET DATA TO REDIS (CACHE) SERVER
    await redisClient.set(shortUrlCode, foundurl.longUrl);
    await redisClient.expire(shortUrl, 60); // SET TO EXPIRE IN 60 SECONDS

    return res.status(302).redirect(foundurl.longUrl);
  } catch (error) {
    return res.sendStatus(500);
  }
};
