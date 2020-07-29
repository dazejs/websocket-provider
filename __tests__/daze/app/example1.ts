import { BaseWebsocket, ws, websocket } from '../../../src';


@websocket()
export class Example1 extends BaseWebsocket {
  @ws.subscribe('event1')
  index(msg: string) {
    const res = this.response().setEvent('event2').setParameters(`hello ${msg}`);
    return res;
  }

  @ws.subscribe('example1-event1')
  event1(msg: string) {
    return {
      event: 'example1-event2',
      data: `hello ${msg}`
    };
  }
}