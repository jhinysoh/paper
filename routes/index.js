const express = require('express');
const router = express.Router();


//- mongoDB 연결
const mongoose = require('mongoose');
const dbURL = 'mongodb+srv://sohvet:no1.trust@paperdb.81owx.gcp.mongodb.net/paperDB?retryWrites=true&w=majority';
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

passport.serializeUser(function(user, done) {
  done(null, { id: user.id, nick: user.nick, hospital: user.hospital[0].name });
});
passport.deserializeUser(function(user, done) {
    done(null, user);
});

const User = require('./users');

passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function(err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false, { message: 'Incorrect username.' }) }
      if (!user.validPassword(password)) { return done(null, false, { message: 'Incorrect password.' }) }
      return done(null, user);
    });
  }
));

router.post('/auth',
  passport.authenticate('local', {failureRedirect: '/'}),
	function(req,res){
		req.session.save(function(){
			res.redirect('/')
		})
	}
);


//- 로그아웃
router.get('/logout', function(req, res) {
	req.logout();
	req.session.save(function(){
		res.redirect('/')
	})
});


//- 메인 페이지
router.get('/', function(req, res) {
	console.log(req.session);
	if(req.isAuthenticated()) {
		let user = req.session.passport.user;
		res.render(
			'paper',
			{ nick: user.nick, hospital: user.hospital }
		)}
	else {	res.render('index') }
});


//- GET 회원가입
router.get('/signup', function(req, res) {
  res.render('signup');
});


//- POST 회원가입



module.exports = router;
