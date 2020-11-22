const express = require('express');
const router = express.Router();
const bodyParser = require("body-parser");							//- post로 전송받은 form값을 파싱
router.use(bodyParser.urlencoded({extended: true}));
const crypto = require('crypto');   								//- 암호화 미들웨어
const User = require('./users');									//- user 스키마 가져오기
require('dotenv').config(); 										//- db주소와 계정등은 .env 환경변수에 저장


//- mongoDB 연결
const mongoose = require('mongoose');
const dbURL = process.env.dbURL;
mongoose.set('useCreateIndex', true);
mongoose.connect(dbURL, {useNewUrlParser:true,useUnifiedTopology:true});
mongoose.connection.on('error', console.error.bind(console, "connection error:"));
mongoose.connection.once('open', ()=> console.log("DB connected") );


//- 세션, 쿠키
const session = require('express-session');
const connectMongo = require('connect-mongo')(session);
router.use(session({
	secure: true,
	HttpOnly: true,
    secret: '1938haehgoqeuq8yqetjkhakdf',
    resave: false,
    saveUninitialized: true,
	store: new connectMongo({url:dbURL,collection:'sessions'}),
	cookie: {maxAge:1000*60*60*10*10}
}));


//- 패스포트 로그인 구현
const passport = require('passport'), LocalStrategy = require('passport-local').Strategy;
router.use(passport.initialize());
router.use(passport.session());
const flash = require('connect-flash');								//- Flash 메시지 사용. 세션에 1회성 저장되는 key:value 생성
router.use(flash());

//- 세션에 저장하고 이용하고 유지할 항목으로 유저닉네임, 소속병원이름 사용
passport.serializeUser( (user, done)=> done(null, {nick:user.nick,hospital:user.hospital[0].name}) );
passport.deserializeUser( (user, done)=> done(null, user) );

passport.use(new LocalStrategy(
	usernameField = 'email',						    			//- 로그인아이디로 이메일주소 사용
    (username, password, done)=>{
        User.findOne( {email:username}, (err, user)=>{
			if(err) return done(err)
			//- passport.done()의 3번째 인자 'message'의 value는 Flash()로 호출가능
			if(!user) return done(null, false, {message:'이메일을 확인해주세요'})
			//- crypto+salt 암호화, 64비트길이의 salt 랜덤생성 -> base64문자열 salt로 변경
			//- salt 108616번 반복, 비밀번호길이 64, 해시알고리즘 sha512
			crypto.pbkdf2(password, user.password.salt, 8616, 64, 'sha512', (err, key)=>{
				if (user.password.key===key.toString('base64')) return done(null, user)
				else return done(null, false, {message:'비밀번호를 확인해주세요'})
			})
  	    })
    }
));

router.post('/auth',
    passport.authenticate('local', { failureRedirect:'/', failureFlash:true }),
    //- successRedirect를 사용하지 않는 이유는 세션저장 전에 리디렉트되는 오류를 방지하기 위함임
	function(req, res) { req.session.save( ()=> res.redirect('/') ) }
);


//- 메인 페이지
router.get('/', (req, res)=>{
	if(req.isAuthenticated()) {
		let user = req.session.passport.user;
        res.render('paper',	{nick:user.nick,hospital:user.hospital})
    } else{
		let flashMessage = req.flash();								//- 인증실패시 생성된 flash 메시지 읽어옴
		let note= null;												//- '/'로 처음 접속시 flash 메시지 없음
		if(flashMessage.error) note = flashMessage.error[0]
		res.render( 'index', {note:note} )
	}
});


//- 로그아웃
router.get('/logout', (req, res)=>{
	req.logout();
	res.redirect('/')
});


//- 회원가입
router.post("/usersignup", (req, res, next)=>{
    User.findOne({email:req.body.email}).exec().then(user=>{
        //- crypto+salt 암호화, 64비트길이의 salt 랜덤생성 -> base64문자열 salt로 변경
        //- salt 108616번 반복, 비밀번호길이 64, 해시알고리즘 sha512
        crypto.randomBytes(64, (err, buf)=>{
            crypto.pbkdf2(req.body.password, buf.toString('base64'), 8616, 64, 'sha512', (err, key)=>{
                let newUser = new User({
                    _id: new mongoose.Types.ObjectId(),
                    date: Date.now(),
                    email: req.body.email,
                    password: { key: key.toString('base64'), salt: buf.toString('base64') },
                    name: req.body.name,
                    nick: req.body.nick,
                    tel: req.body.tel,
                    license: req.body.license,
                    hospital: req.body.hospital
                });
                newUser.save( res.redirect("/") ).catch( err=> console.log(err) )
            })
        })
    })
});


const webSocket = require('ws').Server;
const wss = new webSocket( {port:12506} );
wss.on('connection', (ws, req)=>{
    console.log('socket on');
    let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;        // 사용자이 ip 파악
    console.log(ip+' 접속');
});



module.exports = router;