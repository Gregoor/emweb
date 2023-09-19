import type { ResizeMessage } from "@oframe/types";

function postResizeMessage(el: HTMLElement) {
  window.parent?.postMessage(
    {
      type: "oframe:resize",
      width: el.offsetWidth,
      height: el.offsetHeight,
    } satisfies ResizeMessage,
    "*"
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
