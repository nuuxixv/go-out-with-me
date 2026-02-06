"use client";

import { useSearchParams } from "next/navigation";
import { useState, Suspense } from "react";
import RunawayButton from "@/components/RunawayButton";
import Confetti from "@/components/Confetti";
import { Check } from "lucide-react";

function InviteContent() {
  const searchParams = useSearchParams();
  const sender = searchParams.get("sender") || "익명";
  const title = searchParams.get("title") || "데이트 신청";
  
  const [isAccepted, setIsAccepted] = useState(false);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 text-center overflow-hidden relative">
      <div className="glass p-8 rounded-3xl max-w-lg w-full space-y-8 animate-in slide-in-from-bottom-10 duration-700 relative z-10">
        
        {/* Header Section */}
        <div className="space-y-2">
          <span className="inline-block px-3 py-1 bg-white/50 rounded-full text-sm font-bold text-pink-600 mb-2">
            💌 도착한 메시지
          </span>
          <h1 className="text-3xl font-jua text-white leading-relaxed break-keep drop-shadow-sm">
            <span className="text-yellow-300 text-4xl block mb-2">{sender}</span>
            님이
            <br />
            <span className="inline-block bg-white/20 px-2 rounded-md mx-1">
              "{title}"
            </span>
            을(를)
            <br />
            신청했어요!
          </h1>
        </div>

        {/* Illustration Placeholder */}
        <div className="text-8xl animate-bounce-slow py-4">
          🍪
        </div>

        {/* Action Buttons */}
        {!isAccepted ? (
          <div className="flex flex-col gap-4 items-center w-full pt-4 relative min-h-[150px]">
            <button
              onClick={() => setIsAccepted(true)}
              className="w-full py-4 bg-white text-pink-600 font-jua text-2xl rounded-xl shadow-lg hover:scale-105 active:scale-95 transition-transform flex items-center justify-center gap-2 z-20"
            >
              <Check size={28} />
              좋아! (수락)
            </button>
            
            {/* Runaway Button Container - Needs to be relative/absolute so button can move freely if needed, 
                but our RunawayButton handles fixed positioning on move. */}
            <div className="w-full h-16 relative flex justify-center">
               <RunawayButton label="싫어.. (거절)" />
            </div>
            
            <p className="text-white/60 text-xs mt-4">
              * 거절 버튼은 마음대로 누를 수 없습니다.
            </p>
          </div>
        ) : (
          <div className="space-y-6 animate-in zoom-in duration-300">
            <div className="bg-white/90 p-8 rounded-2xl shadow-xl">
              <h2 className="text-3xl font-jua text-pink-600 mb-4">
                🎉 약속 성사! 🎉
              </h2>
              <p className="text-gray-700 font-bold text-lg mb-6">
                {sender}님에게 이 화면을 캡쳐해서
                <br />
                보내주세요!
              </p>
              <div className="text-6xl animate-pulse mb-6">
                👩‍❤️‍👨
              </div>
              
              {/* Share Acceptance Button */}
              <div className="mt-4">
                <button
                  onClick={() => {
                    if (typeof window === "undefined" || !(window as any).Kakao) return;
                    const { Kakao } = window as any;
                    const currentUrl = window.location.href;
                    
                    Kakao.Share.sendDefault({
                      objectType: 'feed',
                      content: {
                        title: `🎉 ${sender}님의 데이트 신청 수락!`,
                        description: `좋아! 우리 데이트하는거다? 🍪`,
                        imageUrl: 'https://cdn.pixabay.com/photo/2016/03/31/19/26/couple-1294833_1280.png',
                        link: { mobileWebUrl: currentUrl, webUrl: currentUrl },
                      },
                      buttons: [{ title: '약속 보러가기', link: { mobileWebUrl: currentUrl, webUrl: currentUrl } }],
                    });
                  }}
                  className="w-full py-3 bg-[#FEE500] text-[#3B1E1E] rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-[#FDD835] transition-colors"
                >
                  <span className="text-xl">💬</span> 수락한 것 자랑하기
                </button>
              </div>
            </div>
            <Confetti />
          </div>
        )}
      </div>
      
      {/* Background Elements if any */}
    </main>
  );
}

export default function InvitePage() {
  return (
    <Suspense fallback={<div className="text-white font-jua text-xl">로딩중... 🍪</div>}>
      <InviteContent />
    </Suspense>
  );
}
