"use client";
import { useState, useEffect } from "react";
import Animation from "../../components/lottie/startup-animation.json";
import Lottie from "lottie-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const InitialAnimation = () => {
  const [isShown, setIsShown] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsShown(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      exit={{ opacity: 0 }}
      className={cn(
        "w-full h-screen z-10 bg-white overflow-hidden",
        isShown ? "flex justify-center items-center" : "hidden"
      )}
    >
      <Lottie
        animationData={Animation}
        loop={false}
        className="w-[300px] h-[300px]"
      />{" "}
    </motion.div>
  );
};

export default InitialAnimation;
