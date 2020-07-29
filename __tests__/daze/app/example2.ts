import { BaseWebsocket, ws, websocket } from '../../../src';

@ws.port(9596)
@websocket()
export class Example2 extends BaseWebsocket {
  @ws.subscribe('event3')
  index(msg: string) {
    return this.response().setEvent('event4').setParameters(`hello ${msg}`);
  }
}