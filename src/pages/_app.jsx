import "@/app/globals.css";
import "@/styles/prism.css";
import { MDXProvider } from "@mdx-js/react";
import { CodeBlock } from "@/components/mdx/code-block";
import SiteChrome from "@/components/site-chrome";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Analytics } from "@vercel/analytics/next";
import { cn } from "@/lib/utils";
import { Geist, Geist_Mono } from "next/font/google";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-mono",
});

export default function App({ Component, pageProps }) {
  return (
    <>
      <ThemeProvider
        attribute="class"
        defaultTheme="light"
        enableSystem={false}
        themes={["light", "dark"]}
        disableTransitionOnChange
      >
        <TooltipProvider delayDuration={0}>
          <div
            className={cn(
              "min-h-screen bg-background font-sans text-foreground antialiased relative",
              geist.variable,
              geistMono.variable
            )}
          >
            <SiteChrome contentClassName="pt-12 sm:pt-24">
              <MDXProvider components={{ pre: CodeBlock }}>
                <Component {...pageProps} />
              </MDXProvider>
            </SiteChrome>
          </div>
        </TooltipProvider>
      </ThemeProvider>
      <Analytics />
    </>
  );
}
