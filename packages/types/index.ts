type GenericMessage<Type extends string, Fields extends object> = {
  type: `oembed:${Type}`;
} & Fields;

export type ResizeMessage = GenericMessage<
  "resize",
  { width: number; height: number }
>;

export type OEmbedMessage = ResizeMessage;
