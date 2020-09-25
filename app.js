var express = require('express');

var app = express();

var fs = require('fs');

app.get('/',function (req,res) {
  fs.readFile('login.html',function(err,data){
    if(err) {
      console.log(err);
    } else {
      res.writeHead(200,{'Content-Type':'text/html'});
      res.end(data);
    }
  })
});

app.listen(3000, function(){
  console.log('Server On!');
});
