import { Provider, Loader, Provide, Application, Disable, app } from '@dazejs/framework';
import { Websocket } from './websocket-service';
import * as symbols from './symbols';
import sio from 'socket.io';
import { Response } from './response';

@Provider()
export class WebsocketServiceProvider {

  @Provide('websocket')
  @Disable
  _websocket(app: Application) {
    return new Websocket(app);
  }

  @Provide(symbols.INJECTORS.SOCKET, false)
  @Disable
  _socket(socket: sio.Socket) {
    return socket;
  }

  @Provide(symbols.INJECTORS.MESSAGE, false)
  @Disable
  _message(_socket: sio.Socket, args: any[]) {
    const [msg] = args;
    return msg;
  }

  @Provide(symbols.INJECTORS.MESSAGES, false)
  @Disable
  _messages(_socket: sio.Socket, args: any[]) {
    return args;
  }

  @Provide(symbols.INJECTORS.RESPONSE, false)
  @Disable
  _response() {
    return new Response();
  }

  launch() {
    const ws = app().get<Websocket>('websocket');
    const Components = app().get<Loader>('loader').getComponentsByType('websocket') || [];
    for (const Component of Components) {
      const name = Reflect.getMetadata('name', Component);
      app().multiton(Component, Component);
      if (name) {
        app().multiton(`websocket.${name}`, (...args: any[]) => {
          return app().get(Component, args);
        }, true);
      }
      ws.register(Component);
    }
    ws.listen();
  }
}
