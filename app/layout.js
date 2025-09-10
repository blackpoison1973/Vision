import { ConvexClientProvider } from "@/components/convex-client-provider";
import { FloatingShapes } from "@/components/floating-shapes";
import Header from "@/components/header";
import { ThemeProvider } from "@/components/theme-provider";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { Jost } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const font = Jost({ subsets: ["latin"] });

export const metadata = {
  title: "Vision – Redefining AI Image Editing",
  description:
    "Vision is a cutting-edge AI image editing platform built for professionals and creators who demand excellence. Transform ideas into powerful visuals with unmatched clarity, speed, and precision.",
  keywords: [
    "AI image editor",
    "AI photo editing",
    "AI design tool",
    "online image editor",
    "Vision AI editor",
    "AI art generator",
    "AI-powered creativity",
  ],
  authors: [
    { name: "Soumojit Banerjee", url: "https://github.com/soumojit622" },
  ],
  icons: {
    icon: "/logo.svg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/logo.svg" sizes="any" />
      </head>
      <body className={`${font.className}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <ClerkProvider
            publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
            appearance={{
              baseTheme: dark,
              variables: {
                colorPrimary: "#60A5FA",
                colorBackground: "#0a1120",
              },
              elements: {
                rootBox: "bg-[#0a1120]",
                formButtonPrimary:
                  "bg-[#60A5FA] hover:bg-[#3b82f6] text-white shadow-md transition",
                card: "bg-[#0a1120] border border-white/10 shadow-xl rounded-2xl",
              },
            }}
          >
            <ConvexClientProvider>
            <Header />
            <main className="min-h-screen text-white overflow-x-hidden">
              <FloatingShapes />
              <Toaster richColors />

              {children}
            </main>
            </ConvexClientProvider>
          </ClerkProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
