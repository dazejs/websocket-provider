import sio from 'socket.io';

export class Response {

  private event: string;

  private parameters: any[];

  constructor(event?: string, ...parameters: any[]) {
    if (event) this.event = event;
    if (parameters) this.parameters = parameters;
  }

  public getEvent() {
    return this.event;
  }

  public setEvent(event: string) {
    this.event = event;
    return this;
  }

  public getParameters() {
    return this.parameters;
  }

  public setParameters(...parameters: any[]) {
    this.parameters.push(...parameters);
    return this;
  }

  public send(socket: sio.Socket) {
    if (!this.event) return this;
    socket.emit(this.event, ...this.parameters);
    return this;
  }
}