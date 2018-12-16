// 入口文件

// 1. 导包
const express = require('express');
const router = require('./router');

// 2. 配置
const app = express();

// 3. 挂载路由
app.use(router);

// 4. 监听端口
app.listen(8000, () => {
    console.log("run it----");

})