//const express = require('express');
//const router = express.Router();
const mongoose = require("mongoose");

/*
// 병원정보
const Hospital = new mongoose.Schema({
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
module.exports = mongoose.model("hospitals", Hospital);
*/

// 직원(user)정보
const user = new mongoose.Schema({
	date: Date,                            		//가입일
  usernamee: { type: String, unique: true },	//이메일
	password: String,
	name: String,                          		//이름
	nick: { type: String, unique: true },	  	//닉네임
	tel: { type: String, unique: true },			//전화번호
	license: { type: Number, unique: true },	//면허번호
	hospital: Array	          								//소속병원 id, 직위, 직급
});
module.exports = mongoose.model("users", user);

/*
// 고객정보
const Client = new mongoose.Schema({
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
module.exports = mongoose.model("clients", Client);


module.exports = router;
*/
