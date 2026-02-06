"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { Share2 } from "lucide-react";
import { useEffect } from "react";

interface ShareButtonProps {
  sender: string;
  title: string;
}

export default function ShareButton({ sender, title }: ShareButtonProps) {
  useEffect(() => {
    // Initialize Kakao SDK if available
    if (typeof window !== "undefined" && (window as any).Kakao) {
      if (!(window as any).Kakao.isInitialized()) {
        const kakaoKey = process.env.NEXT_PUBLIC_KAKAO_API_KEY; 
        if(kakaoKey) {
            (window as any).Kakao.init(kakaoKey);
        }
      }
    }
  }, []);

  const handleShare = () => {
    if (typeof window === "undefined" || !(window as any).Kakao) {
      alert("카카오톡 SDK가 로드되지 않았습니다. (배포 필요)");
      return;
    }

    const { Kakao } = window as any;
    const currentUrl = window.location.origin + `/invite?sender=${encodeURIComponent(sender)}&title=${encodeURIComponent(title)}`;

    Kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title: `${sender}님의 플러팅 💘`,
        description: `"${title}" (거절 버튼 없음)`,
        imageUrl:
          'https://cdn.pixabay.com/photo/2023/08/23/15/40/sugar-cookie-8208759_1280.png',
        link: {
          mobileWebUrl: currentUrl,
          webUrl: currentUrl,
        },
      },
      buttons: [
        {
          title: '🔥 확인하러 가기',
          link: {
            mobileWebUrl: currentUrl,
            webUrl: currentUrl,
          },
        },
      ],
    });
  };

  return (
    <button
      onClick={handleShare}
      className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-[#FEE500] text-[#3B1E1E] rounded-xl font-bold hover:bg-[#FDD835] transition-transform hover:scale-105 active:scale-95 shadow-lg"
    >
      <Share2 size={24} />
      <span className="text-lg">카카오톡으로 던지기</span>
    </button>
  );
}
