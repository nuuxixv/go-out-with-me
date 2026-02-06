"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import ShareButton from "@/components/ShareButton";

export default function Home() {
  const [sender, setSender] = useState("");
  const [title, setTitle] = useState("");
  const [isGenerated, setIsGenerated] = useState(false);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden">
      
      {/* Dynamic Background Elements */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-[#CCFF00] rounded-full blur-[80px] opacity-40 animate-pulse" />
      <div className="absolute bottom-10 right-10 w-48 h-48 bg-[#FF00BF] rounded-full blur-[100px] opacity-30" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="glass-panel p-8 md:p-12 rounded-[2rem] max-w-xl w-full relative z-10 overflow-hidden"
      >
        {/* Header */}
        {!isGenerated ? (
          <>
            <motion.h1 
              initial={{ x: -20 }}
              animate={{ x: 0 }}
              className="font-jua text-massive mb-2 text-white drop-shadow-lg"
            >
              야,
              <br />
              <span className="text-[#CCFF00]">나랑</span>
              <br />
              놀래?
            </motion.h1>
            
            <p className="text-white/60 text-lg mb-10 font-medium tracking-wide">
              거절은 거절한다. 20분 컷 데이트 신청.
            </p>

            <div className="space-y-8">
              <div className="group">
                <label className="block text-xs font-bold text-white/50 mb-2 uppercase tracking-widest">From</label>
                <input
                  type="text"
                  placeholder="니 이름"
                  value={sender}
                  onChange={(e) => setSender(e.target.value)}
                  className="input-modern"
                />
              </div>

              <div className="group">
                <label className="block text-xs font-bold text-white/50 mb-2 uppercase tracking-widest">Do What?</label>
                <input
                  type="text"
                  placeholder="ex) 이번 주말에 방어회 털기"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="input-modern"
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  if(sender && title) setIsGenerated(true);
                }}
                disabled={!sender || !title}
                className="w-full py-5 bg-[#CCFF00] text-black font-black text-2xl rounded-2xl shadow-[0_0_20px_rgba(204,255,0,0.4)] hover:shadow-[0_0_40px_rgba(204,255,0,0.6)] transition-all disabled:opacity-30 disabled:shadow-none mt-8"
              >
                TICKET GET 🎟️
              </motion.button>
            </div>
          </>
        ) : (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center text-center space-y-8"
          >
            <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center text-5xl mb-4 border border-white/20">
              🍪
            </div>
            
            <h2 className="text-4xl font-jua text-white leading-tight">
              준비 완료!
              <br />
              <span className="text-sm font-sans font-normal text-white/60 mt-2 block">
                이제 친구한테 던지기만 하면 됨.
              </span>
            </h2>

            <div className="w-full bg-[#1a1a1a] p-6 rounded-xl border border-white/10 my-4">
              <p className="text-[#CCFF00] font-mono text-sm mb-2 opacity-70">PREVIEW</p>
              <p className="text-white text-lg font-bold">"{title}"</p>
            </div>
            
            <div className="w-full space-y-3">
              <ShareButton sender={sender} title={title} />
              
              <button
                onClick={() => setIsGenerated(false)}
                className="w-full py-3 text-white/40 font-bold hover:text-white transition-colors"
              >
                ← BACK
              </button>
            </div>
          </motion.div>
        )}
      </motion.div>
    </main>
  );
}
