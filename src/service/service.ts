import { Application } from '@dazejs/framework';
import { Event } from '../event';
import sio from 'socket.io';
import * as http from 'http';
import { Response } from '../response';

export class Service {
  private app: Application;

  private port: number;

  private events: Event[] = [];

  constructor(app: Application) {
    this.app = app;
    this.port = app.port;
  }

  public setPort(port: number) {
    if (!port) return this;
    this.port = port;
    return this;
  }
    
  public getPort() {
    return this.port;
  }
  
  public addEvent(event: Event) {
    this.events.push(event);
    return this;
  }

  private  handleEvent(io: SocketIO.Server) {
    io.on('connection', (socket) => {
      for (const event of this.events) {
        socket.on(event.getName(), async (...args: any[]) => {
          const res = await event.invoke(socket, ...args);
          return this.handleResponse(socket, res);
        });
      }
    });
  }

  private handleResponse(socket: SocketIO.Socket, res: any) {
    if (res instanceof Response) return res.send(socket);
    if (Object.prototype.toString.call(res) === '[object Object]' && res.event) {
      const response = new Response();
      response.setEvent(res.event);
      response.setParameters(res.data);
      return response.send(socket);
    }
    return;
  }


  public listen() {
    if (this.port === this.app.port) {
      const io = sio();
      // 使用应用的 server
      io.attach(this.app.get('appServer').getServer());
      this.handleEvent(io);
    } else {
      const io = sio();
      const server = http.createServer();
      // 重新生成 server
      io.attach(server);
      this.handleEvent(io);
      server.listen(this.port);
    }
  }
}