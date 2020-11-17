const wss = require('ws').Server;
const wsServer = new wss({port:8080});

wsServer.on('connection', (ws)=>{
  ws.send('websocket on!');
  ws.on('message', (message)=>{ console.log(message) })
});

module.exports = wsServer;
