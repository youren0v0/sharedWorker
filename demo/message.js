
let fn = null
let _id = ''
function message (callback, id, key) {
    _id = id
    fn = handleListenStorage(callback, key)
    // fn = handleListenStorage(callback, key)
    // if (typeof (SharedWorker) !== "undefined") {
    //     console.log('浏览器支持SharedWorker')
    //     fn = handleSharedWorker(callback, id)
    // } else {
    //     console.log('浏览器不支持SharedWorker')
    //     fn = handleListenStorage(callback, key)
    // }
    return fn
}

function handleListenStorage(callback, key = 'ttp_listen_storage_message') {
    //接收消息
    window.addEventListener("storage", function(event) {
        if (key === event.key) {
            callback(event.newValue)
        }
    });
    return function (val) {
        // 发送消息
        window.localStorage.setItem(key, val);
        callback(val)
    }
}


function handleSharedWorker(callback, id) {
   
    let worker = new SharedWorker("worker.js");
    let workerPort =  worker.port
    let time = new Date()
    workerPort.start();
    workerPort.postMessage({ id: id + '' + time.getTime() });
    //接收woker的发送消息
    workerPort.onmessage = function (e) {
        console.log(callback)
        callback(e.data);
    };
    return function (val) {
        workerPort.postMessage(val);
    }
}




if(typeof (WebSocket) !== "undefined"){
    let ws
    console.log(!document.hidden)
    if (!document.hidden) {
        wsFn()
        document.addEventListener("visibilitychange", function() {
            if (document.hidden) {
                ws.close()
                ws = null
            } else {
                wsFn()
            }
        });
    }
    function wsFn() {
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
            fn(e.data + '-' + _id)
        }
    }
    
} else {
    console.log('您的浏览器不支持websocket协议,建议使用新版谷歌、火狐等浏览器！')
}
export default message