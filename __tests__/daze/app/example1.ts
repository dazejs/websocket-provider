import { Websocket, ws } from '../../../src';

export class Example1 extends Websocket {
  @ws.subscribe('event1')
  index(msg: string) {
    return this.response().setEvent('event2').setParameters(`hello ${msg}`);
  }

  @ws.subscribe('example1-event1')
  event1(msg: string) {
    return {
      event: 'example1-event2',
      data: `hello ${msg}`
    };
  }
}