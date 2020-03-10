
// import { SubscribeOption } from '../decorators/interface';
import { Application } from '@dazejs/framework';

export class Service {
  app: Application;

  port: number;

  events: Map<string, any> = new Map();

  constructor(app: Application, option: any) {
    this.app = app;
    this.port = option.port;
  }

  addEvent(event: string, Component: any, action: string) {
    this.events.set(event, {
      component: Component,
      action
    });
  }

  listen() {

  }
}