import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Image, LayoutDashboard, BookOpen } from "lucide-react";

const NotFoundPage = () => {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden bg-gray-900 dark:bg-gray-950 px-6 text-center">
      {/* Heading */}
      <h1 className="text-8xl md:text-9xl font-extrabold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent mb-4 z-10">
        404
      </h1>

      {/* Description */}
      <p className="text-lg md:text-xl text-gray-300 mb-6 max-w-2xl z-10">
        Oops! The page you’re looking for doesn’t exist. It may have been moved, deleted, or the URL is incorrect.
      </p>

      {/* Suggestions / Quick links */}
      <div className="flex flex-col md:flex-row gap-4 mb-8 z-10">
        <Link href="/dashboard">
          <Button variant="glass" size="lg" className="flex items-center gap-2">
            <LayoutDashboard className="w-4 h-4" />
            Dashboard
          </Button>
        </Link>
        <Link href="/editor">
          <Button variant="glass" size="lg" className="flex items-center gap-2">
            <Image className="w-4 h-4" />
            Start Editing
          </Button>
        </Link>
        <Link href="/docs">
          <Button variant="glass" size="lg" className="flex items-center gap-2">
            <BookOpen className="w-4 h-4" />
            Documentation
          </Button>
        </Link>
      </div>

      {/* Go Back Home */}
      <Link href="/">
        <Button
          variant="primary"
          size="xl"
          className="flex items-center gap-2 px-8 py-5 z-10"
        >
          <ArrowLeft className="w-5 h-5" />
          Go Back Home
        </Button>
      </Link>

      {/* Background accents */}
      <div className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-gradient-to-r from-blue-500 to-blue-700 rounded-full opacity-20 blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-gradient-to-r from-blue-400 to-blue-600 rounded-full opacity-20 blur-3xl pointer-events-none"></div>
    </div>
  );
};

export default NotFoundPage;
