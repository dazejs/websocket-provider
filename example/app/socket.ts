import { BaseWebsocket, ws } from '../../src';

@ws.port(12453)
export class Example extends BaseWebsocket {
  @ws.subscribe('channel')
  handle(...msg: any) {
    console.log(msg, 123);
  }
}