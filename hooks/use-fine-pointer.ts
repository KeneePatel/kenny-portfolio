import { useMediaQuery } from "./use-media-query"

/** A mouse or trackpad that can hover: the only place the ring cursor appears. */
export function useFinePointer(): boolean {
  return useMediaQuery("(hover: hover) and (pointer: fine)")
}
