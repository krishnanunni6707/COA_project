"use client"

import { motion } from "framer-motion"

type CpuBlockProps = {
    currentPage?: string
    isActive: boolean
}

export default function CpuBlock({ currentPage, isActive }: CpuBlockProps) {
    return (
        <div className="flex flex-col items-center gap-3 sm:gap-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                    opacity: 1,
                    scale: 1,
                }}
                className="relative"
            >
                {/* Glow Effect */}
                {isActive && (
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl blur-2xl opacity-60"
                        animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.6, 0.8, 0.6],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />
                )}

                {/* CPU Block */}
                <motion.div
                    className="relative w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 bg-gradient-to-br from-indigo-600 to-purple-700 rounded-xl sm:rounded-2xl shadow-2xl shadow-indigo-500/30 flex flex-col items-center justify-center border-2 border-indigo-400/30"
                    animate={isActive ? {
                        scale: [1, 1.05, 1],
                    } : {}}
                    transition={{
                        duration: 1.5,
                        repeat: isActive ? Infinity : 0,
                        ease: "easeInOut"
                    }}
                >
                    {/* CPU Icon */}
                    <svg className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 mb-1 sm:mb-2 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                    </svg>
                    <span className="font-bold text-white text-base sm:text-lg">CPU</span>

                    {/* Corner Decorations */}
                    <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-white/40" />
                    <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-white/40" />
                    <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-white/40" />
                    <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-white/40" />
                </motion.div>
            </motion.div>

            {/* Current Page Display */}
            {currentPage && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="px-4 py-2 bg-slate-800/80 backdrop-blur-sm border border-slate-600/50 rounded-lg"
                >
                    <p className="text-xs text-slate-400">Requesting</p>
                    <p className="text-lg font-bold text-indigo-300">Page {currentPage}</p>
                </motion.div>
            )}
        </div>
    )
}
