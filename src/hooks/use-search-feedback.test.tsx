import { act, renderHook } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";
import { SEARCH_DELAY_MS, useSearchFeedback } from "./use-search-feedback";
afterEach(() => vi.useRealTimers());
it("settles after 500ms and cancels superseded searches", () => {
  vi.useFakeTimers();
  expect(SEARCH_DELAY_MS).toBe(500);
  const { result, rerender } = renderHook(({ keyword }) => useSearchFeedback({ keyword }), { initialProps: { keyword: "" } });
  rerender({ keyword: "DHA" });
  expect(result.current.searching).toBe(true);
  act(() => vi.advanceTimersByTime(400));
  expect(result.current.criteria.keyword).toBe("");
  rerender({ keyword: "Bahria" });
  act(() => vi.advanceTimersByTime(499));
  expect(result.current.searching).toBe(true);
  act(() => vi.advanceTimersByTime(1));
  expect(result.current.criteria.keyword).toBe("Bahria");
  expect(result.current.searching).toBe(false);
});