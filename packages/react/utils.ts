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
