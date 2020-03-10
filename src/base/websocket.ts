import { componentType, injectable } from '@dazejs/framework';

@componentType('websocket')
@injectable()
export class Websocket {
  __context__: any;

  get socket() {
    return this.__context__[0];
  }
}