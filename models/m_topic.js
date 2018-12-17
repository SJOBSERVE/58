//模型文件 m_topic 文章相关的数据库操作

const connection = require('../config/db_config');

// 获取所有文章
exports.findAllTopics = (callback) => {
    const sqlstr = "SELECT *FROM `topics`";
    connection.query(sqlstr, (err, data) => {
        if (err) {
            return callback(err);
        }
        callback(null, data);
    })
};