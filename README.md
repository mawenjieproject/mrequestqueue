## 说明
[npm version](https://www.npmjs.com/package/mrequestqueue)
[github code](https://github.com/mawenjieproject/mrequestqueue.git)

## 代码目录
- src
    - Ajax.ts
    - defaults.ts
    - helpers.ts
    - RequestQueue.ts
    - Task.ts
    - types.ts
    - utils.ts
    - xhr.ts

## 功能说明
- 1.发送请求，现在只支持web端发送请求，不支持node；
- 2.发送的请求可以支持取消发送，已经请求队列中还没发出的会直接从队列中删除，已发送还没返回的则会abort掉；
- 3.是否取消之前的发送，需要手动设置，规则如下：
    - 1.创建实例时设置isReplace为true：调用request时设置isReplace为false则该请求不会替换；
    - 2.创建实例时设置isReplace为true：调用request时设置isReplace为true或者不传则该请求会替换；
    - 3.创建实例时设置isReplace为false：调用request时设置isReplace为false或者不传则该请求不会替换；
    - 4.创建实例时设置isReplace为false：调用request时设置isReplace为true则该请求会替换;
- 4.设置doingQueueMax时，最好设置为浏览器的最大连接数；浏览器的最大连接数会和域名有关，不同域名可以使用不同的create对象来开发；
    后期也可支持不同域名对应不同的请求队列；
- 5.abort的请求会执行reject，因为必须执行reject让请求的函数执行完毕，避免内存溢出；所以，每个请求都要特殊处理一下abort掉的请求的异常。（非常重要）

## 待完善的功能
- 1.重试 设置重试次数和重试队列的最大数
- 2.优先 设置优先请求的最大数

## 使用说明

npm install --save mrequestqueue

- 1.es6 module import

```javascript

import ajax from 'mrequestqueue';

const majax = ajax.create({});

majax.request({url: '/users/id', method: 'get'}).then(res=>{

}).catch(err=>{

});
```

- 2.commonjs require
```javascript
const ajax = require('mrequestqueue');

const majax = ajax.default.create({});

majax.request({url: '/users/id', method: 'get'}).then(res=>{

}).catch(err=>{

});
```

- 3.普通方式

```html
<script src="./mrequestqueue.js"></script>
<script>
    const ajax = majax.default;
    const meAjax = ajax.create({});
    meAjax.request({url: '/users/id', method: 'get'}).then(res=>{

    }).catch(err=>{

    });
</script>
```