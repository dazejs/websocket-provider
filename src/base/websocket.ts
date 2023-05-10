import { ComponentType, Injectable } from '@dazejs/framework';
import { Response } from '../response';

@ComponentType('websocket')
@Injectable
export class BaseWebsocket {
  __context__: any;

  get socket() {
    const [socket] = this.__context__;
    return socket;
  }

  response(event?: string, ...parameters: any[]) {
    return new Response(event, ...parameters);
  }
}