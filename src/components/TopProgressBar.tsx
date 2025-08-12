"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

export default function TopProgressBar() {
  const pathname = usePathname();

  useEffect(() => {
    NProgress.configure({ showSpinner: false, trickleSpeed: 100 });
    NProgress.start();

    const timeout = setTimeout(() => {
      NProgress.done();
    }, 800); // how long the bar stays visible

    return () => clearTimeout(timeout);
  }, [pathname]);

  return null;
}
