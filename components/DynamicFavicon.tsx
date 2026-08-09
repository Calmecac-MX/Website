"use client";

import { useEffect } from "react";

export default function DynamicFavicon() {
  useEffect(() => {
    const matcher = window.matchMedia("(prefers-color-scheme: dark)");

    const updateFavicon = () => {
      const isDark = matcher.matches;
      const faviconHref = isDark
        ? "/assets/favicon/negativo.ico"
        : "/assets/favicon/positivo.ico";

      // Select existing favicon links or create one if not found
      const iconLinks = document.querySelectorAll<HTMLLinkElement>(
        "link[rel~='icon'], link[rel='shortcut icon']"
      );

      if (iconLinks.length > 0) {
        iconLinks.forEach((link) => {
          // If the link has a matching media attribute, let browser handle it,
          // otherwise force update the active main icon href.
          if (!link.hasAttribute("media")) {
            link.href = faviconHref;
            link.type = "image/x-icon";
          }
        });
      } else {
        const link = document.createElement("link");
        link.rel = "icon";
        link.type = "image/x-icon";
        link.href = faviconHref;
        document.head.appendChild(link);
      }
    };

    updateFavicon();

    try {
      matcher.addEventListener("change", updateFavicon);
      return () => matcher.removeEventListener("change", updateFavicon);
    } catch {
      // Fallback for older Safari/browsers
      matcher.addListener(updateFavicon);
      return () => matcher.removeListener(updateFavicon);
    }
  }, []);

  return (
    <>
      <link
        rel="icon"
        href="/assets/favicon/negativo.ico"
        media="(prefers-color-scheme: dark)"
        type="image/x-icon"
      />
      <link
        rel="icon"
        href="/assets/favicon/positivo.ico"
        media="(prefers-color-scheme: light)"
        type="image/x-icon"
      />
    </>
  );
}
