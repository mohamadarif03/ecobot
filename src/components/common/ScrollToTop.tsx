import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * ScrollToTop ensures that whenever the route pathname changes,
 * the window scrolls smoothly back to the top of the page.
 */
export function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  return null;
}
