/**
 * Copyright (c) 2020 Chan Zewail
 *
 * This software is released under the MIT License.
 * https: //opensource.org/licenses/MIT
 */

import { injectable } from '@dazejs/framework';
import { WSMetadata } from './interface';

interface WebsocketOptions {
  port?: number;
}

/**
 * component metadata
 * @param name
 * @param type
 */
export const websocket = function (options?: WebsocketOptions): ClassDecorator {
  return function (constructor) {
    injectable(constructor);
    const meta: WSMetadata = Reflect.getMetadata('ws', constructor) ?? {};
    if (options?.port) meta.port = options.port;
    Reflect.defineMetadata('type', 'websocket', constructor);
  };
};

/**
 * Alias
 */
export const Websocket = websocket;

