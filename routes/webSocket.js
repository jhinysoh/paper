const wsModule = require('ws');
const {User} = require('./mongoDB');
const {Hospital} = require('./mongoDB');

const server = function(_server){
	const wss = new wsModule.Server( {server:_server} );								//- 웹소켓 서버 생성
	wss.on('connection', (ws,req)=>{													//- 클라이언트 접속시
		let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;		//- 사용자이 ip 파악
		console.log(ip+' connected');
		ws.on('message', msg=>{															//- 메세지를 받았을때
			let message = JSON.parse(msg);
			if(message.findEmail){														//- 이메일 중복 확인
				console.log(message);
				User.findOne( {email:message.findEmail} ).exec()
				.then(user=>{
					if(user) ws.send(JSON.stringify( {'findEmail':true} ) );
					else ws.send(JSON.stringify( {'findEmail':false} ))
				})
			}
			if(message.findTel){														//- 휴대전화번호 중복 확인
				User.findOne( {tel:message.findTel} ).exec()
				.then(user=>{ 
					if(user) ws.send(JSON.stringify( {findTel:true} ));
					else ws.send(JSON.stringify( {findTel:false} ))
				})
			}
			if(message.findNick){														//- 닉네임 중복 확인
				User.findOne( {nick:message.findNick} ).exec()
				.then(user=>{ 
					if(user) ws.send(JSON.stringify( {findNick:true} ));
					else ws.send(JSON.stringify( {findNick:false} ))
				})
			}
			if(message.findLicense){													//- 면허번호 중복 확인
				User.findOne( {license:message.findLicence} ).exec()
				.then(user=>{ 
					if(user) ws.send(JSON.stringify( {findTel:true} ));
					else ws.send(JSON.stringify( {findTel:false} ))
				})
			}
			if(message.findBizNumber){													//- 사업자번호 중복 확인
				User.findOne( {bizNumber:message.findBizNumber} ).exec()
				.then(user=>{ 
					if(user) ws.send(JSON.stringify( {findBizNumber:true} ));
					else ws.send(JSON.stringify( {findBizNumber:false} ))
				})
			}
		});
		ws.on('error', error=>{ console.log(ip+' error on connection : '+error) });		//- 오류발생시
		ws.on('close', ()=>{ console.log(ip+' connection closed') })					//- 접속종료시
    })
}

module.exports = server