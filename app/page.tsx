"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Heart, X, RotateCcw, Pencil } from "lucide-react";
import KakaoShareButton from "@/components/ShareButton";
import { defaultTheme } from "@/config/theme";

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
    <main className={`min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden ${defaultTheme.colors.background}`}>
      {/* Background Branding Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-64 h-64 bg-pink-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-rose-200/20 rounded-full blur-3xl"></div>
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
              <div className="inline-block p-4 bg-rose-100 rounded-full mb-4 shadow-sm">
                <span className="text-4xl">💌</span>
              </div>
              <h1 className="text-2xl font-bold text-gray-800 tracking-tight">
                거절하기 힘든 <span className={defaultTheme.colors.accent.primary}>데이트 신청하기</span>
              </h1>
            </motion.div>

            <div className="w-full text-2xl md:text-3xl leading-relaxed text-gray-800 font-bold text-center space-y-4 mb-12">
              <div className="flex flex-wrap items-baseline justify-center gap-1">
                <div className="relative group">
                  <input
                    type="text"
                    placeholder="보검"
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                    className={`bg-transparent border-b-2 transition-colors w-32 text-center focus:outline-none ${defaultTheme.colors.input.primary.border} ${defaultTheme.colors.input.primary.text} ${defaultTheme.colors.input.primary.focus} ${defaultTheme.colors.input.primary.placeholder}`}
                  />
                  <div className={`absolute bottom-0 left-0 w-full h-0.5 scale-x-0 group-focus-within:scale-x-100 transition-transform origin-center ${defaultTheme.colors.input.primary.underline}`}></div>
                </div>
                <span>님, 저랑</span>
              </div>

              <div className="flex flex-wrap items-baseline justify-center gap-2">

                <div className="relative group">
                  <input
                    type="text"
                    placeholder="맛집 탐방"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className={`bg-transparent border-b-2 transition-colors w-48 text-center focus:outline-none ${defaultTheme.colors.input.secondary.border} ${defaultTheme.colors.input.secondary.text} ${defaultTheme.colors.input.secondary.focus} ${defaultTheme.colors.input.secondary.placeholder}`}
                  />
                  <span>해요!</span>
                  <div className={`absolute bottom-0 left-0 w-full h-0.5 scale-x-0 group-focus-within:scale-x-100 transition-transform origin-center ${defaultTheme.colors.input.secondary.underline}`}></div>
                </div>
              </div>
            </div>

            <motion.div className="w-full mt-4">
              <button
                onClick={() => {
                  if (recipient && title) setIsGenerated(true);
                }}
                disabled={!recipient || !title}
                className={`btn-gradient w-full text-lg py-4 ${defaultTheme.colors.button.shadow}`}
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
              className="w-20 h-20 bg-gradient-to-br from-pink-100 to-rose-100 rounded-full flex items-center justify-center text-4xl mb-6 shadow-inner"
            >
              🎉
            </motion.div>

            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              준비 완료!
            </h2>
            <p className="text-gray-500 mb-8 text-center">
              가장 편한 방법으로<br />
              그 분에게 마음을 전해보세요.
            </p>

            {/* Share Buttons */}
            <div className="w-full mb-8">
              <KakaoShareButton recipient={recipient} title={title} />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 text-sm text-gray-400">
              <button
                onClick={() => setIsGenerated(false)}
                className={`transition-colors flex items-center gap-1 hover:${defaultTheme.colors.accent.primary}`}
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

