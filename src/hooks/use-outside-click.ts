// src/hooks/use-outside-click.ts
import { RefObject, useEffect } from "react";

/**
 * Calls `handler` when a click or touch starts outside the provided ref element.
 * - ref: React ref to the element that should remain "inside"
 * - handler: function called when an outside click/touch occurs
 * - enabled: optional boolean to enable/disable listeners (defaults to true)
 */
export function useOutsideClick<T extends HTMLElement>(
  ref: RefObject<T>,
  handler: (ev?: Event) => void,
  enabled = true
) {
  useEffect(() => {
    if (!enabled) return;

    function onEvent(e: Event) {
      const el = ref?.current;
      if (!el) return;
      // If the click/tap is outside the element, call handler
      if (!el.contains(e.target as Node)) handler(e);
    }

    // Use capture so outside clicks are detected before other handlers stopPropagation
    document.addEventListener("mousedown", onEvent, true);
    document.addEventListener("touchstart", onEvent, true);

    return () => {
      document.removeEventListener("mousedown", onEvent, true);
      document.removeEventListener("touchstart", onEvent, true);
    };
  }, [ref, handler, enabled]);
}
