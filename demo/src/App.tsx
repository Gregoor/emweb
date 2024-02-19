import useLocalStorageState from "use-local-storage-state";

import { Embed, useIsEmbeddable } from "@emweb/react";

export function LabeledEmbed({
  url,
  inputProps,
}: {
  url: string;
  inputProps?: React.ComponentProps<"input">;
}) {
  const isEmbeddable = useIsEmbeddable(url);
  return (
    <div
      style={{
        border: "1px solid rgb(107, 114, 128)",
        borderRadius: 4,
        display: "flex",
        flexDirection: "column",
        width: "fit-content",
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
            color: "inherit",
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
            color: "inherit",
            textDecoration: "none",
          }}
          href={url}
          target="_blank"
        >
          <span
            style={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {url}
          </span>
        </a>
      )}
      {isEmbeddable ? (
        <Embed url={url} />
      ) : (
        <em style={{ padding: 10, display: "flex", justifyContent: "center" }}>
          not embeddable (or loading)
        </em>
      )}
    </div>
  );
}

function App() {
  const [customURL, setCustomURL] = useLocalStorageState("customURL", {
    defaultValue: "",
  });
  return (
    <div style={{ maxWidth: 600, margin: "0 auto" }}>
      <h1>emweb</h1>
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <LabeledEmbed url="https://powl.vercel.app/id/39k80qwag97grwvk4se5h2799jgy8s0" />
        <LabeledEmbed url="https://soundcloud.com/frida-darko/frida-darko-saga-bucht-2023" />
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <h2>Try your own</h2>
          <LabeledEmbed
            url={customURL}
            inputProps={{
              value: customURL,
              onChange: (e) => setCustomURL(e.target.value),
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
