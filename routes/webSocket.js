const ws = require('ws');

module.exports = function(_server) {
  const wsServer = new ws.Server( { server: _server } );                        //- 웹소켓 서버 생성
  wsServer.on('connection', (socket, req) => {
    let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;    //- 클라이언트 ip 가져오기
    console.log(ip + ' 접속요청');
    socket.on('message', message => {                                           //- 클라이언트로부터 메세지 받음
      console.log(ip + ' 메세지 ' + message);
      socket.send('메세지수신');                                                //- 클라이언트에게 응답
    });
    socket.on('error', error => { console.log(ip + ' 클라이언와 연결중 오류') });   //- 연결오류
    socket.on('close', () => { console.log(ip + ' 클라이언트 접속 종료')})      //- 연결종료
  })
    }
