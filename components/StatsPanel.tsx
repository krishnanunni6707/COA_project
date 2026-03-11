"use client"

import { motion } from "framer-motion"

type StatsPanelProps = {
    hits: number
    misses: number
    currentStep: number
    totalSteps: number
}

export default function StatsPanel({
    hits,
    misses,
    currentStep,
    totalSteps
}: StatsPanelProps) {
    const total = hits + misses
    const hitRate = total > 0 ? (hits / total) * 100 : 0
    const missRate = total > 0 ? (misses / total) * 100 : 0
    const progress = totalSteps > 0 ? (currentStep / totalSteps) * 100 : 0

    return (
        <div className="space-y-6">
            {/* Progress Bar */}
            {totalSteps > 0 && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl border border-gray-200 shadow-xl"
                >
                    <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-medium text-slate-700">
                            Simulation Progress
                        </span>
                        <span className="text-sm font-bold text-indigo-600">
                            {currentStep} / {totalSteps}
                        </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="relative h-3 bg-gray-200 rounded-full overflow-hidden">
                        <motion.div
                            className="absolute inset-y-0 left-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full shadow-lg shadow-indigo-500/50"
                            initial={{ width: "0%" }}
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                        />
                        {/* Shimmer Effect */}
                        <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                            animate={{
                                x: ["-100%", "100%"]
                            }}
                            transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                ease: "linear"
                            }}
                        />
                    </div>

                    <div className="flex justify-between text-xs text-slate-500 mt-2">
                        <span>Start</span>
                        <span>Complete</span>
                    </div>
                </motion.div>
            )}

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {/* Hits Card */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 }}
                    className="relative group bg-gradient-to-br from-emerald-50 to-emerald-100/50 backdrop-blur-sm p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl border border-emerald-200 shadow-xl overflow-hidden"
                >
                    {/* Background Glow */}
                    <div className="absolute inset-0 bg-emerald-100/30 group-hover:bg-emerald-100/50 transition-all" />

                    <div className="relative">
                        <div className="flex items-center gap-2 sm:gap-3 mb-2">
                            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <span className="text-xs sm:text-sm font-medium text-emerald-700">Cache Hits</span>
                        </div>
                        <p className="text-3xl sm:text-4xl font-bold text-emerald-600 mb-1">{hits}</p>
                        <div className="flex items-center gap-2">
                            <div className="flex-1 h-2 bg-white rounded-full overflow-hidden">
                                <motion.div
                                    className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full"
                                    initial={{ width: "0%" }}
                                    animate={{ width: `${hitRate}%` }}
                                    transition={{ duration: 0.8, ease: "easeOut" }}
                                />
                            </div>
                            <span className="text-sm font-semibold text-emerald-600 min-w-[3rem] text-right">
                                {hitRate.toFixed(1)}%
                            </span>
                        </div>
                    </div>
                </motion.div>

                {/* Misses Card */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="relative group bg-gradient-to-br from-rose-50 to-rose-100/50 backdrop-blur-sm p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl border border-rose-200 shadow-xl overflow-hidden"
                >
                    {/* Background Glow */}
                    <div className="absolute inset-0 bg-rose-100/30 group-hover:bg-rose-100/50 transition-all" />

                    <div className="relative">
                        <div className="flex items-center gap-2 sm:gap-3 mb-2">
                            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-rose-100 rounded-lg flex items-center justify-center">
                                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </div>
                            <span className="text-xs sm:text-sm font-medium text-rose-700">Cache Misses</span>
                        </div>
                        <p className="text-3xl sm:text-4xl font-bold text-rose-600 mb-1">{misses}</p>
                        <div className="flex items-center gap-2">
                            <div className="flex-1 h-2 bg-white rounded-full overflow-hidden">
                                <motion.div
                                    className="h-full bg-gradient-to-r from-rose-500 to-rose-400 rounded-full"
                                    initial={{ width: "0%" }}
                                    animate={{ width: `${missRate}%` }}
                                    transition={{ duration: 0.8, ease: "easeOut" }}
                                />
                            </div>
                            <span className="text-sm font-semibold text-rose-600 min-w-[3rem] text-right">
                                {missRate.toFixed(1)}%
                            </span>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Hit Rate Summary */}
            {total > 0 && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-gradient-to-r from-indigo-50 to-purple-50 backdrop-blur-sm p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl border border-indigo-200 shadow-xl"
                >
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0 mb-3">
                        <div className="flex items-center gap-2 sm:gap-3">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/30">
                                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-xs sm:text-sm text-slate-600">Overall Hit Rate</p>
                                <p className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                                    {hitRate.toFixed(2)}%
                                </p>
                            </div>
                        </div>

                        <div className="text-left sm:text-right">
                            <p className="text-xs sm:text-sm text-slate-600">Total Requests</p>
                            <p className="text-xl sm:text-2xl font-bold text-slate-800">{total}</p>
                        </div>
                    </div>

                    {/* Performance Indicator */}
                    <div className="mt-4 pt-4 border-t border-gray-200">
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-slate-600">Performance:</span>
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${hitRate >= 75
                                ? "bg-emerald-100 text-emerald-700 border border-emerald-200"
                                : hitRate >= 50
                                    ? "bg-yellow-100 text-yellow-700 border border-yellow-200"
                                    : "bg-rose-100 text-rose-700 border border-rose-200"
                                }`}>
                                {hitRate >= 75 ? "⭐ Excellent" : hitRate >= 50 ? "⚡ Good" : "⚠ Needs Improvement"}
                            </span>
                        </div>
                    </div>
                </motion.div>
            )}
        </div>
    )
}
