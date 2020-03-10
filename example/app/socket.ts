import { Websocket, ws } from '../../src';

@ws.port(8080)
export class Example extends Websocket {
  @ws.subscribe('channel')
  handle(message: any) {
    console.log(message);
  }
}