
const server = function(_server){
    const wss = new wsModule.Server( {server:_server} );                              // 웹소켓 서버 생성
    wss.on('connection', (ws,req)=>{                                                  // 클라이언트 접속시
        let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;        // 사용자이 ip 파악
        console.log(ip+' 접속');
        ws.on('message', msg=>{                                                         // 메세지를 받았을때
            let message = JSON.parse(msg);
            if(message.event==='findEmail'){                                            //- 이메일 중복 확인
                console.log(message);
                User.findOne( {email:message.message} ).exec()
                .then(user=>{ if(user){
                     ws.send(JSON.stringify( {event:'findEmail',message:true} ) );
                     console.log('send')
                    }
                })
            }
            if(message.event=='newTel'){                                                 //- 휴대전화번호 중복 확인
                User.findOne( {tel: message.message} ).exec()
                .then(user=>{ if(user) ws.send(JSON.stringify( {event:'newTel',message:'existing'} )) })
            }
        });
        ws.on('error', error=>{ console.log(ip+' 연결중 오류 : '+error) });             // 오류발생시
        ws.on('close', ()=>{ console.log(ip+' 연결종료') })                             // 접속종료시
    })
}

module.exports = server