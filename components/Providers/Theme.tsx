"use client";

import { ReactNode, useState, useEffect } from "react";
import Lottie from "lottie-react";
import animation from "../lottie/startup-animation.json";

const Theme = ({ children }: { children: ReactNode }) => {
  const [showAnimation, setShowAnimation] = useState(false);

  useEffect(() => {
    const hasAnimationSeen = localStorage.getItem("hasAnimationSeen");
    if (!hasAnimationSeen){
      setShowAnimation(true);
      localStorage.setItem("hasAnimationSeen", "true");
      const timer = setTimeout(() => {
        setShowAnimation(false);
      }, 3000);
  
      return () => clearTimeout(timer);
    }
    
  }, []);

  return (
    <div>
      {showAnimation ? (
        <div
          className="flex justify-center items-center h-[100vh] overflow-hidden"
        >
          <div className="w-[500px] h-[500px]">
            <Lottie animationData={animation} loop={false} />
          </div>
        </div>
      ) : (
        children
      )}
    </div>
  );
};

export default Theme;
