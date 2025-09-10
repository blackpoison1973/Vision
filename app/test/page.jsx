import React from "react";
import { Button } from "@/components/ui/button"; // adjust import path if needed

const TestPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-8">
      <div className="space-y-12 max-w-4xl w-full">
        {/* Page Title */}
        <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-gray-100">
          Button Showcase
        </h1>

        {/* Variants */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300">
            Variants
          </h2>
          <div className="flex flex-wrap gap-4">
            <Button variant="default">Default</Button>
            <Button variant="primary">Primary</Button>
            <Button variant="glass">Glass</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="link">Link</Button>
            <Button variant="destructive">Destructive</Button>
          </div>
        </section>

        {/* Sizes */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300">
            Sizes
          </h2>
          <div className="flex flex-wrap gap-4 items-center">
            <Button size="sm" variant="primary">
              Small
            </Button>
            <Button size="default" variant="primary">
              Default
            </Button>
            <Button size="lg" variant="primary">
              Large
            </Button>
            <Button size="xl" variant="primary">
              Extra Large
            </Button>
            <Button size="icon" variant="primary">
              ⭐
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default TestPage;
