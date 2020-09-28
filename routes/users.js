var express = require('express');
var router = express.Router();
const mongoose = require("mongoose");

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


// 병원정보
var hospital = new mongoose.Schema({
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

//회원정보
var member = new mongoose.Schema({
  id: { type: Number, unique: true },    		//아이디
	date: Date,                            		//가입일
  email: { type: String, unique: true },		//이메일
	name: String,                          		//이름
	nick: { type:String, unique: true },	  	//닉네임
	tel: [ Number ],                       		//전화번호
	hospital: [ Number ]                     	//소속병원 id
});

// 고객정보
var client = new mongoose.Schema({
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

module.exports = mongoose.model("hospital", hospital);
module.exports = mongoose.model("member", member);
module.exports = mongoose.model("client", client);
module.exports = router;
