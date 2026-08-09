"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { useRouter } from "next/navigation";

export type CurtainPhase = "idle" | "dropping" | "covered" | "lifting";

interface CurtainContextType {
  curtainPhase: CurtainPhase;
  triggerCurtain: (targetUrl?: string, callback?: () => void) => void;
  setCurtainPhase: (phase: CurtainPhase) => void;
}

const CurtainContext = createContext<CurtainContextType>({
  curtainPhase: "idle",
  triggerCurtain: () => {},
  setCurtainPhase: () => {},
});

export function CurtainProvider({ children }: { children: React.ReactNode }) {
  const [curtainPhase, setCurtainPhase] = useState<CurtainPhase>("idle");
  const router = useRouter();

  const triggerCurtain = useCallback(
    (targetUrl?: string, callback?: () => void) => {
      // Start dropping curtain
      setCurtainPhase("dropping");

      // After dropping duration, execute navigation or callback
      setTimeout(() => {
        setCurtainPhase("covered");
        if (targetUrl) {
          router.push(targetUrl);
        }
        if (callback) {
          callback();
        }

        // Lift curtain after navigating / loading page
        setTimeout(() => {
          setCurtainPhase("lifting");
          setTimeout(() => {
            setCurtainPhase("idle");
          }, 800);
        }, 350);
      }, 750);
    },
    [router]
  );

  return (
    <CurtainContext.Provider
      value={{
        curtainPhase,
        triggerCurtain,
        setCurtainPhase,
      }}
    >
      {children}
    </CurtainContext.Provider>
  );
}

export function useCurtain() {
  return useContext(CurtainContext);
}
