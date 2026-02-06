"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { Share, Link, Check, Smartphone, Instagram } from "lucide-react";
import { useEffect, useState } from "react";

interface ShareButtonProps {
  sender: string;
  title: string;
}

export default function ShareButton({ sender, title }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);
  const [canShare, setCanShare] = useState(false);

  useEffect(() => {
    // Check if Web Share API is supported
    if (typeof navigator !== "undefined" && typeof navigator.share === 'function') {
      setCanShare(true);
    }

    // Initialize Kakao SDK
    if (typeof window !== "undefined" && (window as any).Kakao) {
      if (!(window as any).Kakao.isInitialized()) {
        const kakaoKey = process.env.NEXT_PUBLIC_KAKAO_API_KEY; 
        if(kakaoKey) {
            (window as any).Kakao.init(kakaoKey);
        }
      }
    }
  }, []);

  const handleKakaoShare = () => {
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

  const handleNativeShare = async () => {
    const currentUrl = window.location.origin + `/invite?sender=${encodeURIComponent(sender)}&title=${encodeURIComponent(title)}`;
    if (typeof navigator !== "undefined" && (navigator as any).share) {
      try {
        await (navigator as any).share({
          title: `${sender}님의 데이트 신청`,
          text: `"${title}" - 거절할 수 없는 제안이 도착했습니다.`,
          url: currentUrl,
        });
      } catch (err) {
        console.error("Share failed:", err);
      }
    } else {
      // Desktop fallback or unsupported
      handleCopyLink();
    }
  };

  const handleCopyLink = async () => {
    const currentUrl = window.location.origin + `/invite?sender=${encodeURIComponent(sender)}&title=${encodeURIComponent(title)}`;
    
    try {
        await navigator.clipboard.writeText(currentUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    } catch (err) {
        alert("링크 복사에 실패했습니다.");
    }
  };

  return (
    <div className="flex flex-col gap-3 w-full">
        {/* Kakao Share - Primary */}
        <button
            onClick={handleKakaoShare}
            className="w-full flex items-center justify-center gap-2 px-5 py-4 bg-[#FEE500] text-[#191919] rounded-2xl font-bold hover:bg-[#FDD835] transition-colors shadow-sm"
            style={{ fontSize: '1.1rem' }}
        >
            <Share size={20} />
            <span>카카오톡으로 보내기</span>
        </button>

        <div className="flex gap-3 w-full">
             {/* Native Share (IG/Text) or Copy Link */}
             {canShare ? (
                <button
                    onClick={handleNativeShare}
                    className="flex-1 flex items-center justify-center gap-2 px-5 py-4 bg-[#f2f4f6] text-[#4e5968] rounded-2xl font-bold hover:bg-[#e5e8eb] transition-colors"
                >
                    <Instagram size={20} />
                    <span>인스타/문자</span>
                </button>
             ) : null}

            {/* Copy Link */}
            <button
                onClick={handleCopyLink}
                className={`flex items-center justify-center gap-2 px-5 py-4 bg-[#f2f4f6] text-[#4e5968] rounded-2xl font-bold hover:bg-[#e5e8eb] transition-colors ${!canShare ? 'w-full' : 'flex-1'}`}
            >
                {copied ? <Check size={20} className="text-[#3182f6]" /> : <Link size={20} />}
                <span>{copied ? "복사완료" : "링크복사"}</span>
            </button>
        </div>
    </div>
  );
}
