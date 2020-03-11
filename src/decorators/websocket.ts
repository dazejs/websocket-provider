import { WSMetadata, SubscribesMetadata } from './interface';
import { createInjectDecorator} from '@dazejs/framework';
import * as symbols from '../symbols';

export function port (port: number): ClassDecorator {
  return function <TFunction extends Function>(target: TFunction) {
    const meta: WSMetadata = Reflect.getMetadata('ws', target) ?? {};
    meta.port = port;
    Reflect.defineMetadata('ws', meta, target);
    return target;
  };
}

export function subscribe(event: string): MethodDecorator {
  return function <T>(target: object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<T>) {
    const meta: SubscribesMetadata = Reflect.getMetadata('subscribes', target.constructor) ?? new Map();
    const key = propertyKey.toString();
    const subscribes = meta.get(key) ?? [];
    subscribes.push({
      event
    });
    meta.set(key, subscribes);
    Reflect.defineMetadata('subscribes', meta, target.constructor);
    return descriptor;
  };
}

export const socket = createInjectDecorator(symbols.INJECTORS.SOCKET);
export const message = createInjectDecorator(symbols.INJECTORS.MESSAGE);
export const messages = createInjectDecorator(symbols.INJECTORS.MESSAGES);

