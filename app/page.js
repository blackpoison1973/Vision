"use client";

// import FeaturesSection from "@/components/features";
// import InteractiveStats from "@/components/interactive-stats";
// import PricingSection from "@/components/pricing";
import FeaturesSection from "@/components/features";
import InteractiveStats from "@/components/interactive-stats";
import PricingSection from "@/components/pricing";
import TestimonialsSection from "@/components/testimonial";
import { Button } from "@/components/ui/button";
import { Linkedin } from "lucide-react";
import {
  ArrowRight,
  Crop,
  Github,
  Palette,
  PlayCircle,
  Rocket,
  Ruler,
  Sparkles,
  Twitter,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
// import PricingSection from "@/components/pricing";

// Hero Section Component
const HeroSection = () => {
  const [textVisible, setTextVisible] = useState(false);
  const [demoHovered, setDemoHovered] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setTextVisible(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="text-center z-10 px-6">
        <div
          className={`transition-all duration-1000 ${
            textVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          <h1 className="text-6xl md:text-9xl font-black mb-6 tracking-tight">
            <span className="bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 bg-clip-text text-transparent">
              Innovate
            </span>
            <br />
            <span className="text-white">Beyond Barriers</span>
          </h1>

          <p className="text-xl text-gray-400 mb-8 max-w-3xl mx-auto leading-relaxed">
            Unlock powerful AI-driven tools for your images. Trim, resize,
            fine-tune colors, erase backgrounds, and create stunning visuals
            effortlessly.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
            <Link href="/dashboard">
              <Button
                variant="primary"
                size="xl"
                className="flex items-center gap-2"
              >
                <Rocket className="w-5 h-5" />
                Get Started
              </Button>
            </Link>
            <Button
              variant="glass"
              size="xl"
              className="flex items-center gap-2"
            >
              <PlayCircle className="w-5 h-5" />
              View Demo
            </Button>
          </div>
        </div>

        {/* 3D Demo Interface */}
        <div
          className={`relative max-w-4xl mx-auto transition-all duration-1000 ${
            textVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-20"
          } ${demoHovered ? "transform scale-105 rotate-y-6" : ""}`}
          onMouseEnter={() => setDemoHovered(true)}
          onMouseLeave={() => setDemoHovered(false)}
          style={{ perspective: "1000px" }}
        >
          <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-3xl p-6 transform-gpu shadow-2xl shadow-blue-500/20">
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8 min-h-96">
              <div className="flex items-center justify-between mb-6">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <div className="text-gray-400 text-sm">Vision</div>
              </div>

              <div className="grid grid-cols-4 gap-4 mb-6">
                {[
                  {
                    icon: <Crop className="w-6 h-6 mx-auto text-blue-400" />,
                    label: "Crop",
                  },
                  {
                    icon: <Ruler className="w-6 h-6 mx-auto text-blue-400" />,
                    label: "Resize",
                  },
                  {
                    icon: <Palette className="w-6 h-6 mx-auto text-blue-400" />,
                    label: "Enhance",
                  },
                  {
                    icon: (
                      <Sparkles className="w-6 h-6 mx-auto text-blue-400" />
                    ),
                    label: "AI Tools",
                  },
                ].map((tool, index) => (
                  <div
                    key={index}
                    className="backdrop-blur-lg bg-blue-500/10 rounded-xl p-4 text-center hover:bg-blue-500/20 transition-all cursor-pointer border border-blue-400/20"
                    title={tool.label}
                  >
                    <div className="mb-2">{tool.icon}</div>
                    <div className="text-xs text-gray-300">{tool.label}</div>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-center">
                <div className="w-full h-48 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 rounded-2xl shadow-2xl shadow-blue-500/50 flex items-center justify-center">
                  <div className="text-white font-bold">Interactive Canvas</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Main App Component
const App = () => {
  return (
    <div className="pt-36">
      <HeroSection />
      <InteractiveStats />
      <FeaturesSection />
      <PricingSection />

      <TestimonialsSection/>

      {/* Final CTA Section */}
      <section className="py-24 text-center bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 relative overflow-hidden">
        {/* Background Spots */}
        <div className="absolute top-[-10%] left-[-10%] w-72 h-72 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-[-15%] right-[-5%] w-96 h-96 bg-blue-400/15 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-[20%] right-[-10%] w-56 h-56 bg-cyan-500/10 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-[25%] left-[-8%] w-48 h-48 bg-blue-600/10 rounded-full blur-2xl animate-pulse"></div>

        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <h2 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
            Ready to{" "}
            <span className="bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 bg-clip-text text-transparent">
              Bring Your Ideas to Life?
            </span>
          </h2>

          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-2xl mx-auto">
            Join a thriving community of creators leveraging AI to{" "}
            <span className="text-white font-semibold">
              turn concepts into stunning visuals
            </span>
            . Edit, enhance, and design without limits.
          </p>

          {/* Centered Button */}
          <div className="flex justify-center">
            <Link href="/dashboard">
              <Button
                variant="primary"
                size="xl"
                className="group flex items-center gap-4 px-10 py-4 text-lg rounded-2xl shadow-lg hover:shadow-2xl hover:scale-[1.03] transition-transform duration-300"
              >
                <Sparkles className="w-5 h-5" />
                Start Creating
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <section className="py-6 bg-black text-gray-400 text-sm relative overflow-hidden">
        {/* Decorative subtle dots */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="w-full h-full bg-[radial-gradient(circle,rgba(59,130,246,0.1) 1px,transparent 1px)] bg-[length:20px_20px]"></div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo & Tagline */}
          <div className="flex flex-col md:flex-row items-center gap-2">
            <span className="bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 bg-clip-text text-transparent font-semibold text-lg">
              Vision
            </span>
            <span>&copy; {new Date().getFullYear()}</span>
            <span className="hidden md:inline text-gray-400 mx-2">|</span>
            <span className="text-gray-400 hidden md:inline">
              Empowering creators with AI-powered image tools
            </span>
          </div>

          {/* Links with separator */}
          <div className="flex items-center gap-2">
            <Link href="/privacy" className="hover:text-blue-400 transition">
              Privacy
            </Link>
            <span className="text-gray-600">|</span>
            <Link href="/terms" className="hover:text-blue-400 transition">
              Terms
            </Link>
          </div>

          {/* Social Icons with borders */}
          <div className="flex items-center gap-3">
            <Link
              href="https://twitter.com"
              target="_blank"
              className="p-2 border border-gray-600 rounded-full hover:border-blue-400 hover:text-blue-400 transition"
            >
              <Twitter className="w-5 h-5" />
            </Link>
            <Link
              href="https://github.com"
              target="_blank"
              className="p-2 border border-gray-600 rounded-full hover:border-blue-400 hover:text-blue-400 transition"
            >
              <Github className="w-5 h-5" />
            </Link>
            <Link
              href="https://linkedin.com"
              target="_blank"
              className="p-2 border border-gray-600 rounded-full hover:border-blue-400 hover:text-blue-400 transition"
            >
              <Linkedin className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default App;
