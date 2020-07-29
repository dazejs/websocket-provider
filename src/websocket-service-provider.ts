import { BaseProvider, Loader, provide, Application, disable } from '@dazejs/framework';
import { Websocket } from './websocket-service';
import * as symbols from './symbols';
import sio from 'socket.io';
import { Response } from './response';

export class WebsocketServiceProvider extends BaseProvider {

  @provide('websocket')
  @disable
  _websocket(app: Application) {
    return new Websocket(app);
  }

  @provide(symbols.INJECTORS.SOCKET, false)
  @disable
  _socket(socket: sio.Socket) {
    return socket;
  }

  @provide(symbols.INJECTORS.MESSAGE, false)
  @disable
  _message(_socket: sio.Socket, args: any[]) {
    const [msg] = args;
    return msg;
  }

  @provide(symbols.INJECTORS.MESSAGES, false)
  @disable
  _messages(_socket: sio.Socket, args: any[]) {
    return args;
  }

  @provide(symbols.INJECTORS.RESPONSE, false)
  @disable
  _response() {
    return new Response();
  }

  launch() {
    const ws = this.app.get<Websocket>('websocket');
    const Components = this.app.get<Loader>('loader').getComponentsByType('websocket') || [];
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
