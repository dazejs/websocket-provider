import { componentType, injectable } from '@dazejs/framework';
import { Response } from '../response';

@componentType('websocket')
@injectable()
export class Websocket {
  __context__: any;

  get socket() {
    const [socket] = this.__context__;
    return socket;
  }

  response(event?: string, ...parameters: any[]) {
    return new Response(event, ...parameters);
  }
}