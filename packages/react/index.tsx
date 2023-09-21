import { useCallback } from "react";

import { fetchFrameSrc } from "@emweb/host";
import { isOEmbeddable } from "@emweb/oembed";

import { Emweb } from "./emweb";
import { OEmbed } from "./oembed";
import { useAsyncValue } from "./utils";

function isHTTP_URL(s: string) {
  try {
    const url = new URL(s);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch (_) {
    return false;
  }
}

export const isEmbeddable = async (url: string) =>
  isHTTP_URL(url) && (isOEmbeddable(url) || Boolean(await fetchFrameSrc(url)));

export const useIsEmbeddable = (url: string) =>
  useAsyncValue(useCallback(() => isEmbeddable(url), [url]));

export function Embed({ url }: { url: string }) {
  return (
    <Emweb url={url}>
      <OEmbed url={url} />
    </Emweb>
  );
}
