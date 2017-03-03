# node-server-project
> 基于 node.js + express 技术栈，采用MVC结构设计、JWT + RESTful API、PM2服务监控的Node服务器端项目框架.

技术栈

- node.js（>7.0 已原生支持绝大部分ES6/ES7语法）
- express（成熟稳定的Web开发框架）
- hbs（handlebars模版引擎）
- RESTful（API架构风格）
- JWT（Json Web Token 认证协议）
- ORM（数据库对象关系映射）
- [Swagger-ui](https://github.com/swagger-api/swagger-ui)（API文档在线生成和测试, public/swagger）


## Install dependencies

```
npm install
```

## Start server

```
npm start
```

## Auto restarting server and reloading browsers for development

```
npm run livereload
```

## For test, such as:

```
npm test ./test/api/signin.js
```

## Deploy with pm2

Use pm2 to deploy app on production enviroment.

```
pm2 startOrReload config/pm2.json
```

## Check update for npm packages

Please install 'npm install npm-check-updates -g' at first

```
npm run update
```
