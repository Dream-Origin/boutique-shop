import { useState, useEffect } from "react";

/**
 * Custom React hook to detect if the screen is mobile (width below maxWidth).
 * @param {number} maxWidth - Max width in px considered mobile (default 700).
 * @returns {boolean} true if device is mobile.
 */
function useIsMobile(maxWidth = 700) {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < maxWidth);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < maxWidth);
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, [maxWidth]);

  return isMobile;
}

export default useIsMobile;
