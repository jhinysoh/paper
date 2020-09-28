var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var fs = require('fs');

//- GET home page
router.get('/', function(req, res, next) {
  res.render('index');
});

//- GET 회원가입
router.get('/signup', function(req, res, next) {
  res.render('signup');
});

//- mongoDB 연결
mongoose.connect('mongodb+srv://sohvet:no1.trust@paperdb.81owx.gcp.mongodb.net/paperDB?retryWrites=true&w=majority', { useNewUrlParser: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, "connection error:"));
db.once('open', () => {
	console.log("DB connected");
});

module.exports = router;
