// 职责/作用: 专门处理数据库操作的代码并且返回结果
const connection = require('../config/db_config');


// 数据库操作的结果 err data

// 查询邮箱
// 目的(场景): 在c_user(checkEmail方法外部)文件中 使用checkEamil内部异步操作query里面的结果
// 
exports.checkEmail = (email, callback) => {

    const sqlstr = 'SELECT *FROM `users` WHERE email=?';

    connection.query(sqlstr, email,
        (err, data) => {
            // 在有异步操作结果的位置 通过调函数的方式 传递结果
            if (err) {
                return callback(err);
            }
            callback(null, data);

        });

};