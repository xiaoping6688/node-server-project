#! /bin/sh
# 启动脚本，用于设置开机启动，可跟参数：prod（产品-默认） simu（仿真） testing（测试）
# 也可使用 pm2 设置开机启动：
# pm2 save
# pm2 startup centos

if [ "$1" == "" ]; then
  npm run prod
else
  npm run $1
fi