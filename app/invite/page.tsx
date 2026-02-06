"use client";

import { useSearchParams } from "next/navigation";
import { useState, Suspense } from "react";
import RunawayButton from "@/components/RunawayButton";
import Confetti from "@/components/Confetti";
import { motion } from "framer-motion";

function InviteContent() {
  const searchParams = useSearchParams();
  const sender = searchParams.get("sender") || "Unknown";
  const title = searchParams.get("title") || "Something exciting";
  
  const [isAccepted, setIsAccepted] = useState(false);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden">
        {/* Background Ambient */}
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#4C1D95] rounded-full blur-[120px] opacity-40" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#CCFF00] rounded-full blur-[120px] opacity-20" />

        <motion.div 
            initial={{ rotateX: 90, opacity: 0 }}
            animate={{ rotateX: 0, opacity: 1 }}
            transition={{ type: "spring", damping: 20, stiffness: 100 }}
            className="glass-panel w-full max-w-lg rounded-[2.5rem] p-8 md:p-12 relative z-10 text-center border-t border-white/40 shadow-2xl"
            style={{ transformStyle: "preserve-3d" }}
        >
            {!isAccepted ? (
                <>
                    <div className="inline-block px-4 py-1 rounded-full border border-[#CCFF00] text-[#CCFF00] text-xs font-bold tracking-widest uppercase mb-6">
                        Incoming Request
                    </div>

                    <h1 className="text-massive font-jua text-white mb-8 leading-[1.1] text-start">
                        <span className="text-4xl md:text-5xl opacity-80 block mb-2">{sender}</span>
                        <span className="block text-[#CCFF00]">같이</span>
                        <span className="block">하자!</span>
                    </h1>

                    <div className="bg-black/30 p-6 rounded-2xl mb-10 text-left border-l-4 border-[#CCFF00]">
                        <p className="text-white/60 text-sm font-bold uppercase mb-1">Mission</p>
                        <p className="text-2xl font-bold text-white break-keep leading-snug">
                            "{title}"
                        </p>
                    </div>

                    <div className="flex flex-col gap-4 relative min-h-[160px]">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setIsAccepted(true)}
                            className="w-full py-5 bg-[#FF00BF] text-white font-jua text-2xl rounded-2xl shadow-[0_10px_30px_rgba(255,0,191,0.4)] hover:bg-[#ff33cc] transition-all z-20 flex items-center justify-center gap-2"
                        >
                            <span>콜! (수락)</span>
                            <span className="text-xl">🔥</span>
                        </motion.button>
                        
                        <div className="relative h-16 w-full flex justify-center">
                            <RunawayButton label="싫어 (거절)" />
                        </div>
                    </div>
                </>
            ) : (
                <motion.div 
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="py-10"
                >
                    <motion.div 
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
                        className="text-8xl mb-6"
                    >
                        😎
                    </motion.div>
                    
                    <h2 className="text-4xl font-jua text-white mb-4">
                        <span className="text-[#CCFF00]">약속</span> 잡혔다!
                    </h2>
                    
                    <p className="text-white/70 mb-8 leading-relaxed">
                        이제 도망 못 감.<br/>
                        <b>{sender}</b>님한테 빨리 자랑해!
                    </p>

                    <div className="bg-[#FEE500] text-black font-bold p-1 rounded-xl">
                        <button
                            onClick={() => {
                                if (typeof window === "undefined" || !(window as any).Kakao) return;
                                const { Kakao } = window as any;
                                const currentUrl = window.location.href;
                                
                                Kakao.Share.sendDefault({
                                    objectType: 'feed',
                                    content: {
                                    title: `😎 ${sender}님의 신청 수락 완료!`,
                                    description: `준비 단단히 해라.`,
                                    imageUrl: 'https://cdn.pixabay.com/photo/2016/11/29/09/32/concept-1868728_1280.jpg',
                                    link: { mobileWebUrl: currentUrl, webUrl: currentUrl },
                                    },
                                    buttons: [{ title: '뭐라고 했더라?', link: { mobileWebUrl: currentUrl, webUrl: currentUrl } }],
                                });
                            }}
                            className="w-full py-4 text-center text-lg flex items-center justify-center gap-2 hover:bg-white/50 rounded-lg transition-colors"
                        >
                            <span>카톡으로 자랑하기</span>
                        </button>
                    </div>
                    
                    <Confetti />
                </motion.div>
            )}
        </motion.div>
    </main>
  );
}

export default function InvitePage() {
  return (
    <Suspense fallback={<div className="text-white flex items-center justify-center h-screen bg-black">LOADING...</div>}>
      <InviteContent />
    </Suspense>
  );
}
