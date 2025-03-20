import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import NProgressProvider from "@/components/Providers/NProgressProvider";
import Theme from "@/components/Providers/Theme";
import { Toaster } from "@/components/ui/toaster";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "PitchHub",
  description: "A hub for startups to pitch ideas and gain votes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Theme>
          <NProgressProvider>{children}</NProgressProvider>
          <Toaster />
        </Theme>
      </body>
    </html>
  );
}
