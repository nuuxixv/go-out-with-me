"use client";

import Script from "next/script";

export default function KakaoScript() {
    const onLoad = () => {
        if ((window as any).Kakao && !(window as any).Kakao.isInitialized()) {
            const kakaoKey = process.env.NEXT_PUBLIC_KAKAO_API_KEY;
            if (kakaoKey) {
                (window as any).Kakao.init(kakaoKey);
                console.log("Kakao SDK Initialized");
            }
        }
    };

    return (
        <Script
            src="https://t1.kakaocdn.net/kakao_js_sdk/2.7.2/kakao.min.js"
            integrity="sha384-TiCUE00h649CAMonG018J2ujOgDKW/kVWlChEuu4jK2txfDWp1Ps941/+NC7Ubt+"
            crossOrigin="anonymous"
            strategy="afterInteractive" // Load immediately after hydration
            onLoad={onLoad}
        />
    );
}
