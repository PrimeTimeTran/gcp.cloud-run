var express = require('express')
var router = express.Router()

/* GET home page. */
router.get('/', function (req, res, next) {
  const resp = {


  }
  res.render('index', resp)
})

module.exports = router
