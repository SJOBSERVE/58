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

#### 02-项目-登录-优化-提取-db_config

#### 03-项目-MVC-各司其职

#### 04-项目-文章-文章列表-渲染列表页

#### 05-项目-文章-文章列表-数据处理

#### 06-项目-文章-文章列表-express-session-保存用户信息

#### 07-项目-文章-文章列表-登录和注册的显示与隐藏

#### 08-项目-文章-文章列表-显示当前用户名

#### 09-项目-文章-文章列表-发布新文章-渲染页面

#### 10-项目-文章-文章列表-发布新文章-客户端发送表单请求

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
