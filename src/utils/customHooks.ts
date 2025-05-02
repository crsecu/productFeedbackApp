import debounce from "lodash.debounce";

import { useEffect, useState } from "react";

/* Hook that returns true if the viewport width is less than 768px (mobile + tablet breakpoint)  */
export function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = debounce(() => {
      const viewportWidth = window.innerWidth;
      if (
        (isMobile && viewportWidth >= 768) ||
        (!isMobile && viewportWidth < 768)
      ) {
        setIsMobile(viewportWidth < 768);
      }
    }, 100);

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      handleResize.cancel();
    };
  }, [isMobile]);

  return isMobile;
}
