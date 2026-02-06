"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function Home() {
  const [sender, setSender] = useState("");
  const [title, setTitle] = useState("");
  const [isGenerated, setIsGenerated] = useState(false);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 bg-[#f2f4f6]">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="card-clean w-full max-w-md p-8 md:p-10"
      >
        {/* Header */}
        {!isGenerated ? (
          <>
            <motion.h1 
              className="text-3xl font-bold mb-3 text-[#191f28] leading-snug"
            >
              거절할 수 없는<br/>
              데이트 신청 🍪
            </motion.h1>
            
            <p className="text-[#8b95a1] text-lg mb-10">
              상대방은 '좋아' 버튼만 누를 수 있어요.
            </p>

            <div className="space-y-8">
              <div className="group">
                <label className="block text-sm font-semibold text-[#4e5968] mb-1">보내는 사람</label>
                <input
                  type="text"
                  placeholder="본인의 이름이나 별명"
                  value={sender}
                  onChange={(e) => setSender(e.target.value)}
                  className="input-clean"
                />
              </div>

              <div className="group">
                <label className="block text-sm font-semibold text-[#4e5968] mb-1">제안 내용</label>
                <input
                  type="text"
                  placeholder="예) 이번 주말에 맛있는거 먹자"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="input-clean"
                />
              </div>
            </div>

            <motion.div className="mt-12">
                <button
                    onClick={() => {
                      if(sender && title) setIsGenerated(true);
                    }}
                    disabled={!sender || !title}
                    className="btn-primary"
                    style={{ opacity: sender && title ? 1 : 0.3 }}
                >
                    신청서 만들기
                </button>
            </motion.div>
          </>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center text-center py-4"
          >
            <div className="w-20 h-20 bg-[#f2f4f6] rounded-3xl flex items-center justify-center text-4xl mb-6 shadow-sm">
              🍪
            </div>
            
            <h2 className="text-2xl font-bold text-[#191f28] mb-2">
              준비 완료!
            </h2>
            <p className="text-[#8b95a1] mb-8">
              아래 버튼을 눌러 친구에게 보내보세요.
            </p>

             {/* Share Button Integration */}
             <div className="w-full mb-3">
                 <KakaoShareButton sender={sender} title={title} />
             </div>
             
             <button
                onClick={() => setIsGenerated(false)}
                className="btn-secondary"
            >
                수정하기
            </button>
          </motion.div>
        )}
      </motion.div>
    </main>
  );
}

// Inline component for simplicity in this context, or import it.
// We'll import existing ShareButton but style needs update.
// Let's create a wrapper or update ShareButton.tsx.
// For now, I'll update ShareButton.tsx separately to match Design 3.0.
import KakaoShareButton from "@/components/ShareButton";
