# node-server-project
> 基于 node.js + express 技术栈，采用MVC结构设计、JWT + RESTful API、PM2服务监控的Node服务器端项目框架.

技术栈

- node.js（>7.0 已原生支持绝大部分ES6/ES7语法）
- express（成熟稳定的Web开发框架）
- hbs（handlebars后端模版引擎，语法简洁、实现模版继承和嵌套功能等）
- RESTful（API架构风格，包括统一的接口输出结构）
- JWT（Json Web Token 认证协议，用于页面和API的登录验证，包括token续期方案等）
- ORM（数据库对象关系映射）
- TEST（集成在线API文档生成和测试工具[Swagger-ui](https://github.com/swagger-api/swagger-ui)，public/swagger目录下）


## BUILD @see package.json#scripts

### Install dependencies

```
npm install
```

### Start server for development or production (pm2)

```
npm start
```

### Auto restarting server and reloading browsers for development

```
npm run live
```

### For unit test, such as:

```
npm test ./test/api/login.js
```

### Debug node code

Please install 'npm install -g node-inspector' at first

```
npm run debug
```

### Check update for npm packages

Please install 'npm install npm-check-updates -g' at first

```
npm run update
```