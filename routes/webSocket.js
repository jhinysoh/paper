const wsModule = require('ws');
const {User} = require('./mongoDB');
const {Hospital} = require('./mongoDB');

const server = function(_server){
	const wss = new wsModule.Server( {server:_server} );													//- 웹소켓 서버 생성
	wss.on('connection', (ws,req)=>{																							//- 클라이언트 접속시
		let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;		//- 사용자이 ip 파악
		console.log(ip+' connected');
		ws.on('message', evt=>{																											//- 메세지를 받았을때
			let msg= JSON.parse(evt);
			console.log(msg);
			if(msg.userEmail){																										//- 이메일 중복 확인
				User.findOne( {email:msg.userEmail} ).exec().then(user=>{
					if(user) ws.send(JSON.stringify( {userEmail:true} ) );
					else ws.send(JSON.stringify( {userEmail:false} ))
				})
			}
			if(msg.userTel){																											//- 휴대전화번호 중복 확인
				User.findOne( {tel:msg.userTel} ).exec().then(user=>{
					if(user) ws.send(JSON.stringify( {userTel:true} ));
				})
			}
			if(msg.userNick){																											//- 닉네임 중복 확인
				User.findOne( {nick:msg.userNick} ).exec().then(user=>{
					if(user) ws.send(JSON.stringify( {userNick:true} ));
				})
			}
			if(msg.userLicense){																									//- 면허번호 중복 확인
				User.findOne( {license:msg.userLicense} ).exec().then(user=>{
					console.log(user);
					if(user) ws.send(JSON.stringify( {userLicense:true} ));
				})
			}
			if(msg.findBizNumber){																								//- 사업자번호 중복 확인
				User.findOne( {bizNumber:msg.findBizNumber} ).exec().then(user=>{
					if(user) ws.send(JSON.stringify( {findBizNumber:true} ));
					else ws.send(JSON.stringify( {findBizNumber:false} ))
				})
			}
		});
		ws.on('error', error=>{ console.log(ip+' error on connection : '+error) });	//- 오류발생시
		ws.on('close', ()=>{ console.log(ip+' connection closed') })								//- 접속종료시
    })
}

module.exports = server
