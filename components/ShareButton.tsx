"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { Share } from "lucide-react"; // More generic icon
import { useEffect } from "react";

interface ShareButtonProps {
  sender: string;
  title: string;
}

export default function ShareButton({ sender, title }: ShareButtonProps) {
  useEffect(() => {
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
      alert("카카오톡 SDK가 로드되지 않았습니다.");
      return;
    }

    const { Kakao } = window as any;
    const currentUrl = window.location.origin + `/invite?sender=${encodeURIComponent(sender)}&title=${encodeURIComponent(title)}`;

    Kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title: `${sender}님의 데이트 신청 💌`,
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
          title: '확인하기',
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
      className="w-full flex items-center justify-center gap-2 px-5 py-4 bg-[#FEE500] text-[#191919] rounded-2xl font-bold hover:bg-[#FDD835] transition-colors"
      style={{ fontSize: '1.1rem' }}
    >
      <Share size={20} />
      <span>카카오톡으로 보내기</span>
    </button>
  );
}
