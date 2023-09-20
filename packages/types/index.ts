import type { z } from "zod";

import type { configV2oframe } from "@oembed/schemas";

type GenericMessage<Type extends string, Fields extends object> = {
  type: `oembed:${Type}`;
} & Fields;

export type ResizeMessage = GenericMessage<
  "resize",
  { width: number; height: number }
>;

export type OEmbedMessage = ResizeMessage;

export type ConfigV2oframe = z.infer<typeof configV2oframe>;
