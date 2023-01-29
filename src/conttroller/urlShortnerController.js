const axios = require("axios");
const urlModel = require("../model/urlModel");
const shortid = require("shortid");
const redis = require("redis");
const isUrl = require("is-valid-http-url");

const redisClient = redis.createClient({
  url: "redis://default:gH0KO2hLTaTUPI90peT5flEYaFDq6Utr@redis-17012.c212.ap-south-1-1.ec2.cloud.redislabs.com:17012",
});
redisClient.connect(console.log("Connected to redis db"));

// CREATE API
exports.createUrl = async (req, res) => {
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
  req.body.shortUrl = `http://llocalhost:3000/${shortUrlCode}`;

  // STORING THE SHORT URL IN BOTH CACHE AND MONGO-DB
  const createShortUrl = await urlModel.create(req.body);

  // CREATING A SEPARATE OBJECT FOR CREATING DATA IN REDIS
  let urls = {
    shortUrlCode: shortUrlCode,
    longUrl: longUrl,
    shortUrl: `http://llocalhost:3000/${shortUrlCode}`,
  };
  await redisClient.setEx(longUrl, 60, JSON.stringify(urls)); // CONVERTING INTO STRING AND PROVIDING AN EXPIRY OF 60 SECONDS

  return res.status(201).json({
    data: urls,
  });
};
