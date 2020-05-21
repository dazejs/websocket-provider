import { BaseProvider, Loader, inject, provide, Application } from '@dazejs/framework';
import { Websocket } from './websocket-service';
import * as symbols from './symbols';
import sio from 'socket.io';
import { Response } from './response';

export class WebsocketServiceProvider extends BaseProvider {
  @inject('loader') loader: Loader;

  @provide('websocket')
  _websocket(app: Application) {
    return new Websocket(app);
  }

  @provide(symbols.INJECTORS.SOCKET, false)
  _socket(socket: sio.Socket) {
    return socket;
  }

  @provide(symbols.INJECTORS.MESSAGE, false)
  _message(_socket: sio.Socket, args: any[]) {
    const [msg] = args;
    return msg;
  }

  @provide(symbols.INJECTORS.MESSAGES, false)
  _messages(_socket: sio.Socket, args: any[]) {
    return args;
  }

  @provide(symbols.INJECTORS.RESPONSE, false)
  _response() {
    return new Response();
  }

  launch() {
    const ws = this.app.get<Websocket>('websocket');
    const Components = this.loader.getComponentsByType('websocket') || [];
    for (const Component of Components) {
      const name = Reflect.getMetadata('name', Component);
      this.app.multiton(Component, Component);
      if (name) {
        this.app.multiton(`websocket.${name}`, (...args: any[]) => {
          return this.app.get(Component, args);
        }, true);
      }
      ws.register(Component);
    }
    ws.listen();
  }
}
