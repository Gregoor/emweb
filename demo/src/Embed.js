import { useEffect, useRef, useState } from "react";
import { jsx as _jsx } from "react/jsx-runtime";

import { fetchoembed, onWindowMessage } from "@oembed/embed";

function useEmbedData({ url, maxHeight, maxWidth }) {
  const [data, setData] = useState(null);
  useEffect(() => {
    const ctrl = new AbortController();
    fetchoembed(url, { maxHeight, maxWidth, signal: ctrl.signal }).then(
      setData,
    );
    return () => {
      ctrl.abort();
    };
  }, [maxHeight, maxWidth, url]);
  return data;
}
export function Embed(props) {
  const { url } = props;
  const data = useEmbedData(props);
  const iFrameRef = useRef(null);
  const [size, setSize] = useState(null);
  useEffect(
    () => onWindowMessage(url, { onResize: (...size) => setSize(size) }),
    [url],
  );
  if (typeof data == "string") {
    return _jsx("iframe", {
      ref: iFrameRef,
      src: data,
      style: {
        border: 0,
        width: size?.[0],
        height: size?.[1],
        maxWidth: props.maxWidth,
        maxHeight: props.maxHeight,
      },
    });
  }
  if (!data || !("html" in data) || typeof data.html !== "string") {
    return null;
  }
  return _jsx("div", {
    dangerouslySetInnerHTML: { __html: data.html },
    style: { display: "flex" },
  });
}
