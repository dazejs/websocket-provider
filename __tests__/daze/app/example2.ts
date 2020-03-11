import { Websocket, ws } from '../../../src';

@ws.port(9596)
export class Example1 extends Websocket {
  @ws.subscribe('event3')
  index(msg: string) {
    return this.response().setEvent('event4').setParameters(`hello ${msg}`);
  }
}