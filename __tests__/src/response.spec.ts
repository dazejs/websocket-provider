import { Response } from '../../src/response';


it('should return port with setEvent', () => {
  const res = new Response();
  res.setEvent('test');
  const event = res.getEvent();
  expect(event).toBe('test');
});

it('should return port with setParameters', () => {
  const res = new Response();
  res.setParameters(1, 2, 3, 4);
  const args = res.getParameters();
  expect(args).toEqual([1, 2, 3, 4]);
});