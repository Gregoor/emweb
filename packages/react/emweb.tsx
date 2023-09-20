import { useCallback, useEffect, useRef, useState } from "react";

import { fetchFrameSrc, onWindowMessage } from "@emweb/host";

import { useAbortableEffectState } from "./utils";

export function Emweb({
  url,
  style,
  children,
  ...props
}: { url: string } & Omit<React.ComponentProps<"iframe">, "src">) {
  const frameRef = useRef<HTMLIFrameElement>(null);

  const frameSrc = useAbortableEffectState(
    useCallback((signal) => fetchFrameSrc(url, { signal }), [url]),
  );

  const [{ width, height }, setSize] = useState({ width: 0, height: 0 });
  useEffect(() => {
    if (!frameSrc) {
      return;
    }
    return onWindowMessage(frameSrc, {
      onResize: (width, height) => setSize({ width, height }),
    });
  }, [frameSrc]);

  if (!frameSrc) {
    return children;
  }

  return (
    <iframe
      ref={frameRef}
      src={frameSrc}
      style={{
        border: 0,
        ...style,
        width: width || "100%",
        height: height || "100%",
      }}
      {...props}
    />
  );
}
