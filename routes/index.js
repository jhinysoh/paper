var express = require('express');
var session = require('express-session');
var FileStore = require('session-file-store')(session);
var router = express.Router();


//- mongoDB 연결
var mongoose = require('mongoose');
mongoose.connect('mongodb+srv://sohvet:no1.trust@paperdb.81owx.gcp.mongodb.net/paperDB?retryWrites=true&w=majority', { useNewUrlParser: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, "connection error:"));
db.once('open', () => {
	console.log("DB connected");
});


//- 세션 사용
router.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
	store: new FileStore()
}));


//- 로그인
var authData = { email: 'jhinysoh@gmail.com', password:'trust', nickname: 'jk' }
router.post('/auth', function(req, res){
	var post = req.body;
	var email = post.email;
	var password = post.pw;
	if(email===authData.email && password===authData.password){
		res.redirect ('paper');
	} else {  }
});

//- GET home page
router.get('/', function(req, res, next) {
	console.log(req.session);
	if(req.session.num === undefined) {
		req.session.num = 1;
	} else { req.session.num++;}
  res.render('index');
});


//- GET 회원가입
router.get('/signup', function(req, res, next) {
  res.render('signup');
});


//- GET 페이퍼
router.get('/paper', function(req, res, next) {
  res.render('paper');
});



module.exports = router;
