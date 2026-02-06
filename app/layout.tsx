import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Script from "next/script";

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
  title: "Go Out With Me? 🍪",
  description: "거절할 수 없는 데이트 신청을 보내보세요!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${laundryGothic.variable} font-sans antialiased`}>
        {children}
        <Script
          src="https://t1.kakaocdn.net/kakao_js_sdk/2.7.2/kakao.min.js"
          integrity="sha384-TiCUE00h649CAMonG018J2ujOgDKW/kVWlChEuu4jK2txfDWp1Ps941/+NC7Ubt+"
          crossOrigin="anonymous"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}
