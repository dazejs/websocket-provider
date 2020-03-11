import { Websocket as WebsocketBase} from '../base';
import { Application } from '@dazejs/framework';
import sio from 'socket.io';

export class Event {
  private app: Application;

  private name: string;

  private component: WebsocketBase;

  private action: string;

  constructor(app: Application) {
    this.app = app;
  }

  public setName(name: string) {
    this.name = name;
    return this;
  }

  public getName() {
    return this.name;
  }

  public setComponent(component: WebsocketBase) {
    this.component = component;
    return this;
  }

  public getComponent() {
    return this.component;
  }

  public setAction(action: string) {
    this.action = action;
    return this;
  }

  public getAction() {
    return this.action;
  }

  public invoke(socket: sio.Socket, ...args: any[]) {
    const cmp = this.app.get<WebsocketBase>(this.component, [socket, args]);
    return cmp[this.action](...args);
  }
}