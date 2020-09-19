var express = require('express');
var router = express.Router();

const c_index = require('../controller/index');

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });
router.get('/', c_index.get);

module.exports = router;
