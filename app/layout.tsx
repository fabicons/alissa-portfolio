import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Lora } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Serif used for Alissa's name and painting titles.
const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Alissa Borsani — Contemporary Artist",
  description:
    "Paintings by Alissa Borsani, a contemporary artist based in Mallorca. Explore Collection I, Collection II and current work.",
};

// Tints the iOS status bar / browser chrome to match the background wash so the
// artwork appears to extend to the very edges of the screen.
export const viewport: Viewport = {
  themeColor: "#e8eff9",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${lora.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
