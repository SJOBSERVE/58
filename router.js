// 路由模块


// 1. 导包
const express = require('express');
const c_user = require('./controllers/c_user');
const c_topic = require('./controllers/c_topic');


// 2. 实例化router

const router = express.Router();

// 3. 监听端口 实现函数
router
    .get("/signin", c_user.showSignin)
    .post("/signin", c_user.handleSignin)
    .get("/", c_topic.showTopicList)
    .get('/topic/create', c_topic.createTopic)
    .post('/topic/create', c_topic.handleCreateTopic);





// 4. 导出router
module.exports = router;