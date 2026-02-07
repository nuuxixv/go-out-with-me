"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Heart, X, RotateCcw, Pencil, CalendarHeart, Send } from "lucide-react";
import KakaoShareButton from "@/components/ShareButton";

export default function Home() {
  const [recipient, setRecipient] = useState("");
  const [title, setTitle] = useState("");
  const [isGenerated, setIsGenerated] = useState(false);

  const handleReset = () => {
    setRecipient("");
    setTitle("");
    setIsGenerated(false);
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Branding Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-64 h-64 bg-blush/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-sorbet/20 rounded-full blur-3xl"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md relative z-10 flex flex-col items-center"
      >
        {/* Header - Only visible when NOT generated */}
        {!isGenerated && (
          <motion.div
            className="card-glass w-full px-6 py-10 md:p-14 flex flex-col items-center"
            initial={{ y: 0 }}
            exit={{ y: -20, opacity: 0 }}
          >
            <motion.div
              className="text-center mb-10 w-full"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="w-24 h-24 mx-auto bg-gradient-to-br from-cream to-blush/20 rounded-full flex items-center justify-center mb-6 shadow-inner border border-white/50 relative group">
                <div className="absolute inset-0 rounded-full bg-white/40 blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                <CalendarHeart className="w-12 h-12 text-fuchsia relative z-10 drop-shadow-sm transform group-hover:scale-110 transition-transform duration-300" strokeWidth={1.5} />
              </div>
              <h1 className="text-2xl font-bold text-gray-800 tracking-tight">
                거절하기 힘든 <span className="text-fuchsia">데이트 신청하기</span>
              </h1>
            </motion.div>

            <div className="w-full text-2xl md:text-3xl leading-relaxed text-gray-800 font-bold text-center space-y-4 mb-12">
              <div className="flex flex-wrap items-baseline justify-center gap-1">
                <div className="relative group">
                  <input
                    type="text"
                    placeholder="이름"
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                    className="bg-transparent border-b-2 border-sorbet/50 text-sorbet focus:outline-none focus:border-sorbet transition-colors w-32 text-center placeholder:text-sorbet/50"
                  />
                  <div className="absolute bottom-0 left-0 w-full h-0.5 bg-sorbet scale-x-0 group-focus-within:scale-x-100 transition-transform origin-center"></div>
                </div>
                <span>님, 저랑</span>
              </div>

              <div className="flex flex-wrap items-baseline justify-center gap-2">
                <div className="relative group">
                  <input
                    type="text"
                    placeholder="주말에 데이트"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="bg-transparent border-b-2 border-fuchsia/30 text-fuchsia focus:outline-none focus:border-fuchsia transition-colors w-48 text-center placeholder:text-fuchsia/50"
                  />
                  <div className="absolute bottom-0 left-0 w-full h-0.5 bg-fuchsia scale-x-0 group-focus-within:scale-x-100 transition-transform origin-center"></div>
                </div>
                <span>해요!</span>
              </div>
            </div>

            <motion.div className="w-full mt-4">
              <button
                onClick={() => {
                  if (recipient && title) setIsGenerated(true);
                }}
                disabled={!recipient || !title}
                className="btn-gradient w-full text-lg py-4 shadow-blush/50 hover:shadow-blush/70"
                style={{ opacity: recipient && title ? 1 : 0.5 }}
              >
                신청하기
              </button>
            </motion.div>

            <div className="mt-8 text-center">
              <p className="text-xs text-gray-400 font-medium">made by nuuxixv</p>
            </div>
          </motion.div>
        )}

        {/* Simple Share Modal - Visible when generated */}
        {isGenerated && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full flex flex-col items-center card-glass p-8 md:p-12"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring" }}
              className="w-20 h-20 bg-gradient-to-br from-blush to-sorbet rounded-full flex items-center justify-center mb-6 shadow-inner"
            >
              <Send className="w-10 h-10 text-white pr-1" strokeWidth={2} />
            </motion.div>

            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              준비 완료!
            </h2>
            <p className="text-gray-500 mb-8 text-center text-lg">
              <span className="font-bold text-sorbet">{recipient}</span> 님에게<br />
              어떻게 전달할까요?
            </p>

            {/* Share Buttons */}
            <div className="w-full mb-8">
              <KakaoShareButton recipient={recipient} title={title} />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 text-sm text-gray-400">
              <button
                onClick={() => setIsGenerated(false)}
                className="hover:text-fuchsia transition-colors flex items-center gap-1"
              >
                <Pencil className="w-3 h-3" />
                수정하기
              </button>
            </div>

            <div className="mt-8 text-center">
              <p className="text-xs text-gray-400 font-medium">made by nuuxixv</p>
            </div>
          </motion.div>
        )}
      </motion.div>
    </main>
  );
}

