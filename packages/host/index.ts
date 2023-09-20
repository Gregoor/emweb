import escapeStringRegexp from "escape-string-regexp";

import type { Config, EmwebMessage } from "@emweb/schemas";

const isWildcardURLMatch = (patternURL: string, url: string) =>
  new RegExp(escapeStringRegexp(patternURL).replaceAll("\\*", ".*")).test(url);

export async function fetchFrameSrc(url: string, options?: RequestInit) {
  const manifest: Config = await fetch(
    new URL("/.well-known/emweb.json", url),
    options,
  ).then((r) => r.json());
  const source = manifest.sources!.find((source) =>
    isWildcardURLMatch(
      new URL(typeof source == "string" ? source : source.from!, url).pathname,
      url,
    ),
  );
  if (!source) {
    return null;
  }
  return typeof source == "string" ? url : source.to!;
}

export function onWindowMessage(
  url: string,
  callbacks: { onResize: (width: number, height: number) => void },
) {
  const handleMessage = (event: MessageEvent<EmwebMessage>): void => {
    if (event.origin !== new URL(url).origin) {
      return;
    }
    const { data } = event;
    if (!data.type.startsWith("emweb:")) {
      return;
    }
    switch (data.type.substring("emweb:".length)) {
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
