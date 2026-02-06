"use client";

import { useState } from "react";
import ShareButton from "@/components/ShareButton";

export default function Home() {
  const [sender, setSender] = useState("");
  const [title, setTitle] = useState("");
  const [isGenerated, setIsGenerated] = useState(false);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 text-center">
      <div className="glass p-8 rounded-3xl max-w-md w-full space-y-8 animate-in fade-in zoom-in duration-500">
        <h1 className="text-4xl font-jua text-white drop-shadow-md">
          🍪 쿠키 프로젝트
        </h1>
        <p className="text-lg font-medium text-white/90">
          거절할 수 없는 데이트 신청을 보내보세요!
        </p>

        {!isGenerated ? (
          <div className="space-y-4">
            <div className="text-left">
              <label className="block text-sm font-bold text-white mb-1 ml-1">내 이름 (혹은 별명)</label>
              <input
                type="text"
                placeholder="예: 김건우"
                value={sender}
                onChange={(e) => setSender(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/80 border-0 focus:ring-2 focus:ring-pink-500 outline-none transition-all placeholder:text-gray-400 font-bold text-gray-800"
              />
            </div>
            
            <div className="text-left">
              <label className="block text-sm font-bold text-white mb-1 ml-1">신청 내용</label>
              <input
                type="text"
                placeholder="예: 이번 주말에 방어회 뿌시기"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/80 border-0 focus:ring-2 focus:ring-pink-500 outline-none transition-all placeholder:text-gray-400 font-bold text-gray-800"
              />
            </div>

            <button
              onClick={() => {
                if(sender && title) setIsGenerated(true);
              }}
              disabled={!sender || !title}
              className="w-full py-4 bg-white text-pink-600 font-jua text-xl rounded-xl shadow-lg hover:scale-105 active:scale-95 transition-transform disabled:opacity-50 disabled:hover:scale-100"
            >
              플러팅 카드 만들기 💌
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="bg-white/40 p-6 rounded-2xl">
              <p className="text-2xl font-jua text-white mb-2">카드 완성!</p>
              <p className="text-white/90">이제 카톡으로 보내기만 하면 끝!</p>
            </div>
            
            <ShareButton sender={sender} title={title} />
            
            <button
              onClick={() => setIsGenerated(false)}
              className="block w-full py-2 text-white/80 underline text-sm hover:text-white"
            >
              다시 만들기
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
