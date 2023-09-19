type GenericMessage<Type extends string, Fields extends object> = {
  type: `oframe:${Type}`;
} & Fields;

export type ResizeMessage = GenericMessage<
  "resize",
  { width: number; height: number }
>;

export type OFrameMessage = ResizeMessage;
