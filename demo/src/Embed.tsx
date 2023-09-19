import { useEffect, useRef, useState } from "react";

import { fetchOFrame, onWindowMessage } from "@oframe/embed";

type Props = {
  url: string;
  maxHeight?: number;
  maxWidth?: number;
};

function useEmbedData({ url, maxHeight, maxWidth }: Props) {
  const [data, setData] =
    useState<Awaited<ReturnType<typeof fetchOFrame>>>(null);
  useEffect(() => {
    const ctrl = new AbortController();
    fetchOFrame(url, { maxHeight, maxWidth, signal: ctrl.signal }).then(
      setData
    );
    return () => {
      ctrl.abort();
    };
  }, [maxHeight, maxWidth, url]);
  return data;
}

export function Embed(props: Props) {
  const { url } = props;
  const data = useEmbedData(props);
  const iFrameRef = useRef<HTMLIFrameElement>(null);

  const [size, setSize] = useState<[number, number] | null>(null);
  useEffect(
    () => onWindowMessage(url, { onResize: (...size) => setSize(size) }),
    [url]
  );

  if (typeof data == "string") {
    return (
      <iframe
        ref={iFrameRef}
        src={data}
        style={{
          border: 0,
          width: size?.[0],
          height: size?.[1],
          maxWidth: props.maxWidth,
          maxHeight: props.maxHeight,
        }}
      />
    );
  }

  if (!data || !("html" in data) || typeof data.html !== "string") {
    return null;
  }
  return (
    <div
      dangerouslySetInnerHTML={{ __html: data.html }}
      style={{ display: "flex" }}
    />
  );
}
