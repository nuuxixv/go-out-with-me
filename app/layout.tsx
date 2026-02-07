import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import KakaoScript from "@/components/KakaoScript";

// Local Font: Laundry Gothic
const laundryGothic = localFont({
  src: [
    {
      path: "./fonts/LaundryGothic-Regular.woff",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/LaundryGothic-Bold.woff",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-laundry",
});

export const metadata: Metadata = {
  title: "Go Out With Me?",
  description: "메시지가 도착했어요!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="font-sans antialiased min-h-screen bg-cream">
        {children}
        <Analytics />
        <KakaoScript />
      </body>
    </html>
  );
}
