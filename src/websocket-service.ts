import { Application } from '@dazejs/framework';
import { Websocket as WebsocketBase } from './base';
import { SubscribesMetadata, WSMetadata } from './decorators/interface';
import { Event } from './event';
import { Service } from './service';


export class Websocket {
  app: Application;

  services: Map<number, Service> = new Map();

  // subscribes: Map<number, SubscribeOption> = new Map();

  constructor(app: Application) {
    this.app = app;
  }
 
  register<T extends WebsocketBase>(Component: T) {
    const wsMeta: WSMetadata = Reflect.getMetadata('ws', Component) ?? {};
    const subscribesMeta: SubscribesMetadata = Reflect.getMetadata('subscribes', Component);
    const port = wsMeta.port ?? this.app.port;

    if (!this.services.has(port)) {
      const service = new Service(this.app);
      service.setPort(port);
      this.services.set(port, service);
    }

    const service = this.services.get(port) as Service;

    for (const [action, meta] of subscribesMeta) {
      for (const subscribe of meta) {
        const event = new Event(this.app);
        event
          .setName(subscribe.event)
          .setComponent(Component)
          .setAction(action);
        service.addEvent(event);
      }
    }
  }

  listen() {
    for (const [, service] of this.services) {
      service.listen();
    }
  }
}