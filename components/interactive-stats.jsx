"use client";

import {
  useAnimatedCounter,
  useIntersectionObserver,
} from "@/hooks/use-landing-hooks";
import { useEffect } from "react";
import { Users, Image, Cpu, Smile } from "lucide-react"; // Lucide icons

const AnimatedCounter = ({ target, suffix = "", duration = 2000 }) => {
  const [ref, isVisible] = useIntersectionObserver();
  const [count, setIsActive] = useAnimatedCounter(target, duration);

  useEffect(() => {
    if (isVisible) setIsActive(true);
  }, [isVisible, setIsActive]);

  return (
    <span
      ref={ref}
      className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent transition-all duration-700"
    >
      {count.toLocaleString()}
      {suffix}
    </span>
  );
};

const InteractiveStats = () => {
  const stats = [
    {
      label: "Images Processed",
      value: 10000,
      suffix: "+",
      icon: <Image className="w-6 h-6 mx-auto mb-2 text-blue-400" />,
    },
    {
      label: "Active Users",
      value: 500,
      suffix: "+",
      icon: <Users className="w-6 h-6 mx-auto mb-2 text-blue-400" />,
    },
    {
      label: "AI Transformations",
      value: 45000,
      suffix: "+",
      icon: <Cpu className="w-6 h-6 mx-auto mb-2 text-blue-400" />,
    },
    {
      label: "User Satisfaction",
      value: 98,
      suffix: "%",
      icon: <Smile className="w-6 h-6 mx-auto mb-2 text-blue-400" />,
    },
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <h2 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-blue-400 to-blue-500 bg-clip-text text-transparent text-center mb-16">
          Our Impact So Far
        </h2>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-blue-700/40 to-cyan-700/30 backdrop-blur-md rounded-3xl p-6 flex flex-col items-center justify-center shadow-xl hover:scale-105 transition-transform duration-300 h-44"
            >
              {stat.icon}
              <div className="text-3xl lg:text-4xl font-extrabold mb-2">
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-gray-300 uppercase tracking-wide text-sm text-center">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InteractiveStats;
