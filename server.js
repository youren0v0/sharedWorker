let express = require('express'); // 引用express模块
let app = express();  // 创建一个简单的服务器

let requestPort = 3000;  // 请求页面跑在3000端口

app.use(express.static(__dirname + '/demo')); //3000端口的静态文件，即index.html


app.listen(requestPort, function () {
    console.log('Requester is listening on port '+ requestPort); // 在dos窗口会执行这个回调函数
});
// 打开默认浏览器
const openDefaultBrowser = function (url) {
    let exec = require('child_process').exec; //创建异步的进程
    switch (process.platform) {
      case "darwin":
        exec('open ' + url);
        break;
      case "win32":
        exec('start ' + url);
        break;
      default:
        exec('xdg-open', [url]);
    }
  }
  // openDefaultBrowser('http://localhost:3000/a.html')
  // openDefaultBrowser('http://localhost:3000/b.html')