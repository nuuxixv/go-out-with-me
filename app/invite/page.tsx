"use client";

import { useState, useRef, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Heart, X, Sparkles, Home } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { defaultTheme } from "@/config/theme";


function InviteContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const recipient = searchParams.get("recipient") || "익명";
    const request = searchParams.get("title") || "데이트";

    // Theme Icons
    const MainIcon = defaultTheme.icons.MainIcon;
    const AcceptIcon = defaultTheme.icons.AcceptIcon;
    const RejectIcon = defaultTheme.icons.RejectIcon;

    const [accepted, setAccepted] = useState(false);
    const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
    const [isMobile, setIsMobile] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const noButtonRef = useRef<HTMLButtonElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    // Placeholder ref to maintain height
    const placeholderRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        checkMobile();
        window.addEventListener("resize", checkMobile);

        // Initial load animation
        setTimeout(() => setIsLoaded(true), 100);

        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    const handleYes = () => {
        setAccepted(true);
        triggerConfetti();
    };

    const triggerConfetti = async () => {
        const confettiInstance = (await import("canvas-confetti")).default;
        const duration = 3000;
        const end = Date.now() + duration;

        const frame = () => {
            confettiInstance({
                particleCount: 3,
                angle: 60,
                spread: 55,
                origin: { x: 0 },
                colors: ['#ec4899', '#f43f5e', '#fb7185']
            });
            confettiInstance({
                particleCount: 3,
                angle: 120,
                spread: 55,
                origin: { x: 1 },
                colors: ['#ec4899', '#f43f5e', '#fb7185']
            });

            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        };
        frame();
    };

    const getRandomPosition = () => {
        if (!containerRef.current || !noButtonRef.current) return { x: 0, y: 0 };

        const container = containerRef.current.getBoundingClientRect();
        const button = noButtonRef.current.getBoundingClientRect();

        // Safety padding
        const padding = 20;
        const maxX = (container.width / 2) - (button.width / 2) - padding;
        const maxY = (container.height / 2) - (button.height / 2) - padding;

        // Calculate new position
        let x, y;
        // Simple random within bounds relative to center
        x = (Math.random() - 0.5) * 2 * maxX;
        y = (Math.random() - 0.5) * 2 * maxY;

        return { x, y };
    };

    const handleNoHover = () => {
        if (!isMobile) {
            setNoButtonPosition(getRandomPosition());
        }
    };

    const handleNoClick = (e: React.MouseEvent) => {
        e.preventDefault();
        // On mobile/click, it also runs away
        setNoButtonPosition(getRandomPosition());
    };

    const handleNoTouch = (e: React.TouchEvent) => {
        // Prevent default to stop clicking if possible, though button might click fast
        // On touch start, move it
        if (isMobile) {
            setNoButtonPosition(getRandomPosition());
        }
    };

    // Check if button is "away" (absolute positioned)
    const isButtonAway = noButtonPosition.x !== 0 || noButtonPosition.y !== 0;

    return (
        <div className="flex items-center justify-center min-h-[80vh] w-full p-4">
            <AnimatePresence mode="wait">
                {!accepted ? (
                    <motion.div
                        key="invitation"
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: isLoaded ? 1 : 0.9, opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
                        exit={{ scale: 0.9, opacity: 0, y: -20 }}
                        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        className="w-full max-w-md relative z-0"
                    >
                        <div
                            ref={containerRef}
                            className="card-glass p-8 md:p-12 relative overflow-visible flex flex-col items-center text-center transition-all duration-300"
                            style={{ minHeight: '500px' }}
                        >
                            {/* Brand Icon */}
                            <motion.div
                                initial={{ rotate: -180, opacity: 0 }}
                                animate={{ rotate: 0, opacity: 1 }}
                                transition={{ delay: 0.3, duration: 0.6 }}
                                className="absolute -top-8 bg-gradient-to-br from-pink-500 to-rose-500 rounded-2xl p-4 shadow-lg"
                            >
                                <MainIcon className="w-8 h-8 text-white" strokeWidth={2} />
                            </motion.div>

                            {/* Main Content */}
                            <div className="mt-8 mb-8 w-full">
                                <motion.h1
                                    initial={{ y: -20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.4, duration: 0.6 }}
                                    className="text-2xl md:text-3xl mb-6 leading-relaxed font-bold text-gray-800"
                                >
                                    <span className={defaultTheme.colors.accent.primary}>{recipient}</span>님, 저랑
                                    <br />
                                    <span className={defaultTheme.colors.accent.secondary}>{request}</span> 해요!
                                </motion.h1>

                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
                                    className="w-12 h-1 bg-gradient-to-r from-pink-500 to-rose-500 mx-auto rounded-full mb-6"
                                ></motion.div>

                                <motion.p
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.7 }}
                                    className="text-gray-600 text-lg"
                                >
                                    수락하시겠어요?
                                </motion.p>
                            </div>

                            {/* Button Group - Centered and Spaced */}
                            <div className="flex flex-col gap-4 items-center w-full relative grow justify-center">
                                {/* Yes Button */}
                                <motion.button
                                    initial={{ x: -50, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: 0.8 }}
                                    whileHover={{ scale: 1.02, y: -2 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={handleYes}
                                    className={`btn-gradient w-full max-w-xs gap-3 group z-10 ${defaultTheme.colors.button.shadow}`}
                                >
                                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                                    <AcceptIcon className="w-5 h-5 relative z-10" fill="currentColor" />
                                    <span className="relative z-10">좋아요</span>
                                </motion.button>

                                {/* No Button - Runaway Logic */}
                                <div className="w-full flex justify-center relative">
                                    {/* Placeholder to prevent layout shift */}
                                    {isButtonAway && (
                                        <div className="px-10 py-4 w-full max-w-xs h-[60px] opacity-0 pointer-events-none" aria-hidden="true" />
                                    )}

                                    <motion.button
                                        ref={noButtonRef}
                                        initial={{ x: 50, opacity: 0 }}
                                        animate={{
                                            x: noButtonPosition.x,
                                            y: noButtonPosition.y,
                                            opacity: 1
                                        }}
                                        transition={{
                                            type: "spring",
                                            stiffness: 400,
                                            damping: 25,
                                            opacity: { delay: 0.8, duration: 0.3 }
                                        }}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onMouseEnter={handleNoHover}
                                        onClick={handleNoClick}
                                        onTouchStart={handleNoTouch}
                                        className="bg-gray-100/80 backdrop-blur text-gray-500 px-10 py-4 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 flex items-center gap-3 text-lg w-full max-w-xs justify-center cursor-pointer z-20"
                                        style={{
                                            position: !isButtonAway ? 'relative' : 'absolute',
                                        }}
                                    >
                                        <RejectIcon className="w-5 h-5" />
                                        <span>싫어요</span>
                                    </motion.button>
                                </div>
                            </div>

                            {/* Footer */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1.2 }}
                                className="text-center mt-8 pt-6 border-t border-gray-100/50 w-full"
                            >
                                <p className="text-xs text-gray-400">made by nuuxixv</p>
                            </motion.div>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="accepted"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{
                            type: "spring",
                            stiffness: 200,
                            damping: 20
                        }}
                        className="card-glass p-8 md:p-12 text-center max-w-md w-full relative overflow-hidden"
                    >
                        <motion.div
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{
                                delay: 0.2,
                                type: "spring",
                                stiffness: 200
                            }}
                            className="bg-gradient-to-br from-pink-500 to-rose-500 rounded-full p-6 w-24 h-24 mx-auto mb-6 flex items-center justify-center shadow-lg shadow-pink-200"
                        >
                            <AcceptIcon className="w-12 h-12 text-white" fill="currentColor" strokeWidth={0} />
                        </motion.div>

                        <motion.h2
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="text-3xl md:text-4xl mb-6 font-bold text-gray-800"
                        >
                            데이트를 수락했어요!
                        </motion.h2>

                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="text-xl text-gray-600 mb-8 space-y-1"
                        >
                            <p>즐거운 시간 보내세요</p>
                        </motion.div>

                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.8 }}
                            className="mt-8"
                        >
                            <button
                                onClick={() => router.push('/')}
                                className="btn-ghost-glass w-full flex items-center justify-center gap-2"
                            >
                                <Home className="w-4 h-4" />
                                나도 데이트 신청하기
                            </button>
                        </motion.div>

                        {/* Falling Particles */}
                        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
                            {[...Array(8)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    initial={{
                                        y: -50,
                                        x: Math.random() * 400,
                                        opacity: 0.8,
                                        scale: 0
                                    }}
                                    animate={{
                                        y: 600,
                                        opacity: 0,
                                        scale: 1
                                    }}
                                    transition={{
                                        duration: 2.5 + Math.random() * 1.5,
                                        delay: Math.random() * 0.5,
                                        repeat: Infinity,
                                        repeatDelay: Math.random() * 2
                                    }}
                                    className="absolute"
                                    style={{ left: `${Math.random() * 100}%` }}
                                >
                                    <div className="w-2 h-2 rounded-full bg-gradient-to-br from-pink-400 to-rose-400"></div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default function InvitePage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
            <InviteContent />
        </Suspense>
    );
}
