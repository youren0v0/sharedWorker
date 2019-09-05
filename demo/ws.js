var ws = require("nodejs-websocket");
console.log("开始建立连接...")
var worker = null
var game1 = null
ws.createServer(function(conn){
  conn.on("text", function (str) {
    
    console.log("收到的信息为:"+str)
    if(str==="game1"){
      game1 = conn;
    }
    if(str==="worker") {
        worker = conn;
      }
    if (!!game1 && !!worker) {
      worker.sendText(str);
      // game1.sendText(str);
    }
     

    //conn.sendText(str);
  })
  conn.on("close", function (code, reason) {
    console.log("关闭连接")
  });
  conn.on("error", function (code, reason) {
    console.log("异常关闭")
  });
}).listen(8001)
console.log("WebSocket建立完毕")
