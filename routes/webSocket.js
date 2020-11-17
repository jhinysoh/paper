//웹소켓 연결
const wsModule = require('ws');

module.exports = function(_server){
  // 웹소켓 서버 생성
  const wss = new wsModule.Server( {server:_server} );
  // 클라이언트 접속시 처리하는 이벤트 메소드
  wss.on('connection',(ws,req)=>{
    // 사용자이 ip 파악
    let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    console.log(ip+'로부터 접속요청');
    // 메세지를 받았을때 호출되는 이벤트
    ws.on('message',(message)=>{
      // 받은 메세지 출력
      console.log(ip+'로부터 받은 메세지 : '+message);
      // 클라이언트에 보내는 메세지
      ws.send('echo :'+message)
    });
    // 오류발생시
    ws.on('error',(error)=>{ console.log(ip+'와 연결중 오류 : '+error) });
    // 접속종료시
    ws.on('close',()=>{ console.log(ip+'와 연결종료') })
  })
}
