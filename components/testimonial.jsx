"use client";

import { useState, useEffect } from "react";
import { useIntersectionObserver } from "@/hooks/use-landing-hooks";
import { ChevronLeft, ChevronRight, User } from "lucide-react";

const testimonials = [
  {
    name: "Rohit Sharma",
    role: "Professional Photographer",
    message:
      "Vision has transformed the way I edit my photos. The AI tools are intuitive and save me hours every week!",
  },
  {
    name: "Ananya Singh",
    role: "Digital Artist",
    message:
      "The AI-powered features allow me to focus on creativity instead of tedious editing. Truly a game-changer for designers!",
  },
  {
    name: "Vikram Patel",
    role: "Graphic Designer",
    message:
      "Vision's background removal and color enhancement tools are incredibly precise. My clients are loving the results!",
  },
  {
    name: "Priya Nair",
    role: "Social Media Content Creator",
    message:
      "I can create professional-quality visuals in minutes. Vision makes my content stand out on every platform.",
  },
  {
    name: "Arjun Mehta",
    role: "Photographer & Illustrator",
    message:
      "The interface is sleek, intuitive, and fast. Vision has become my go-to tool for all image enhancements.",
  },
  {
    name: "Sanya Kapoor",
    role: "Visual Designer",
    message:
      "Editing complex images is now effortless. Vision's AI features save me time while delivering professional results.",
  },
  {
    name: "Karan Malhotra",
    role: "Content Creator",
    message:
      "From color correction to background removal, Vision’s tools are fast and accurate. Highly recommended for creatives!",
  },
  {
    name: "Meera Joshi",
    role: "Graphic & UI Designer",
    message:
      "Vision allows me to enhance and manipulate images seamlessly. It's intuitive and perfect for professional work.",
  },
];

const TestimonialCard = ({ testimonial, delay = 0 }) => {
  const [ref, isVisible] = useIntersectionObserver();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`backdrop-blur-lg bg-white/5 border border-white/10 rounded-3xl p-8 max-w-md mx-auto text-center shadow-lg transition-all duration-700
        ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
        ${isHovered ? "scale-105 shadow-2xl" : ""}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="bg-gradient-to-tr from-blue-400 via-blue-500 to-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
        <User className="w-8 h-8 text-white" />
      </div>
      <p className="text-gray-300 italic mb-4">
        &ldquo;{testimonial.message}&rdquo;
      </p>
      <h4 className="text-white font-semibold text-lg">{testimonial.name}</h4>
      <p className="text-blue-400 font-medium text-sm">{testimonial.role}</p>
    </div>
  );
};

const TestimonialsSection = () => {
  const [current, setCurrent] = useState(0);

  const prev = () =>
    setCurrent((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  const next = () =>
    setCurrent((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));

  // Auto-slide
  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-28 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 text-center relative z-10">
        <h2 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-blue-400 to-blue-500 bg-clip-text text-transparent mb-16">
          Hear From Our Creators
        </h2>

        {/* Carousel */}
        <div className="relative">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${current * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div key={index} className="flex-shrink-0 w-full px-4">
                  <TestimonialCard
                    testimonial={testimonial}
                    delay={index * 150}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <div className="flex justify-center mt-10 gap-4">
            <button
              onClick={prev}
              className="p-3 border border-gray-600 rounded-full hover:border-blue-400 hover:text-blue-400 transition"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={next}
              className="p-3 border border-gray-600 rounded-full hover:border-blue-400 hover:text-blue-400 transition"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Dot Indicators */}
          <div className="flex justify-center mt-6 gap-3">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrent(idx)}
                className={`w-3 h-3 rounded-full transition-all ${
                  current === idx
                    ? "bg-blue-400 scale-125"
                    : "bg-gray-600 hover:bg-blue-500"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
