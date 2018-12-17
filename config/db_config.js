// 1. 导包
const mysql = require('mysql');
// 2. 配置
const connection = mysql.createConnection({
    // 主机
    host: 'localhost',
    // 用户名
    user: 'root',
    // 密码
    password: '123456',
    // 数据库名字
    database: 'news58'
});

// 3. 开启连接
connection.connect();

// module.exports.db = connection;
module.exports = connection;