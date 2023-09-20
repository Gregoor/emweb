import type { ResizeMessage } from "@oembed/types";

function postResizeMessage(el: HTMLElement) {
  window.parent?.postMessage(
    {
      type: "oembed:resize",
      width: el.offsetWidth,
      height: el.offsetHeight,
    } satisfies ResizeMessage,
    "*",
  );
}

export function postResizeChanges(element = document.body) {
  postResizeMessage(element);
  const ro = new ResizeObserver(() => {
    postResizeMessage(element);
  });
  ro.observe(element);
  return () => {
    ro.disconnect();
  };
}
