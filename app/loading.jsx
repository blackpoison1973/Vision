import React from "react";
import { Scissors, Droplet, Image } from "lucide-react";

const LoadingPage = () => {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden bg-gray-900 dark:bg-gray-950 px-6 text-center">
      {/* Spinner */}
      <div className="relative w-24 h-24 mb-8">
        <div className="absolute inset-0 rounded-full border-4 border-t-blue-500 border-b-blue-400 border-l-transparent border-r-transparent animate-spin"></div>
        <div className="absolute inset-4 rounded-full border-4 border-t-blue-300 border-b-blue-200 border-l-transparent border-r-transparent animate-spin-slow"></div>
      </div>

      {/* Loading Heading */}
      <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent mb-4 animate-pulse">
        Loading Vision...
      </h1>

      {/* Subtitle */}
      <p className="text-gray-400 max-w-md md:max-w-lg mb-6">
        We’re setting up your workspace so you can create stunning AI-enhanced
        images. This includes preparing editing tools, AI models, and your
        project dashboard.
      </p>

      {/* Feature Highlights */}
      <div className="flex flex-col md:flex-row gap-6 justify-center items-center mb-8 text-gray-300 max-w-xl mx-auto">
        <span className="flex items-center gap-2">
          <Scissors className="w-5 h-5 text-blue-400" /> Smart Crop & Resize
        </span>
        <span className="flex items-center gap-2">
          <Droplet className="w-5 h-5 text-blue-400" /> Color & Light Adjustment
        </span>
        <span className="flex items-center gap-2">
          <Image className="w-5 h-5 text-blue-400" /> AI Background Removal
        </span>
      </div>

      {/* Footer Info */}
      <p className="text-gray-500 text-sm max-w-md">
        Sit tight! Vision optimizes your editing environment to ensure seamless
        performance for all your AI-powered image editing needs.
      </p>

      {/* Background accents */}
      <div className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-gradient-to-r from-blue-500 to-blue-700 rounded-full opacity-20 blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-gradient-to-r from-blue-400 to-blue-600 rounded-full opacity-20 blur-3xl pointer-events-none"></div>
    </div>
  );
};

export default LoadingPage;
