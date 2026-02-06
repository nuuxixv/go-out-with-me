"use client";

import Script from "next/script";

declare global {
    interface Window {
        Kakao: any;
    }
}

export default function KakaoScript() {
    const onLoad = () => {
        if (window.Kakao && !window.Kakao.isInitialized()) {
            const kakaoKey = process.env.NEXT_PUBLIC_KAKAO_API_KEY;
            if (kakaoKey) {
                window.Kakao.init(kakaoKey);
                console.log("Kakao SDK Initialized");
            }
        }
    };

    return (
        <script src="https://t1.kakaocdn.net/kakao_js_sdk/2.7.7/kakao.min.js" integrity="sha384-tJkjbtDbvoxO+diRuDtwRO9JXR7pjWnfjfRn5ePUpl7e7RJCxKCwwnfqUAdXh53p" crossOrigin="anonymous"></script>
    );
}
