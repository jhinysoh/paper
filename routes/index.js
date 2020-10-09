var express = require('express');
var session = require('express-session');
var router = express.Router();


//- mongoDB 연결
var mongoose = require('mongoose');
mongoose.connect('mongodb+srv://sohvet:no1.trust@paperdb.81owx.gcp.mongodb.net/paperDB?retryWrites=true&w=majority',
	{ useNewUrlParser: true,  useUnifiedTopology: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, "connection error:"));
db.once('open', () => {
	console.log("DB connected");
});


//- 세션 사용
var connectMongo = require('connect-mongo')(session);
router.use(session({
  secret: '1938haehgoqeuq8yqetjkhakdf',
  resave: false,
  saveUninitialized: true,
	store: new connectMongo({
		url: 'mongodb+srv://sohvet:no1.trust@paperdb.81owx.gcp.mongodb.net/paperDB?retryWrites=true&w=majority',
		collection: 'sessions'
	}),
	cookie: { maxAge: 1000*60*60 }
}));


//- 메인 페이지
router.get('/', function(req, res) {
	if(req.session.loggedin===true) { res.render('paper') }
	else { req.session.destroy(); res.render('index'); }
});


//- 로그인
var authData = { email: '1', password:'1', nickname: 'jk' }

router.post('/auth', function(req, res){
	var email = req.body.email;
	var password = req.body.pw;
	if(email===authData.email && password===authData.password){
		req.session.loggedin = true;
		req.session.nickname = authData.nickname;
		res.redirect('/');
	} else {	}
});

//- 로그아웃
router.get('/logout', function(req, res) {
	req.session.destroy();
	res.redirect('/');
});


//- GET 회원가입
router.get('/signup', function(req, res) {
  res.render('signup');
});




module.exports = router;
