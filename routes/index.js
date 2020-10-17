const express = require('express');
const router = express.Router();
const bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({extended: true}));
const User = require('./users');													//- user 스키마 가져오기


//- mongoDB 연결
const mongoose = require('mongoose');
const dbURL = 'mongodb+srv://paperadmin:trust@paperdb.81owx.gcp.mongodb.net/paperDB?retryWrites=true&w=majority';
mongoose.set('useCreateIndex', true);
mongoose.connect(dbURL,{ useNewUrlParser: true,  useUnifiedTopology: true });
mongoose.connection.on('error', console.error.bind(console, "connection error:"));
mongoose.connection.once('open', () => {
	console.log("DB connected");
});


//- 세션, 쿠키
const session = require('express-session');
const connectMongo = require('connect-mongo')(session);
router.use(session({
	secure: true,
	HttpOnly: true,
  secret: '1938haehgoqeuq8yqetjkhakdf',
  resave: false,
  saveUninitialized: true,
	store: new connectMongo({url: dbURL,collection: 'sessions'}),
	cookie: { maxAge: 1000*60*60*10*10 }
}));


//- 패스포트 로그인 구현
const passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;

router.use(passport.initialize());
router.use(passport.session());
const flash = require('connect-flash');										//- Flash 메시지 사용. 세션에 1회성 저장되는 key:value 생성
router.use(flash());

passport.serializeUser(function(user, done) {
  done(null, { nick: user.nick, hospital: user.hospital[0].name });
});
passport.deserializeUser(function(user, done) {
    done(null, user);
});

passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function(err, user) {
			console.log(user);
      if (err) { return done(err); }
			//- passport.done()의 3번째 인자 'message'의 value는 Flash()로 호출가능
      if (!user) { return done(null, false, { message: '이메일을 확인해주세요' }) }
      if (user.password !== password) { return done(null, false, { message: '비밀번호를 확인해주세요' }) }
      return done(null, user);
    });
  }
));

router.post('/auth',
  passport.authenticate('local', { failureRedirect: '/', failureFlash: true }),
	function(req, res) {
		req.session.save(function(){
			res.redirect('/')
		})
	}
);


//- 메인 페이지
router.get('/', function(req, res) {
	if(req.isAuthenticated()) {
		let user = req.session.passport.user;
		res.render(
			'paper',
			{ nick: user.nick, hospital: user.hospital }
	)} else	{
			let flashMessage = req.flash();														//- 인증실패시 생성된 flash 메시지 읽어옴
			let note= null;																						//- '/'로 처음 접속시 flash 메시지 없음
			if(flashMessage.error) { note= flashMessage.error[0] }
			res.render( 'index', { note: note } )
		}
});


//- 로그아웃
router.get('/logout', function(req, res) {
	req.logout();
	res.redirect('/')
});


//- 회원가입
router.get('/signup', function(req, res) {
  res.render('signup');
});

router.post("/usersignup", (req, res, next) => {
	console.log(req.body);
  User.find({ username: req.body.username })
  	.exec().then(user => {
      if (user.length >= 1) {
        res.send('<script type="text/javascript">alert("이미 존재하는 이메일입니다."); window.location="/signup"; </script>');
      } else {
        let newUser = new User({
        	_id: new mongoose.Types.ObjectId(),
					date: Date.now(),
          username: req.body.username,
          password: req.body.password,
					name: req.body.name,
					nick: req.body.nick,
					tel: req.body.tel,
					license: req.body.license,
					hospital: req.body.hospital
        });
      	newUser.save().then(result => {
        	console.log(result);
        	res.redirect("/");
      	})
        	.catch(err => { console.log(err) });
      }
    });
});




module.exports = router;
