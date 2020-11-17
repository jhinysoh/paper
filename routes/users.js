const mongoose = require("mongoose");


// 직원(user)정보
const user = new mongoose.Schema({
	date: Date,                            		//가입일
  email: { type: String,	unique: true },						//이메일
	password: Object,
	name: String,                          		//이름
	nick: { type: String, unique: true },				  	//닉네임
	tel: String													,			//전화번호
	license: { type: Number, unique: true },	//면허번호
	hospital: Array	          								//소속병원 id, 직위, 직급
});
module.exports = mongoose.model("users", user);
