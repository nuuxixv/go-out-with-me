import type { Metadata } from "next";
import { Jua, Noto_Sans_KR } from "next/font/google"; // Using Google Fonts
import "./globals.css";
import Script from "next/script";

const jua = Jua({ 
  weight: "400",
  subsets: ["latin"],
  variable: "--font-jua",
});

const notoSansKr = Noto_Sans_KR({
  subsets: ["latin"],
  variable: "--font-noto",
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
      <body className={`${jua.variable} ${notoSansKr.variable} font-sans antialiased text-gray-900`}>
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
