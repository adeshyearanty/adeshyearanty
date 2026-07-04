"use client";

import { motion, useScroll } from "framer-motion";
import { useEffect } from "react";
import { Navigation } from "@/components/Navigation";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { scrollYProgress } = useScroll();

  // Add progress bar at the top of the page
  useEffect(() => {
    const progressBar = document.createElement("div");
    progressBar.className =
      "fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 z-50 transform origin-left";
    document.body.appendChild(progressBar);

    const unsubscribe = scrollYProgress.on("change", (latest) => {
      progressBar.style.transform = `scaleX(${latest})`;
    });

    return () => {
      unsubscribe();
      if (document.body.contains(progressBar)) {
        document.body.removeChild(progressBar);
      }
    };
  }, [scrollYProgress]);

  return (
    <div className="min-h-screen bg-gray-900 text-white overflow-x-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-900/20 to-purple-900/20" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]" />
        {/* Floating animated elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-20 sm:w-32 md:w-64 h-20 sm:h-32 md:h-64 bg-blue-500/5 rounded-full blur-3xl animate-pulse" />
          <div
            className="absolute top-3/4 right-1/4 w-24 sm:w-48 md:w-96 h-24 sm:h-48 md:h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "2s" }}
          />
          <div
            className="absolute top-1/2 left-3/4 w-16 sm:w-24 md:w-48 h-16 sm:h-24 md:h-48 bg-pink-500/5 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "4s" }}
          />
        </div>
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:20px_20px] sm:bg-[size:25px_25px] md:bg-[size:50px_50px]" />
      </div>

      <Navigation />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
