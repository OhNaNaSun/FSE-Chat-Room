var express = require('express');
var router = express.Router();
const path = require('path');
/* GET home page. */
router.get('/', function (req, res, next) {
	res.render('index', { title: 'Chat Room Login' });
});
router.get('/chatRoom', function (req, res, next) {
	res.render('chatRoom.ejs', { title: 'Chat Room' });
});
module.exports = router;
