import { useEffect, useState } from "react";

/* Hook that returns true if the current viewport matches the given media query  */
export function useMatchMedia(mediaQuery: string): boolean {
  const [isMatching, setIsMatching] = useState<boolean>(() =>
    typeof window !== "undefined"
      ? window.matchMedia(mediaQuery).matches
      : false
  );

  useEffect(() => {
    const mediaWatcher = window.matchMedia(mediaQuery);
    setIsMatching(mediaWatcher.matches);

    function updateIsMatching(e: MediaQueryListEvent) {
      console.log("match media???", e);
      setIsMatching(e.matches);
    }

    mediaWatcher.addEventListener("change", updateIsMatching);

    return function cleanup() {
      mediaWatcher.removeEventListener("change", updateIsMatching);
    };
  }, [mediaQuery]);

  return isMatching;
}

//Hook that detects key press and runs onKeyDoen if allowed (when shouldRespondToKey is true)
export function useKeyDown(
  key: string,
  onKeyDown: () => void,
  shouldRespondToKey: boolean = true
): void {
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === key && shouldRespondToKey) onKeyDown();
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [key, onKeyDown, shouldRespondToKey]);
}
