//- mongoDB 연결
require('dotenv').config();																											//- db주소와 계정등은 .env 환경변수에 저장
const mongoose = require('mongoose');
const dbURL = process.env.dbURL;
mongoose.set('useCreateIndex', true);
mongoose.connect(dbURL, {useNewUrlParser:true,useUnifiedTopology:true});
mongoose.connection.on('error', console.error.bind(console, "connection error:"));
mongoose.connection.once('open', ()=> console.log("DB connected") );


// 회원(user)정보
const user = new mongoose.Schema({
	date: Date,																																		//-가입일
  email: { type: String,	unique: true },																				//- 이메일
	password: Object,
	name: String,																																	//- 이름
	nick: { type: String, unique: true },																					//- 닉네임
	tel: String,																																	//- 전화번호
	license: { type: String, unique: true },																			//- 면허번호
	hospital: Object																																//- 소속병원 id, 직위, 직급
});

const hospital = new mongoose.Schema({
	date: Date,
	name: String,
	bizNumber: String,
	address: String,
	tel: String,
	email: String,
	chiefName: String,
	chiefTel: String,
	bizCert: {data:Buffer,contentType:String},
	hosCert: {data:Buffer,contentType:String},
	logo: {data:Buffer,contentType:String}
});


module.exports = {
    User: mongoose.model('user',user),
    Hospital: mongoose.model('hospital',hospital)
}
