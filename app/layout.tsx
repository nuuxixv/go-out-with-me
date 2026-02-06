import { defaultTheme } from "@/config/theme";
import KakaoScript from "@/components/KakaoScript";

// ... existing code ...

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`font-sans antialiased min-h-screen ${defaultTheme.colors.background}`}>
        {children}
        <KakaoScript />
      </body>
    </html>
  );
}
