"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";

gsap.registerPlugin(DrawSVGPlugin);

export default function BackgroundSvgAnimator() {
  useEffect(() => {
    const svgs = gsap.utils.toArray<SVGGElement>(".bg-svg");
    svgs.forEach((el) => {
      const duration = parseFloat(el.getAttribute("data-anim-duration") || "2");
      const tween = gsap.fromTo(
        el,
        { drawSVG: "0%" },
        { drawSVG: "100%", repeat: -1, yoyo: true, ease: "power1.inOut", duration }
      );
      // pause when page hidden
      const handleVisibility = () => {
        if (document.hidden) {
          tween.pause();
        } else {
          tween.resume();
        }
      };
      document.addEventListener("visibilitychange", handleVisibility);
      return () => {
        document.removeEventListener("visibilitychange", handleVisibility);
        tween.kill();
      };
    });
  }, []);

  return null;
}
