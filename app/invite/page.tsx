"use client";

import { useSearchParams } from "next/navigation";
import { useState, Suspense } from "react";
import RunawayButton from "@/components/RunawayButton";
import Confetti from "@/components/Confetti";
import { motion } from "framer-motion";

function InviteContent() {
  const searchParams = useSearchParams();
  const sender = searchParams.get("sender") || "익명";
  const title = searchParams.get("title") || "데이트 신청";
  
  const [isAccepted, setIsAccepted] = useState(false);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 bg-[#f2f4f6]">
            <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="card-clean w-full max-w-lg p-10 md:p-14 relative overflow-hidden"
            style={{ minHeight: '400px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
        >
            {!isAccepted ? (
                <>
                   <div className="flex justify-center mb-6">
                        <span className="bg-[#e8f3ff] text-[#3182f6] px-3 py-1 rounded-full text-sm font-bold">
                            New Request
                        </span>
                   </div>

                    <h1 className="text-3xl md:text-4xl font-bold text-[#191f28] mb-8 leading-tight text-center">
                        <span className="text-[#3182f6]">{sender}</span>님이<br/>
                        데이트를 신청했어요
                    </h1>

                    <div className="bg-[#f2f4f6] p-6 rounded-2xl mb-10 text-center">
                        <p className="text-[#4e5968] text-sm font-bold mb-2">신청 내용</p>
                        <p className="text-xl font-bold text-[#191f28] break-keep">
                            {title}
                        </p>
                    </div>

                    <div className="flex flex-col gap-3 w-full relative" style={{ minHeight: '140px' }}>
                        <button
                            onClick={() => setIsAccepted(true)}
                            className="btn-primary"
                        >
                            좋아!
                        </button>
                        
                        {/* Runaway Button Container */}
                        <div className="relative h-14 w-full flex justify-center">
                            <RunawayButton label="싫어" />
                        </div>
                    </div>
                </>
            ) : (
                <div className="flex flex-col items-center text-center py-6">
                    <motion.div 
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: "spring", stiffness: 200, damping: 15 }}
                        className="text-7xl mb-6"
                    >
                        🎉
                    </motion.div>
                    
                    <h2 className="text-3xl font-bold text-[#191f28] mb-4">
                        약속 성사!
                    </h2>
                    
                    <p className="text-[#4e5968] mb-8 text-lg">
                        두 분의 데이트를 응원할게요.<br/>
                        <span className="text-sm text-[#8b95a1] mt-2 block">화면을 캡쳐해서 공유해보세요</span>
                    </p>

                    <div className="w-full">
                        <button
                            onClick={() => {
                                if (typeof window === "undefined" || !(window as any).Kakao) return;
                                const { Kakao } = window as any;
                                const currentUrl = window.location.href;
                                
                                Kakao.Share.sendDefault({
                                    objectType: 'feed',
                                    content: {
                                    title: `🎉 ${sender}님의 신청 수락!`,
                                    description: `데이트 성사 완료. 준비하시죠!`,
                                    imageUrl: 'https://cdn.pixabay.com/photo/2016/11/29/09/32/concept-1868728_1280.jpg',
                                    link: { mobileWebUrl: currentUrl, webUrl: currentUrl },
                                    },
                                    buttons: [{ title: '확인하기', link: { mobileWebUrl: currentUrl, webUrl: currentUrl } }],
                                });
                            }}
                            className="w-full py-4 bg-[#FEE500] text-[#191919] rounded-2xl font-bold hover:bg-[#FDD835] transition-colors"
                        >
                            카카오톡으로 자랑하기
                        </button>
                    </div>
                </div>
            )}
             <Confetti />
        </motion.div>
    </main>
  );
}

export default function InvitePage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center h-screen bg-[#f2f4f6] text-[#8b95a1]">로딩중...</div>}>
      <InviteContent />
    </Suspense>
  );
}
