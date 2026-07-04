import { useState, useEffect } from "react";

export function useResponsive() {
  const [state, setState] = useState({
    isMobile: false,
    isTablet: false,
    isLaptop: false,
    isDesktop: false,
    width: typeof window !== "undefined" ? window.innerWidth : 1200,
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleResize = () => {
      const w = window.innerWidth;
      setState({
        isMobile: w < 768,
        isTablet: w >= 768 && w < 1024,
        isLaptop: w >= 1024 && w < 1440,
        isDesktop: w >= 1440,
        width: w,
      });
    };

    // Initial check
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return state;
}
