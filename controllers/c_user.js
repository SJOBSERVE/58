const M_user = require('../models/m_user');


// 渲染登录页面
exports.showSignin = (req, res) => {

    res.render("signin.html");

};


// 处理登录的请求
exports.handleSignin = (req, res) => {
    // 1. 获取表单数据
    const body = req.body;
    // console.log(body);

    // 2. 先验证邮箱
    /**
     * 1.  安包mysql
     * 2.  配置
     * 3.  查询数据库
     */
    M_user.checkEmail(body.email,
        (err, data) => {
            if (err) {
                throw err;
            }
            // console.log(data);
            // 如果邮箱没有 data=[]
            if (data.length === 0) {
                // console.log("邮箱不存在");
                return res.send({
                    code: 1,
                    msg: "邮箱不存在"
                });

            }
            // console.log(data);

            // 3. 验证该邮箱对应数据的密码是否正确
            // 判断数据库的密码和body.password
            if (data[0].password !== body.password) {
                return res.send({
                    code: 2,
                    msg: "密码错误"
                })
            }

            // 可以获取到正确的用户数据
            //使用session把 data[0].nickname;进行保存  -> 在服务端使用session -> express功能
            // express框架没有自带的sessionAPI -> 
            // body-parser  req.body
            // express.art-template res.render()
            // 某个包express-session -> req.session.成员 = 值;

            req.session.user = data[0];
            // console.log(req.session.user);


            // 4. 返回200状态码
            res.send({
                code: 200,
                msg: "可以登录啦!!!好开心"
            });

        })





};

// 使用数据库操作的结果 err data
/*


*/