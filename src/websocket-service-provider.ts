import { Provider, Loader, inject, Metadata, provide, Application } from '@dazejs/framework';
import { Websocket } from './websocket-service';

export class WebsocketServiceProvider extends Provider {
  @inject('loader') loader: Loader;

  @provide('websocket')
  _websocket(app: Application) {
    return new Websocket(app);
  }

  launch() {
    const ws = this.app.get<Websocket>('websocket');
    const Components = this.loader.getComponentsByType('websocket') || [];
    for (const Component of Components) {
      const name = Metadata.get('name', Component);
      this.app.multiton(Component, Component);
      if (name) {
        this.app.multiton(`websocket.${name}`, (...args: any[]) => {
          return this.app.get(Provider, args);
        }, true);
      }
      ws.register(Component);
    }
    ws.listen();
  }
}
