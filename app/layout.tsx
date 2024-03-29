import "./globals.css";
import { Providers } from "./components/Providers";
import "@rainbow-me/rainbowkit/styles.css";
import type { Metadata } from "next";

import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Swap",
  description:
    "DEX Cryptocurrency Swap platform to directly swap tokens using Metamask",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
