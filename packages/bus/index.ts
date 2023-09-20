import type { ResizeMessage } from "@emweb/schemas";

function postResizeMessage(el: HTMLElement) {
  window.parent?.postMessage(
    {
      type: "emweb:resize",
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
