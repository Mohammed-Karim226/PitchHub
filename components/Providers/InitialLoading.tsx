"use client";

import { useState, useEffect } from "react";
import InitialAnimation from "../InitialAnimation/InitialAnimation";

const InitialLoading = ({ children }: { children: React.ReactNode }) => {
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  useEffect(() => {
    const hasSeenAnimation = localStorage.getItem("hasSeenInitialAnimation");

    if (hasSeenAnimation) {
      setIsFirstLoad(false);
    } else {
      localStorage.setItem("hasSeenInitialAnimation", "true");
      setTimeout(() => setIsFirstLoad(false), 3000); // Wait for 3 seconds
    }
  }, []);

  if (isFirstLoad) {
    return <InitialAnimation />;
  }

  return <>{children}</>;
};

export default InitialLoading;
