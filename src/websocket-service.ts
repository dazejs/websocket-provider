import { Application } from '@dazejs/framework';
import { Websocket as WebsocketBase } from './base';
import { WSMetadata, SubscribesMetadata } from './decorators/interface';
// import * as http from 'http';
// import socketIO from 'socket.io';
// import { ws } from './decorators';
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
    const subscribes: SubscribesMetadata = Reflect.getMetadata('subscribes', Component);
    const port = wsMeta.port ?? this.app.port;

    if (this.services.has(port)) {
      const service = this.services.get(port) as Service;
      console.log(service, port);
    } else {
      const service = new Service(this.app, {
        port
      });
      this.services.set(port, service);
      console.log(service, port);
    }

    const service = this.services.get(port) as Service;

    for (const [action, subscribe] of subscribes) {
      for (const item of subscribe) {
        service.addEvent(item.event, Component, action);
      }
      console.log(service, subscribe, 123);
    }
    
  }

  listen() {
    // for (const [port, server] of this.servers) {
    //   const io = socketIO(server, {
    //     // ...
    //   });
    //   io.on('connection', (socket) => {
    //     socket.on('event', () => {
          
    //     });
    //   });
    //   if (port !== this.app.port) server.listen(port);
    // }
  }

  // setupServer(port?: number) {
  //   if (port && this.servers.has(port)) return this.servers.get(port);
  //   if (this.isHttpExternal(port)) {
  //     const io = socketIO(this.app.get('httpServer').getServer(), {
  //       // ...
  //     });
  //     this.servers.set(port || this.app.port, io);
  //     return io;
  //   }
  //   const io = socketIO(port, {
  //     // ...
  //   });
  //   this.servers.set(port || this.app.port, io);
  //   return io;
  // }

  isExternal(port?: number) {
    if (!port || this.app.port === port) return false;
    return true;
  }
}