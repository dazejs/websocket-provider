
export interface WSMetadata {
  port?: number;
}

export interface SubscribeOption {
  event: string;
}

export type SubscribesMetadata = Map<string, SubscribeOption[]>;