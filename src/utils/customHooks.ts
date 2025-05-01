import debounce from "lodash.debounce";

import { useEffect, useState } from "react";

/* Hook that returns true if the viewport width is less than 640px (mobile breakpoint)  */
export function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 640);

  useEffect(() => {
    const handleResize = debounce(() => {
      const viewportWidth = window.innerWidth;
      if (
        (isMobile && viewportWidth >= 640) ||
        (!isMobile && viewportWidth < 640)
      ) {
        setIsMobile(viewportWidth < 640);
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
