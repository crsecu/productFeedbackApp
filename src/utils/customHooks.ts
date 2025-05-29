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
      setIsMatching(e.matches);
    }

    mediaWatcher.addEventListener("change", updateIsMatching);

    return function cleanup() {
      mediaWatcher.removeEventListener("change", updateIsMatching);
    };
  }, [mediaQuery]);

  return isMatching;
}
