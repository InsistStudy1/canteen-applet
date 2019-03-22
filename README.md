# 食在东职小程序

## 使用方式

### 1、配置客户端
- 打开 `canteen applet` 根目录文件 `project.config.json` 修改 `appid` 为自己的 appid

- 把 `canteen applet` 导入微信开发者工具启动

- 进入 `canteen applet/utils/api.js`，把第一行的 host更改为自己的 ip 地址
```js
const host = 'http://192.168.88.106';
```

### 2、配置模拟数据
- 进入 `server` 目录

- 打开 `server/package.json` 文件，把 `scripts`下面的 `mock` 和 `dynamic` 更改为自己的 ip 地址 
``` json
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "mock": "json-server --host 192.168.88.106 --watch --port 53000 db.json",
    "dynamic": "json-server --host 192.168.88.106 --port 53001 --watch dynamic.js"
  }
```

- 进入命令行 `npm install` 下载依赖
```shell
npm install
```

- 启动
```shell
npm run mock
npm run dynamic
```

  
