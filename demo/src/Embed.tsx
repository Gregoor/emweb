import { useEffect, useRef, useState } from "react";

import { fetchOEmbed, onWindowMessage } from "@oembed/embed";

type Props = {
  url: string;
  maxHeight?: number;
  maxWidth?: number;
};

function useEmbedData({ url, maxHeight, maxWidth }: Props) {
  const [data, setData] =
    useState<Awaited<ReturnType<typeof fetchOEmbed>>>(null);
  useEffect(() => {
    const ctrl = new AbortController();
    fetchOEmbed(url, { maxHeight, maxWidth, signal: ctrl.signal }).then(
      setData,
    );
    return () => {
      ctrl.abort();
    };
  }, [maxHeight, maxWidth, url]);
  return data;
}

function InnerEmbed(props: Props) {
  const { url } = props;
  const data = useEmbedData(props);
  const iFrameRef = useRef<HTMLIFrameElement>(null);

  const [height, setHeight] = useState<number>(0);
  useEffect(
    () => onWindowMessage(url, { onResize: (_, height) => setHeight(height) }),
    [url],
  );

  if (data?.type == "iframe") {
    return (
      <iframe
        ref={iFrameRef}
        src={url}
        style={{
          border: 0,
          width: "100%",
          height,
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

export function Embed({
  inputProps,
  ...props
}: { inputProps?: React.ComponentProps<"input"> } & Props) {
  return (
    <div
      style={{
        border: "1px solid rgb(107, 114, 128)",
        borderRadius: 4,
      }}
    >
      {inputProps ? (
        <input
          placeholder="https://example.com/embeddable/resource"
          type="text"
          style={{
            border: "none",
            borderBottom: "1px solid rgb(107, 114, 128)",
            outline: "none",
            padding: 10,
            width: "100%",
            boxSizing: "border-box",
            textAlign: "center",
            background: "none",
          }}
          {...inputProps}
        />
      ) : (
        <a
          style={{
            borderBottom: "1px solid rgb(107, 114, 128)",
            padding: 10,
            display: "flex",
            justifyContent: "center",
          }}
          href={props.url}
          target="_blank"
        >
          <span
            style={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {props.url}
          </span>
        </a>
      )}
      <InnerEmbed {...props} />
    </div>
  );
}
