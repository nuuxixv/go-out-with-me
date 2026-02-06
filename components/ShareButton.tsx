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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (typeof window !== "undefined" && (window as any).Kakao) {
      if (!(window as any).Kakao.isInitialized()) {
        // Use a demo key or user's key? 
        // Plan said user needs to provide key.
        // We will try to initialize with env var if present, or let user handle it.
        // For now, we assume script is loaded in layout and initialized there or here.
        // We'll leave initialization for layout or here with a placeholder.
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
    
    // Construct the URL to the Invite Page
    // We need the current domain.
    const currentUrl = window.location.origin + `/invite?sender=${encodeURIComponent(sender)}&title=${encodeURIComponent(title)}`;

    Kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title: `${sender}님의 데이트 신청 💌`,
        description: `"${title}" 함께 하실래요? (거절 불가)`,
        imageUrl:
          'https://cdn.pixabay.com/photo/2019/01/29/18/05/burger-3962996_1280.jpg', // Placeholder tasty food or cute image
        link: {
          mobileWebUrl: currentUrl,
          webUrl: currentUrl,
        },
      },
      buttons: [
        {
          title: '확인하러 가기',
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
      className="flex items-center gap-2 px-6 py-3 bg-[#FEE500] text-[#3B1E1E] rounded-xl font-bold hover:bg-[#FDD835] transition-colors"
    >
      <Share2 size={20} />
      카카오톡으로 신청하기
    </button>
  );
}
