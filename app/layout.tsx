import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import clsx from "clsx";
import Navigation from "./ui/navigation";
import Particles from "./ui/particles";

import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
config.autoAddCss = false

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Vitaliy Bychik',
  description: 'Personal website of Vitaliy Bychik, a software engineer and web developer.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={clsx(
        "antialiased bg-black text-neutral-100",
        inter.className
      )}>
        <Navigation />
        {children}
        <Particles
          className="fixed inset-0 -z-10 animate-fade-in"
          quantity={150}
        />
      </body>
    </html>
  );
}
