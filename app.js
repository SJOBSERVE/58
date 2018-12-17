// 入口文件

// 1. 导包
const express = require('express');
const router = require('./router');
const bodyParser = require('body-parser');
const session = require('express-session');


// 2. 配置
const app = express();
// 统一处理自己的静态资源
app.use("/public", express.static("./public"));
// 统一处理第三方资源
app.use("/node_modules", express.static("./node_modules"));
// 配置模板引擎
app.engine('html', require('express-art-template'));

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(bodyParser.json());
// 配置express-session -> req.session
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}));

// 3. 挂载路由
app.use(router);

// 4. 监听端口
app.listen(8000, () => {
    console.log("run it----");
});