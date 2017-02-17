# node-server-project
> 基于 node.js + express 技术栈，采用MVC等分层结构设计、PM2作服务监控的Node服务器端项目Demo。

技术栈

- node.js（>6.0）
- express（>4.0，web开发框架）
- hbs（handlebars模版引擎）
- RESTful（API架构）
- JWT（Json Web Token 认证协议）


## Install dependencies

```
npm install
```

## Start server

```
npm start
```

## Deploy with pm2

Use pm2 to deploy app on production enviroment.

```
pm2 startOrReload config/pm2.json
```