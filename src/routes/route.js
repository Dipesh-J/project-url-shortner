const { createUrl, getUrl } = require("../conttroller/urlShortnerController");
const router = require("express").Router();

// TO CREATE SHORTENED URL
router.post("/createShortUrl", createUrl);

// TO FETCH THE SHORTENED URL
router.get("/:shortUrlCode", getUrl);

router.get("/*", function (req, res) {
  return res.status(400).send("Provided route url is wrong");
});
module.exports = router;