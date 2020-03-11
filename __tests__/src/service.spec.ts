import { Service } from '../../src/service';
import { Application } from '@dazejs/framework';
import * as path from 'path';

const app = new Application(path.join(__dirname, '../daze'));

it('should return port with setProt', () => {
  const service = new Service(app);
  service.setPort(1234);
  const port = service.getPort();
  expect(port).toBe(1234);
});

it('should return port with setProt - empty', () => {
  const service = new Service(app);
  service.setPort(1234);
  service.setPort(undefined);
  const port = service.getPort();
  expect(port).toBe(1234);
});