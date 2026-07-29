"use client";

import { createContext, useContext, useState } from "react";

interface LoaderContextType {
  isLoaded: boolean;
  finishLoading: () => void;
}

const LoaderContext = createContext<LoaderContextType>({
  isLoaded: false,
  finishLoading: () => {},
});

export function LoaderProvider({ children }: { children: React.ReactNode }) {
  const [isLoaded, setIsLoaded] = useState(false);

  const finishLoading = () => {
    setIsLoaded(true);
  };

  return (
    <LoaderContext.Provider value={{ isLoaded, finishLoading }}>
      {children}
    </LoaderContext.Provider>
  );
}

export function useLoader() {
  return useContext(LoaderContext);
}
