var list = [];
var list_id = [];
let ws = null;
if(typeof (WebSocket) !== "undefined"){
    ws = new WebSocket('ws://127.0.0.1:8001');
    ws.onopen = function(e){
        console.log("连接服务器成功");
        ws.send("worker");
    }
    ws.onclose = function(e){
        console.log("服务器关闭");
    }
    ws.onerror = function(){
        console.log("连接出错");
    }

    ws.onmessage = function(e){
        console.log(e, 'onmessage')
        list.forEach((myport) => {
            console.log(e.data)
            myport.postMessage(e.data)
        })
    }
} else {
    console.log('您的浏览器不支持websocket协议,建议使用新版谷歌、火狐等浏览器！')
}
onconnect = function (e) {
    var port = e.ports[0];
    port.addEventListener('message', function (e) {
       
        if (e.data.id) {
            var index = list_id.indexOf(e.data.id);
            if (index === -1) {
                list.push(port);
                list_id.push(e.data.id);
            } else {
                //关闭上个链接
                list[index].close();
                list[index] = port;
            };
        }
    });
    port.start();
}
