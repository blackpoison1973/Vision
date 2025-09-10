"use client";

import { useState } from "react";
import { useStoreUser } from "@/hooks/use-store-user";
import { SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { Authenticated, Unauthenticated } from "convex/react";
import {
  BadgeIndianRupee,
  LayoutDashboard,
  LogIn,
  Mail,
  Menu,
  Sparkles,
  UserPlus,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarLoader } from "react-spinners";
import { Button } from "./ui/button";

export default function Header() {
  const { isLoading } = useStoreUser();
  const path = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  if (path.includes("/editor")) {
    return null; // Hide header on editor page
  }

  return (
    <header className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-6xl px-4">
      {/* Glass Navigation Container */}
      <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-full px-4 md:px-6 py-3 flex items-center justify-between shadow-lg">
        {/* Logo + Text */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="Vision Logo"
            width={32}
            height={32}
            className="object-contain"
            priority
          />
          <span className="text-lg md:text-2xl font-extrabold bg-gradient-to-r from-blue-400 to-cyan-500 bg-clip-text text-transparent">
            Vision
          </span>
        </Link>

        {/* Desktop Navigation */}
        {path === "/" && (
          <nav className="hidden md:flex space-x-8">
            <Link
              href="#features"
              className="flex items-center gap-2 text-gray-200 font-medium hover:text-cyan-400 transition"
            >
              <Sparkles className="h-4 w-4" />
              Features
            </Link>
            <Link
              href="#pricing"
              className="flex items-center gap-2 text-gray-200 font-medium hover:text-cyan-400 transition"
            >
              <BadgeIndianRupee className="h-4 w-4" />
              Pricing
            </Link>
            <Link
              href="#contact"
              className="flex items-center gap-2 text-gray-200 font-medium hover:text-cyan-400 transition"
            >
              <Mail className="h-4 w-4" />
              Contact
            </Link>
          </nav>
        )}

        {/* Desktop Auth */}
        <div className="hidden sm:flex items-center gap-3">
          <Authenticated>
            <Link href="/dashboard">
              <Button variant="glass" className="hidden sm:flex">
                <LayoutDashboard className="h-4 w-4 mr-1" />
                <span className="hidden md:flex">Dashboard</span>
              </Button>
            </Link>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-8 h-8 rounded-lg border border-white/20",
                  userButtonPopoverCard:
                    "shadow-xl backdrop-blur-md bg-slate-900/90 border border-white/20",
                  userPreviewMainIdentifier: "font-semibold text-white",
                },
              }}
              afterSignOutUrl="/"
            />
          </Authenticated>

          <Unauthenticated>
            <SignInButton>
              <Button variant="glass" className="flex items-center gap-2">
                <LogIn className="h-4 w-4" />
                Sign In
              </Button>
            </SignInButton>
            <SignUpButton>
              <Button variant="primary" className="flex items-center gap-2">
                <UserPlus className="h-4 w-4" />
                Get Started
              </Button>
            </SignUpButton>
          </Unauthenticated>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="sm:hidden flex items-center text-gray-200 hover:text-cyan-400"
        >
          {mobileOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileOpen && (
        <div className="sm:hidden mt-2 rounded-2xl backdrop-blur-xl bg-white/10 border border-white/20 shadow-lg px-4 py-4 space-y-4">
          {path === "/" && (
            <nav className="flex flex-col space-y-3">
              <Link
                href="#features"
                className="flex items-center gap-2 text-gray-200 font-medium hover:text-cyan-400 transition"
                onClick={() => setMobileOpen(false)}
              >
                <Sparkles className="h-4 w-4" />
                Features
              </Link>
              <Link
                href="#pricing"
                className="flex items-center gap-2 text-gray-200 font-medium hover:text-cyan-400 transition"
                onClick={() => setMobileOpen(false)}
              >
                <BadgeIndianRupee className="h-4 w-4" />
                Pricing
              </Link>
              <Link
                href="#contact"
                className="flex items-center gap-2 text-gray-200 font-medium hover:text-cyan-400 transition"
                onClick={() => setMobileOpen(false)}
              >
                <Mail className="h-4 w-4" />
                Contact
              </Link>
            </nav>
          )}

          <div className="flex flex-col space-y-3">
            <Authenticated>
              <Link href="/dashboard" onClick={() => setMobileOpen(false)}>
                <Button variant="glass" className="w-full justify-center">
                  <LayoutDashboard className="h-4 w-4 mr-1" />
                  Dashboard
                </Button>
              </Link>
              <UserButton afterSignOutUrl="/" />
            </Authenticated>

            <Unauthenticated>
              <SignInButton>
                <Button
                  variant="glass"
                  className="w-full justify-center gap-2"
                  onClick={() => setMobileOpen(false)}
                >
                  <LogIn className="h-4 w-4" />
                  Sign In
                </Button>
              </SignInButton>
              <SignUpButton>
                <Button
                  variant="primary"
                  className="w-full justify-center gap-2"
                  onClick={() => setMobileOpen(false)}
                >
                  <UserPlus className="h-4 w-4" />
                  Get Started
                </Button>
              </SignUpButton>
            </Unauthenticated>
          </div>
        </div>
      )}

      {/* Loader */}
      {isLoading && (
        <div className="fixed bottom-0 left-0 w-full z-40 flex justify-center">
          <BarLoader width={"95%"} color="#06b6d4" />
        </div>
      )}
    </header>
  );
}
