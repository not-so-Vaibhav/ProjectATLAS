import type { Metadata, Viewport } from "next";
import "@/styles/globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { XP_TopNav } from "@/components/navigation/XP_TopNav";

export const metadata: Metadata = {
  title: {
    default: "Project Atlas | Vaibhav Bariyar",
    template: "%s | Project Atlas"
  },
  description:
    "The digital headquarters of Vaibhav Bariyar — engineer, founder, designer, photographer and lifelong builder. Explore the journey, not just the résumé.",
  metadataBase: new URL("https://atlas.vaibhavbariyar.com"),
  openGraph: {
    title: "Project Atlas — Digital Headquarters of Vaibhav Bariyar",
    description:
      "A living, connected headquarters documenting how Vaibhav Bariyar thinks, builds, learns and continues exploring.",
    type: "website"
  },
  keywords: ["Vaibhav Bariyar", "Portfolio", "Engineer", "Founder", "Designer", "AI", "Atlas"],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "dark light",
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#080808" },
    { media: "(prefers-color-scheme: light)", color: "#F5F4F0" }
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-theme="dark" data-scroll-behavior="smooth" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <ThemeProvider>
          <XP_TopNav />
          <main id="main-content">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
