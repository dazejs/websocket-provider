
import sio from 'socket.io-client';
import { Application } from '@dazejs/framework';
import * as path from 'path';

const app = new Application(path.join(__dirname, '../daze'));

beforeAll(() => app.run(9595));
afterAll(() => app.close());

it('should handle [event2] event on client - use dazejs server', (done) => {
  const io = sio.connect('http://127.0.0.1:9595');
  io.emit('event1', 'websocket');
  io.on('event2', (data: string) => {
    expect(data).toBe('hello websocket');
    io.disconnect();
    done();
  });
});

it('should handle obejct response', (done) => {
  const io = sio.connect('http://127.0.0.1:9595');
  io.emit('example1-event1', 'websocket');
  io.on('example1-event2', (data: string) => {
    expect(data).toBe('hello websocket');
    io.disconnect();
    done();
  });
});

it('should handle [event4] event on client - use custon server', (done) => {
  const io = sio.connect('http://127.0.0.1:9596');
  io.emit('event3', 'websocket');
  io.on('event4', (data: string) => {
    expect(data).toBe('hello websocket');
    io.disconnect();
    done();
  });
});