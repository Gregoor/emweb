import { useCallback } from "react";

import { fetchAndSanitizeOEmbed, OEmbedOptions } from "@emweb/oembed";

import { useAbortableEffectState } from "./utils";

export function OEmbed({
  url,
  maxWidth,
  maxHeight,
}: { url: string } & OEmbedOptions) {
  const data = useAbortableEffectState(
    useCallback(
      (signal) => fetchAndSanitizeOEmbed(url, { maxWidth, maxHeight, signal }),
      [maxHeight, maxWidth, url],
    ),
  );
  if (!data) {
    return null;
  }
  if ("html" in data && typeof data.html === "string") {
    return (
      <div
        dangerouslySetInnerHTML={{ __html: data.html }}
        style={{ display: "flex", maxWidth, maxHeight }}
      />
    );
  }
}
