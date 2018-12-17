//文章控制器C: 文章相关方法实现

const moment = require('moment');
const M_topic = require('../models/m_topic');

// 渲染文章列表
exports.showTopicList = (req, res) => {
    // 视图要用数据->让C传数据->让M去获取数据->新建M ->操作数据库
    M_topic.findAllTopics((err, data) => {
        if (err) {
            return res.send({
                code: 500,
                msg: "服务器错啦  好开心!"
            });
        }
        // console.log(data);

        // data是文章数据 [{}]
        // 查询数据库 req.session.user
        res.render("index.html", {
            topics: data,
            user: req.session.user

        });

    });



};

//  渲染发布新文章的页面

exports.createTopic = (req, res) => {
    res.render("topic/create.html");
};

// 处理添加新文章的请求
exports.handleCreateTopic = (req, res) => {
    // 1. 获取表单数据req.body
    const body = req.body;

    //  给body添加成员
    // createdAt
    // body.createdAt = new Date();
    body.createdAt = moment().format();
    // userId:用来区分每个文章的创建者是谁
    body.userId = req.session.user.id;




    // 2. 让M去添加数据到数据库中并且返回结果
    M_topic.addTopic(body, (err, data) => {
        if (err) {
            return res.send({
                code: 500,
                msg: "服务器又错啦 好开心!"
            });
        }
        // 3. 返回200响应 
        res.send({
            code: 200,
            msg: "添加成功"
        });


    })
};