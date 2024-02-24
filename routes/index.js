var express = require('express')
var router = express.Router()

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'CI/CD with Github Actions, Docker, GCP Cloud Run' })
})

module.exports = router
