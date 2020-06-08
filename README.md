[![GitHub issues](https://img.shields.io/github/issues/dazejs/websocket-provider.svg)](https://github.com/dazejs/websocket-provider/issues)
[![npm](https://img.shields.io/npm/v/@dazejs/websocket-provider.svg)](https://www.npmjs.com/package/@dazejs/websocket-provider)
[![npm](https://img.shields.io/npm/dm/@dazejs/websocket-provider.svg)](https://www.npmjs.com/package/@dazejs/websocket-provider)
[![actions](https://github.com/dazejs/websocket-provider/workflows/Node%20CI/badge.svg)](https://github.com/dazejs/websocket-provider/actions)
[![codecov](https://codecov.io/gh/dazejs/websocket-provider/branch/master/graph/badge.svg)](https://codecov.io/gh/dazejs/websocket-provider)
[![GitHub license](https://img.shields.io/github/license/dazejs/websocket-provider.svg)](https://github.com/dazejs/websocket-provider/blob/master/LICENSE)

# WebSocket 提供者

基于 `Daze.js` 的 Websocket 提供者，基于 `socket.io` 实现

## 安装

```bash
$ npm install --save @dazejs/websocket-provider
```

## 注册服务

修改项目 `src/config/app.ts` 文件, 添加 `WebsocketServiceProvider` 到 `providers` 数组中

```ts
import { WebsocketServiceProvider } from '@dazejs/websocket-provider';

export default {
  // ...
  providers: [
    // ...
    WebsocketServiceProvider,
  ]
}
```

## 使用

### 定义 `websocket` 服务

通过使用 `@websock` 装饰器来表示这是一个 `websocket` 服务

```ts
import { websock } from '@dazejs/websocket-provider';

@websock()
export class Example {

}
```

### 监听事件 

通过继承 `ws.subscribe()` 装饰器来监听事件

```ts
import { BaseWebsocket, ws, websock } from '@dazejs/websocket-provider';

@websock()
export class Example extends BaseWebsocket {
  @ws.subscribe('event')
  handle() {
    // ...
  }
}
```

### 获取数据

**使用默认注入参数获取**

```ts
@ws.subscribe('event')
handle(data: any) {
  console.log(data)
}
```

同时也支持多个参数

```ts
@ws.subscribe('event')
handle(arg1: any, arg2: any, arg3: any) {
  console.log(arg1, arg2, arg3)
}
```

**使用装饰器注入**

使用 `@ws.message()` 注入单个数据

```ts
@ws.subscribe('event')
handle(@ws.message() data: any) {
  console.log(data)
}
```

使用 `@ws.messages()` 注入多个数据

```ts
@ws.subscribe('event')
handle(@ws.messages() args: any[]) {
  console.log(...args)
}
```

## 响应事件

**通过 Response 对象响应事件**

```ts
@ws.subscribe('event')
handle(@ws.messages() args: any[]) {
  const data = 'test'
  return this.response('event1', data)
}
```

也可以通过 Response 提供的方法修改事件名和参数

```ts
@ws.subscribe('event')
handle(@ws.messages() args: any[]) {
  const arg1 = 'test1';
  const arg2 = 'test2';
  return this.response().setEvent('event2').setParameters(arg1, arg2)
}
```
**通过返回结构化的对象来响应事件**

```ts
@ws.subscribe('event')
handle(@ws.messages() args: any[]) {
  return {
    event: 'event2',
    data: 'test',
  }
}
```


## License

[MIT licensed](https://github.com/dazejs/websocket-provider/blob/master/LICENSE)