"use client"

import { motion, AnimatePresence } from "framer-motion"

type CacheVisualizerProps = {
    frames: string[]
    activeFrameIndex?: number
    isHit?: boolean
    evictedPage?: string
}

export default function CacheVisualizer({
    frames,
    activeFrameIndex,
    isHit,
    evictedPage
}: CacheVisualizerProps) {
    return (
        <div className="flex flex-col items-center gap-4 sm:gap-6">
            {/* Cache Label */}
            <div className="text-center">
                <h3 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                    Cache Memory
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                    {frames.length} Frame{frames.length !== 1 ? 's' : ''}
                </p>
            </div>

            {/* Cache Frames */}
            <div className="relative">
                {/* Memory Block Container */}
                <div className="space-y-2 sm:space-y-3">
                    {frames.map((frame, index) => {
                        const isActive = activeFrameIndex === index
                        const isEmpty = frame === "-" || frame === ""

                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="relative"
                            >
                                {/* Active Frame Glow */}
                                {isActive && (
                                    <motion.div
                                        className={`absolute inset-0 rounded-xl blur-xl ${isHit
                                            ? "bg-emerald-500"
                                            : "bg-rose-500"
                                            }`}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{
                                            opacity: [0.4, 0.8, 0.4],
                                            scale: [1, 1.1, 1]
                                        }}
                                        transition={{
                                            duration: 1.5,
                                            repeat: Infinity,
                                            ease: "easeInOut"
                                        }}
                                    />
                                )}

                                {/* Frame Container */}
                                <motion.div
                                    className={`relative w-40 h-16 rounded-xl border-2 flex items-center justify-center overflow-hidden transition-all ${isActive
                                        ? isHit
                                            ? "border-emerald-500 bg-emerald-50 shadow-lg shadow-emerald-500/30"
                                            : "border-rose-500 bg-rose-50 shadow-lg shadow-rose-500/30"
                                        : isEmpty
                                            ? "border-gray-200 bg-white"
                                            : "border-gray-300 bg-white"
                                        }`}
                                    animate={isActive ? {
                                        scale: [1, 1.05, 1],
                                    } : {}}
                                    transition={{
                                        duration: 0.5,
                                        ease: "easeOut"
                                    }}
                                >
                                    {/* Frame Number Badge */}
                                    <div className="absolute top-1 left-1 px-2 py-0.5 bg-gray-100 backdrop-blur-sm rounded text-xs text-slate-600 font-mono">
                                        F{index}
                                    </div>

                                    {/* Page Content */}
                                    <AnimatePresence mode="wait">
                                        <motion.div
                                            key={frame}
                                            initial={{ scale: 0.5, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            exit={{ scale: 0.5, opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                            className="flex flex-col items-center justify-center"
                                        >
                                            {isEmpty ? (
                                                <span className="text-2xl text-slate-300 font-mono">—</span>
                                            ) : (
                                                <>
                                                    <span className="text-xs text-slate-500">Page</span>
                                                    <span className="text-2xl font-bold text-slate-800 font-mono">
                                                        {frame}
                                                    </span>
                                                </>
                                            )}
                                        </motion.div>
                                    </AnimatePresence>

                                    {/* Hit/Miss Indicator */}
                                    {isActive && (
                                        <motion.div
                                            initial={{ opacity: 0, x: 10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            className={`absolute right-2 px-2 py-1 rounded-md text-xs font-bold ${isHit
                                                ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                                                : "bg-rose-500/20 text-rose-300 border border-rose-500/30"
                                                }`}
                                        >
                                            {isHit ? "✓" : "✗"}
                                        </motion.div>
                                    )}

                                    {/* Shimmer Effect on Update */}
                                    {isActive && !isEmpty && (
                                        <motion.div
                                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
                                            initial={{ x: "-100%" }}
                                            animate={{ x: "100%" }}
                                            transition={{ duration: 0.8, ease: "easeInOut" }}
                                        />
                                    )}
                                </motion.div>
                            </motion.div>
                        )
                    })}
                </div>

                {/* Evicted Page Notification */}
                <AnimatePresence>
                    {evictedPage && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            className="absolute -right-48 top-1/2 -translate-y-1/2 w-40 p-3 bg-rose-50 backdrop-blur-sm border border-rose-300 rounded-lg"
                        >
                            <p className="text-xs text-rose-700 font-semibold">Evicted</p>
                            <p className="text-lg font-bold text-rose-600">Page {evictedPage}</p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Memory Chip Decoration */}
            <div className="flex gap-1 mt-2">
                {[...Array(8)].map((_, i) => (
                    <div
                        key={i}
                        className="w-1 h-3 bg-gray-300 rounded-full"
                    />
                ))}
            </div>
        </div>
    )
}
