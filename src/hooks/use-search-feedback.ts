import { useEffect, useState } from "react";

export const SEARCH_DELAY_MS = 500;

/** Retain the last settled criteria; cancel older searches when input changes. */
export function useSearchFeedback<T>(criteria: T) {
  const serialized = JSON.stringify(criteria);
  const [settled, setSettled] = useState(serialized);
  useEffect(() => {
    if (serialized === settled) return;
    const timer = window.setTimeout(() => setSettled(serialized), SEARCH_DELAY_MS);
    return () => window.clearTimeout(timer);
  }, [serialized, settled]);
  return { criteria: JSON.parse(settled) as T, searching: serialized !== settled };
}