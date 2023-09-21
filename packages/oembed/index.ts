import { extract, hasProvider } from "@extractus/oembed-extractor";
import DOMPurify from "dompurify";

export type OEmbedOptions = {
  maxHeight?: number;
  maxWidth?: number;
  signal?: AbortSignal;
};

export async function fetchAndSanitizeOEmbed(
  url: string,
  options?: OEmbedOptions,
) {
  const { signal, maxHeight, maxWidth } = options ?? {};
  if (!isOEmbeddable(url)) {
    return null;
  }
  const data = await extract(
    url,
    { maxheight: maxHeight, maxwidth: maxWidth },
    { signal },
  );
  if ("html" in data && typeof data.html == "string") {
    data.html = DOMPurify.sanitize(data.html, {
      ADD_TAGS: ["iframe"],
      ADD_ATTR: ["src", "frameBorder"],
    });
  }
  return data;
}

export const isOEmbeddable = async (url: string) =>
  hasProvider(url) && Boolean(await fetchAndSanitizeOEmbed(url));
