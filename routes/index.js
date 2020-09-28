var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

// mongoDB 연결
mongoose.connect('mongodb+srv://sohvet:no1.trust@paperdb.81owx.gcp.mongodb.net/paperDB?retryWrites=true&w=majority', { useNewUrlParser: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, "connection error:"));
db.once('open', () => {
	console.log("DB connected");
});

var Schema = mongoose.Schema;

var hospital = new Schema({
	id: { type: Number, unique: true },    		//아이디
	number: { type: Number, unique: true },		//사업자번호
	date: Date,                            		//가입일
	name: String,                          		//병원명
	adress: String,		                        //주소
	tel: [ Number ],                          //전화번호
	fax: [ Number ],                       		//팩스번호
	email: [ String ],                     		//이메일
	member: { id: Number,                     //직원정보(아이디, 직위, 등급)
            position: String,
            class: String }
});

var member = new Schema({
  id: { type: Number, unique: true },    		//아이디
	date: Date,                            		//가입일
  email: { type: String, unique: true },		//이메일
	name: String,                          		//이름
	nick: { type:String, unique: true },	  	//닉네임
	tel: [ Number ],                       		//전화번호
	hospital: [ Number ]                     	//소속병원 id
});

var client = new Schema({
	id: Number,                            		//아이디
	date: Date,                            		//가입일
	member: { name: String,                 //이름, 닉네임, 이메일, 전화번호
              nick: String,
              email: String,
              tel: Number },
	memo: String,                             //메모
	hospital: [ Number ],                    	//가입병원 id
	pet: { id: Number,                      //마이크로칩번호, 동물이름, 종, 품종, 성별, 생년월일, 특징, 상태
          chip: Number,
          name: String,
          species: String,
          breed: String,
          sex: String,
          birth: Date,
          character: String,
          status: String }
});


module.exports = router;
