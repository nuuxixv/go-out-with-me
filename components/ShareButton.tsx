"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { Share, Link, Check, Smartphone, Instagram } from "lucide-react";
import { useEffect, useState } from "react";

interface ShareButtonProps {
  recipient: string;
  title: string;
}

export default function ShareButton({ recipient, title }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);
  const [canShare, setCanShare] = useState(false);

  useEffect(() => {
    // Check if Web Share API is supported
    if (typeof navigator !== "undefined" && typeof navigator.share === 'function') {
      setCanShare(true);
    }
  }, []);

  const handleKakaoShare = () => {
    if (typeof window === "undefined" || !(window as any).Kakao) {
      alert("카카오톡 SDK가 로드되지 않았습니다.");
      return;
    }

    const { Kakao } = window as any;
    const currentUrl = window.location.origin + `/invite?recipient=${encodeURIComponent(recipient)}&title=${encodeURIComponent(title)}`;
    const templateId = Number(process.env.NEXT_PUBLIC_KAKAO_TEMPLATE_ID);

    if (!templateId) {
      alert("카카오 템플릿 ID가 설정되지 않았습니다. (.env 확인)");
      return;
    }

    if (!Kakao.Share) {
      alert("카카오 SDK가 올바르게 로드되지 않았습니다. (Share 모듈 누락)");
      console.error("Kakao.Share is undefined", Kakao);
      return;
    }

    console.log("Kakao Share Debugging:");
    console.log("Template ID:", templateId);
    console.log("Recipient:", recipient);
    console.log("Title:", title);

    // Construct the path (relative URL)
    // Sending RAW params to avoid double-encoding if Kakao SDK or browser handles it automatically
    const path = `invite?recipient=${recipient}&title=${title}`;
    console.log("Path sent to template:", path);

    Kakao.Share.sendCustom({
      templateId: templateId,
      templateArgs: {
        recipient: recipient,
        title: title,
        url: path,
      },
    });

    // Fallback or other logic removed for now to focus on sendCustom debugging
    /*
    Kakao.Share.sendDefault({ ... });
    */
  };

  const handleNativeShare = async () => {
    const currentUrl = window.location.origin + `/invite?recipient=${encodeURIComponent(recipient)}&title=${encodeURIComponent(title)}`;
    if (typeof navigator !== "undefined" && (navigator as any).share) {
      try {
        await (navigator as any).share({
          title: `${recipient}님에게 온 데이트 신청`,
          text: `지금 확인해보세요.`,
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
    const currentUrl = window.location.origin + `/invite?recipient=${encodeURIComponent(recipient)}&title=${encodeURIComponent(title)}`;

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

      {/* Combined Native Share / Copy Link */}
      <button
        onClick={handleNativeShare}
        className="w-full flex items-center justify-center gap-2 px-5 py-4 bg-[#f2f4f6] text-[#4e5968] rounded-2xl font-bold hover:bg-[#e5e8eb] transition-colors"
      >
        {copied ? <Check size={20} className="text-[#3182f6]" /> : <Link size={20} />}
        <span>{copied ? "링크가 복사되었습니다" : "링크 공유하기"}</span>
      </button>
    </div>
  );
}
