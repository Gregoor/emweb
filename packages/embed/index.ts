import {
  extract as extractOEmbed,
  hasProvider as hasOEmbedProvider,
  Provider as OEmbedProvider,
} from "@extractus/oembed-extractor";
import escapeStringRegexp from "escape-string-regexp";

import type { OEmbedMessage } from "@oembed/types";

const isWildcardURLMatch = (patternURL: string, url: string) =>
  new RegExp(escapeStringRegexp(patternURL).replaceAll("\\*", ".*")).test(url);

type Options = {
  maxHeight?: number;
  maxWidth?: number;
  signal?: AbortSignal;
};

export async function fetchoembed(url: string, options?: Options) {
  const { signal, maxHeight, maxWidth } = options ?? {};
  if (hasOEmbedProvider(url)) {
    return extractOEmbed(
      url,
      { maxheight: maxHeight, maxwidth: maxWidth },
      { signal },
    );
  }

  const u = new URL(url);
  const phost = `${u.protocol}//${u.host}`;
  const manifest: OEmbedProvider = await fetch(
    `${phost}/.well-known/oembed.json`,
    {
      signal,
    },
  ).then((r) => r.json());
  const endpoint = manifest.endpoints.find(({ schemes }) =>
    (schemes ?? []).some((scheme) =>
      isWildcardURLMatch(new URL(scheme, phost).toString(), url),
    ),
  );
  if (!endpoint) {
    return null;
  }
  if (!endpoint.url) {
    return url;
  }
  return null;
}

export function onWindowMessage(
  url: string,
  callbacks: { onResize: (width: number, height: number) => void },
) {
  const handleMessage = (event: MessageEvent<OEmbedMessage>): void => {
    if (event.origin !== new URL(url).origin) {
      return;
    }
    const { data } = event;
    if (!data.type.startsWith("oembed:")) {
      return;
    }
    switch (data.type.substring("oembed:".length)) {
      case "resize":
        callbacks.onResize?.(data.width, data.height);
        break;
    }
  };
  window.addEventListener("message", handleMessage);
  return () => {
    window.removeEventListener("message", handleMessage);
  };
}
