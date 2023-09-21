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

const promiseRaceTrueish = (
  ...promises: Promise<unknown>[]
): Promise<boolean> =>
  new Promise((resolve) => {
    for (const promise of promises) {
      promise.then((value) => {
        if (value) {
          resolve(true);
        }
      });
    }
    Promise.allSettled(promises).then(() => resolve(false));
  });

export const isEmbeddable = async (url: string) =>
  isHTTP_URL(url) && promiseRaceTrueish(isOEmbeddable(url), fetchFrameSrc(url));

export const useIsEmbeddable = (url: string) =>
  useAsyncValue(useCallback(() => isEmbeddable(url), [url]));

export function Embed({ url }: { url: string }) {
  return (
    <Emweb url={url}>
      <OEmbed url={url} />
    </Emweb>
  );
}
