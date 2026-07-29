"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";

gsap.registerPlugin(DrawSVGPlugin);

export default function BackgroundSvgAnimator() {
  useEffect(() => {
    const svgs = gsap.utils.toArray<SVGGElement>(".bg-svg");
    const activeTweens: gsap.core.Tween[] = [];
    const activeListeners: { fn: () => void }[] = [];

    svgs.forEach((el) => {
      const duration = parseFloat(el.getAttribute("data-anim-duration") || "2");
      const tween = gsap.fromTo(
        el,
        { drawSVG: "0%" },
        { drawSVG: "100%", repeat: -1, yoyo: true, ease: "power1.inOut", duration }
      );
      activeTweens.push(tween);

      // pause when page hidden
      const handleVisibility = () => {
        if (document.hidden) {
          tween.pause();
        } else {
          tween.resume();
        }
      };
      document.addEventListener("visibilitychange", handleVisibility);
      activeListeners.push({ fn: handleVisibility });
    });

    return () => {
      activeListeners.forEach((listener) => {
        document.removeEventListener("visibilitychange", listener.fn);
      });
      activeTweens.forEach((tween) => {
        tween.kill();
      });
    };
  }, []);

  return null;
}
