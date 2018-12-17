//文章控制器C: 文章相关方法实现

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
        res.render("index.html", {
            topics: data,
            user: req.session.user

        });

    });



};

//  发布新文章

exports.createTopic = (req, res) => {
    res.render("topic/create.html");
};