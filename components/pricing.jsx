import { useIntersectionObserver } from "@/hooks/use-landing-hooks";
import { useAuth } from "@clerk/nextjs";
import {
  CheckCircle,
  Crop,
  Gem,
  ImageIcon,
  Layers,
  Maximize,
  Scissors,
  Sparkles,
  Type,
  Upload,
  User,
  Wand2,
} from "lucide-react";
import { Button } from "./ui/button";

const featureIcons = {
  projects: <Layers className="w-5 h-5 text-cyan-400" />,
  exports: <Upload className="w-5 h-5 text-cyan-400" />,
  crop: <Crop className="w-5 h-5 text-cyan-400" />,
  color: <Sparkles className="w-5 h-5 text-cyan-400" />,
  text: <Type className="w-5 h-5 text-cyan-400" />,
  tools: <ImageIcon className="w-5 h-5 text-cyan-400" />,
  bgRemove: <Scissors className="w-5 h-5 text-cyan-400" />,
  extender: <Maximize className="w-5 h-5 text-cyan-400" />,
  retouch: <Wand2 className="w-5 h-5 text-cyan-400" />,
};

const PricingCard = ({
  id,
  plan,
  price,
  features,
  featured = false,
  planId,
  buttonText,
}) => {
  const [ref, isVisible] = useIntersectionObserver();
  const { has } = useAuth();
  const isCurrentPlan = id ? has?.({ plan: id }) : false;

  const handlePopup = async () => {
    if (isCurrentPlan) return;

    try {
      if (window.Clerk && window.Clerk.__internal_openCheckout) {
        await window.Clerk.__internal_openCheckout({
          planId,
          planPeriod: "month",
          subscriberType: "user",
        });
      }
    } catch (error) {
      console.error("Checkout error:", error);
    }
  };

  const getButtonIcon = () => {
    if (isCurrentPlan) return <CheckCircle className="w-4 h-4" />;
    if (plan === "Free") return <User className="w-4 h-4" />;
    if (plan === "Pro") return <Gem className="w-4 h-4" />;
    return null;
  };

  return (
    <div
      ref={ref}
      className={`relative rounded-3xl p-8 border bg-gradient-to-br
        ${
          featured
            ? "from-blue-500/30 to-blue-700/30 border-blue-400/60 shadow-lg shadow-blue-500/40 scale-105"
            : "from-blue-400/10 to-blue-600/10 border-blue-300/20"
        }
        ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
      `}
    >
      {featured && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">
            Popular
          </div>
        </div>
      )}

      <div className="text-center">
        <h3 className="text-2xl font-bold text-white mb-2">{plan}</h3>
        <div className="text-4xl font-extrabold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-6">
          ${price}
          {price > 0 && <span className="text-lg text-gray-400">/mo</span>}
        </div>

        <ul className="space-y-3 mb-8 text-left">
          {features.map(({ text, key }, index) => (
            <li key={index} className="flex items-center gap-3 text-gray-200">
              {featureIcons[key] || (
                <CheckCircle className="w-5 h-5 text-cyan-400" />
              )}
              <span>{text}</span>
            </li>
          ))}
        </ul>

        <Button
          variant={featured ? "primary" : "glass"}
          size="xl"
          className="w-full flex items-center justify-center gap-2"
          onClick={handlePopup}
          disabled={isCurrentPlan || !planId}
        >
          {getButtonIcon()}
          <span>{isCurrentPlan ? "Current Plan" : buttonText}</span>
        </Button>
      </div>
    </div>
  );
};

const PricingSection = () => {
  const plans = [
    {
      id: "free_user",
      plan: "Free",
      price: 0,
      features: [
        { key: "projects", text: "Up to 3 projects" },
        { key: "exports", text: "20 exports per month" },
        { key: "crop", text: "Crop & resize tools" },
        { key: "color", text: "Basic color adjustments" },
        { key: "text", text: "Text editing" },
      ],
      buttonText: "Start Free",
    },
    {
      id: "pro",
      plan: "Pro",
      price: 12,
      features: [
        { key: "projects", text: "Unlimited projects" },
        { key: "exports", text: "Unlimited exports" },
        { key: "tools", text: "All editing tools" },
        { key: "bgRemove", text: "AI background remover" },
        { key: "extender", text: "AI image extender" },
        { key: "retouch", text: "AI retouch & upscaler" },
      ],
      featured: true,
      planId: process.env.NEXT_PUBLIC_PRO_PLAN_ID,
      buttonText: "Go Pro",
    },
  ];

  return (
    <section className="py-20 relative" id="pricing">
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900/40 via-blue-800/20 to-transparent blur-3xl -z-10" />

      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-white mb-6">
            Flexible{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Plans
            </span>
          </h2>
          <p className="text-xl text-gray-300">
            Choose a plan that fits your needs. Upgrade anytime with no hidden
            fees.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plans.map((plan, index) => (
            <PricingCard key={index} {...plan} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
