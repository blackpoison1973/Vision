"use client";

import { useIntersectionObserver } from "@/hooks/use-landing-hooks";
import { useState } from "react";
import {
  Scissors,
  ImageIcon,
  Palette,
  Cpu,
  ArrowUp,
  Settings,
} from "lucide-react";

// Feature Card Component
const FeatureCard = ({ icon, title, description, delay = 0 }) => {
  const [ref, isVisible] = useIntersectionObserver();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      ref={ref}
      className={`backdrop-blur-lg bg-white/5 border border-white/10 rounded-3xl p-8 flex flex-col items-center text-center transition-all duration-700 cursor-pointer shadow-md ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      } ${
        isHovered ? "transform scale-105 shadow-2xl shadow-blue-500/40" : ""
      }`}
      style={{ transitionDelay: `${delay}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="bg-gradient-to-tr from-blue-400 via-blue-500 to-blue-600 p-5 rounded-full mb-5 shadow-lg flex items-center justify-center">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-white mb-3">{title}</h3>
      <p className="text-gray-300 text-sm leading-relaxed">{description}</p>
    </div>
  );
};

// Features Section Component
const FeaturesSection = () => {
  const features = [
    {
      icon: <Scissors className="w-8 h-8 text-white" />,
      title: "Smart Crop & Resize",
      description:
        "Precisely crop and resize your images with AI-powered aspect ratio constraints that preserve quality in every dimension.",
    },
    {
      icon: <Palette className="w-8 h-8 text-white" />,
      title: "Color & Light Enhancement",
      description:
        "Fine-tune brightness, contrast, and saturation with real-time previews and intelligent auto-enhance suggestions.",
    },
    {
      icon: <ImageIcon className="w-8 h-8 text-white" />,
      title: "AI Background Removal",
      description:
        "Instantly remove or replace backgrounds using AI that accurately detects complex edges and intricate details.",
    },
    {
      icon: <Cpu className="w-8 h-8 text-white" />,
      title: "AI Content Editor",
      description:
        "Edit images with natural language prompts. Remove objects, change elements, or generate new content seamlessly.",
    },
    {
      icon: <ArrowUp className="w-8 h-8 text-white" />,
      title: "AI Upscaler",
      description:
        "Increase image resolution up to 4x while preserving details and reducing artifacts for crystal-clear results.",
    },
    {
      icon: <Settings className="w-8 h-8 text-white" />,
      title: "Image Extender",
      description:
        "Expand your canvas in any direction using AI generative fill that blends new content naturally with the original image.",
    },
  ];

  return (
    <section className="py-24 relative overflow-hidden" id="features">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-blue-400 to-blue-500 bg-clip-text text-transparent mb-6"> 
            Powerful AI Features
          </h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Explore a complete suite of AI-powered tools to create, edit, and
            enhance images with professional precision and creative freedom.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} delay={index * 150} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
