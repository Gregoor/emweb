import { z } from "zod";

const stringOrURL = z.string().describe("Path or absolute URL");
export const configSchema = z.object({
  name: z.string(),
  sources: z.array(
    z.union([stringOrURL, z.object({ from: stringOrURL, to: stringOrURL })]),
  ),
});

type GenericMessage<Type extends string, Fields extends object> = {
  type: `emweb:${Type}`;
} & Fields;

export type ResizeMessage = GenericMessage<
  "resize",
  { width: number; height: number }
>;

export type EmwebMessage = ResizeMessage;

export type Config = z.infer<typeof configSchema>;
