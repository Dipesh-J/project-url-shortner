const { createUrl } = require('../conttroller/urlShortnerController')

const router = require('express').Router()

router.post('/createShortUrl', createUrl)

module.exports = router