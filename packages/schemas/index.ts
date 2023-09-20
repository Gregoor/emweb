import { z } from "zod";

export const configV1 = z.object({
  provider_name: z.string(),
  endpoints: z.array(
    z.object({
      schemes: z.array(z.string().url()),
      url: z.string().url(),
      example_urls: z.array(z.string().url()).optional(),
      discovery: z.boolean().optional(),
      note: z.string().optional(),
    }),
  ),
});

const stringOrURL = z.string().describe("Path or absolute URL");
export const configV2 = z.object({
  name: z.string(),
  sources: z.array(
    z.object({
      match: z.array(stringOrURL),
      endpoint: stringOrURL
        .optional()
        .describe(
          "Endpoint for Consumer Requests. If omitted this source " +
            "is assumed to be directly embeddable.",
        ),
      examples: z.array(z.string()).optional(),
      comment: z.string().optional(),
    }),
  ),
});

export const requestV1 = z.object({
  url: z.string(),
  maxwidth: z.number().optional(),
  maxheight: z.number().optional(),
  format: z.enum(["json", "xml"]).optional(),
});

export const requestV2 = z.object({
  url: z.string(),
  max_width: z.number().optional(),
  max_height: z.number().optional(),
});

const genericResponse = z.object({
  version: z.literal("1.0"),
  title: z.string().optional(),
  author_name: z.string().optional(),
  author_url: z.string().url().optional(),
  cache_age: z.string().optional(),
  thumbnail_url: z.string().url().optional(),
  thumbnail_width: z.number().optional(),
  thumbnail_height: z.number().optional(),
});

const photoResponse = genericResponse.extend({
  type: z.literal("photo"),
  url: z.string().url(),
  width: z.number(),
  height: z.number(),
});

const videoResponse = genericResponse.extend({
  type: z.literal("video"),
  html: z.string(),
  width: z.number(),
  height: z.number(),
});

const linkResponse = genericResponse.extend({ type: z.literal("link") });

const richResponse = z.object({
  type: z.literal("rich"),
  html: z.string(),
  width: z.number(),
  height: z.number(),
});

export const responseV1 = z.discriminatedUnion("type", [
  photoResponse,
  videoResponse,
  linkResponse,
  richResponse,
]);
