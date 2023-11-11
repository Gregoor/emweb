import type { Config, EmwebMessage } from "@emweb/schemas";

export async function fetchFrameSrc(url: string, options?: RequestInit) {
  const manifestURL = new URL("/.well-known/emweb.json", url);
  const manifest: Config | null = await fetch(manifestURL, options)
    .then((r) => r.json())
    .catch(() => null);
  for (const source of manifest?.sources ?? []) {
    const fromPattern = new URLPattern(
      typeof source == "string" ? source : source.from!,
      url,
    );
    const match = fromPattern.exec(url);
    if (!match) continue;

    if (typeof source == "string") {
      return url;
    }

    return new URL(
      Object.entries(match.pathname.groups).reduce(
        (url, [key, value]) => url.replace(`:${key}`, value ?? ""),
        source.to!,
      ),
      url,
    ).toString();
  }
  return null;
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
