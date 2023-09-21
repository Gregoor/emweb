import { useEffect, useState } from "react";

export function useAbortableEffectState<Value>(
  fn: (signal: AbortSignal) => Promise<Value>,
): Value | null {
  const [value, setValue] = useState<Value | null>(null);
  useEffect(() => {
    const ctrl = new AbortController();
    fn(ctrl.signal).then(setValue);
    return () => {
      ctrl.abort();
    };
  }, [fn]);
  return value;
}

export function useAsyncValue<Value>(fn: () => Promise<Value>) {
  const [state, setState] = useState<
    | { type: "loading" }
    | { type: "success"; value: Value }
    | { type: "error"; error: Error }
  >({
    type: "loading",
  });
  useEffect(() => {
    let isCurrent = true;
    fn()
      .then((value) => {
        if (isCurrent) {
          setState({ type: "success", value });
        }
      })
      .catch((error) => {
        if (isCurrent) {
          setState({ type: "error", error });
        }
      });
    return () => {
      isCurrent = false;
    };
  }, [fn]);
  return state;
}
