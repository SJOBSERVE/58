### 项目-第一天-笔记

#### 11-项目-功能演示

1. 用户
   1. 用户登录
   2. 用户注册
   3. 用户退出
2. 文章/话题
   1. 文章列表
   2. 创建新文章
   3. 编辑文章
   4. 删除文章
3. 优化

#### 12-项目-项目准备-git 版本控制

1. 新建 news57

   1. npm init -y
   2. npm i express

2. 新建 .gitignore (git 的排除/忽略文件)

3. git 操作

   ```bash
   git init
   git status
   git add .
   git commit -m "zhushi"
   git remote add origin https://github.com/lzz-dragon/news57.git 关联仓库
   git push -u origin master
   ```

4. 继续 git 操作时

   ```bash
   git status
   git add .
   git commit -m ""
   git push
   ```

#### 13-项目-项目准备-项目文件组成

1. app.js 入口文件
2. router.js 路由
3. controllers
   1. c_user.js 相当于 handle.js 实现用户功能相关的方法
4. views/视图
5. public/ 静态资源

> git add .
>
> git commit -m ""
>
> git push(可以在完成功能之后一起 push)

#### 14-项目-登录-功能拆分

1. 渲染登录页面 完成
2. 客户端发送表单请求
3. 服务端处理该表单请求
4. 客户端处理服务端返回的响应

#### 15-项目-登录-渲染登录页面-导入视图素材-渲染视图

1. node 项目页面素材提前准备好

2. 把 02-其他资源/signin.html + img/ +css/ 放在 views 和 publics

3. npm i jquery bootstrap@3.3.7

4. 在 app.js 统一配置资源

   ```js
   // 配置静态资源
   app.use('/public', express.static('./public'))

   // 配置第三方资源
   app.use('/node_modules', express.static('./node_modules'))
   ```

#### 15-项目-登录-渲染登录页面-安装第三方包-配置静态资源

1. npm i art-tempalte express-art-tempalte
2. 配置 app.engine('html', require('express-art-template'));
3. router.js 增加路由配置 router.get("/signin",找方法)
4. c_user.js res.render("V");

### 项目-第二天-笔记

#### 01-项目-登录-优化-提取模型-m_user.js

> 目的:把 c_user 中数据库操作的代码提取到一个 m_user 模块中
> m_user.js 目的: 专门处理用户的相关的数据库操作的部分并且返回结果
> c_user 在编码过程中 发现用数据,让 m_user 去找数据 c_user 使用该结果
> `m_user.js`

```js
// 职责/作用: 专门处理数据库操作的代码并且返回结果

// 1. 导包
const mysql = require('mysql')
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
})

// 3. 开启连接
connection.connect()
// 数据库操作的结果 err data

// 查询邮箱
// 目的(场景): 在c_user(checkEmail方法外部)文件中 使用checkEamil内部异步操作query里面的结果
//
exports.checkEmail = (email, callback) => {
  const sqlstr = 'SELECT *FROM `users` WHERE email=?'

  connection.query(sqlstr, email, (err, data) => {
    // 在有异步操作结果的位置 通过调函数的方式 传递结果
    if (err) {
      return callback(err)
    }
    callback(null, data)
  })
}
```

`c_user.js`

```js
const M_user = require('../models/m_user')
M_user.checkEmail(body.email, (err, data) => {
  if (err) {
    throw err
  }
  // console.log(data);
  // 如果邮箱没有 data=[]
  if (data.length === 0) {
    // console.log("邮箱不存在");
    return res.send({
      code: 1,
      msg: '邮箱不存在'
    })
  }
  // console.log(data);

  // 3. 验证该邮箱对应数据的密码是否正确
  // 判断数据库的密码和body.password
  if (data[0].password !== body.password) {
    return res.send({
      code: 2,
      msg: '密码错误'
    })
  }

  // 4. 返回200状态码
  res.send({
    code: 200,
    msg: '可以登录啦!!!好开心'
  })
})
```

#### 02-项目-登录-优化-提取-db_config

> 把 m_user 中的 mysql 导包/配置提取为一个单独的 js 模块
> config/db_config.js

#### 03-项目-MVC-各司其职

> MVC 设计模式(开发套路,软件架构模式)
> M: Model 模型 : 操作数据库
> V: View 视图 : 标签+样式+客户端请求+模板引擎语法
> C: Controller 控制器: 实现大量业务逻辑(要视图/要数据) 宏观调控

#### 04-项目-文章-文章列表-渲染列表页

1. V signin.html 客户端重定向 window.location.href = "/"
2. router 增加请求 -> 找 C 中的方法
3. C c_topic.js -> 实现方法 showTopicList
4. C c_topic showTopicList res.render("index.html")
5. V 导入 UI 素材 index.html

#### 05-项目-文章-文章列表-数据处理

> 该列表数据要来源于数据库

1. M m_topic 获取所有文章数据 findAllTopics
2. C 让 M 去拿数据 C 把数据 data 给 V render(V,{topics:M 的结果})
3. V {{each topics}} {{$value.title}} {{/each}}

#### 06-项目-文章-文章列表-express-session-保存用户信息

> 不同页面使用相同的数据而且 服务端 -> session
> express-session 包 让 req 多个 session 属性 类比 req.body 和 res.render()

1. 安装
2. app.js 导入+配置
3. C c_user 在登录成功时 把正确的用户数据 data[0]进行存储
   > req.session.user = data[0];

#### 07-项目-文章-文章列表-登录和注册的显示与隐藏

> header.html 如果登录 显示前面的列表+发布按钮 否则 显示登录和注册按钮

1. V header.html {{if user}}
2. C c_topic res.render("index.html",{topics:data,user:req.session.user})
   > 先登录 -> 来到列表页 -> 手动删除了 session->刷新

> 问题: 每次重新启动服务->之前的 session 数据 就没了! -> 待调

#### 08-项目-文章-文章列表-显示当前用户名

> 在列表页的头部 header.html 显示当前登录用户的用户名 {{user.nickname}}

#### 09-项目-文章-文章列表-发布新文章-渲染页面

1. V header.html a 标签 href ="/topic/create"
2. router.js 增加监听 找 C 的方法 createTopic
3. C c_topic 实现方法 render("topic/create.html");

#### 10-项目-文章-文章列表-发布新文章-客户端发送表单请求

> V create.html 客户端发送表单

#### 11-项目-文章-文章列表-发布新文章-服务端处理表单请求

#### 12-项目-文章-文章列表-发布新文章-客户端处理服务端返回的响应

#### 13-项目-文章-文章列表-持久化存储用户信息

#### 14-项目-文章-文章列表-设置话题的-createdAt

#### 15-项目-文章-文章列表-设置话题的创建者-userId

#### 16-项目-文章-文章详情-渲染页面

#### 17-项目-文章-文章详情-动态路由

#### 18-项目-文章-文章详情-处理数据

#### 19-项目-文章-文章详情-处理文章不存在的情况

#### 20-项目-用户-用户退
