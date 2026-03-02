"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"

type ControlPanelProps = {
    reference: string
    setReference: (value: string) => void
    frameCount: number
    setFrameCount: (value: number) => void
    policy: string
    setPolicy: (value: string) => void
    onRun: () => void
    onReset: () => void
    onNextStep: () => void
    isRunning: boolean
    stepByStep: boolean
    setStepByStep: (value: boolean) => void
    currentStep: number
    totalSteps: number
}

const policyInfo = {
    FIFO: {
        name: "First-In-First-Out",
        description: "The oldest page in the cache is replaced first. Uses a queue structure.",
        example: "Like a line at a store - first person in is first person out.",
        icon: "📥"
    },
    LRU: {
        name: "Least Recently Used",
        description: "Replaces the page that hasn't been used for the longest time.",
        example: "Like organizing books - least used ones get replaced first.",
        icon: "⏰"
    },
    RANDOM: {
        name: "Random Replacement",
        description: "Randomly selects a page to replace when cache is full.",
        example: "Like picking a random card from a deck.",
        icon: "🎲"
    }
}

export default function ControlPanel({
    reference,
    setReference,
    frameCount,
    setFrameCount,
    policy,
    setPolicy,
    onRun,
    onReset,
    onNextStep,
    isRunning,
    stepByStep,
    setStepByStep,
    currentStep,
    totalSteps
}: ControlPanelProps) {
    const [showPolicyInfo, setShowPolicyInfo] = useState(false)
    return (
        <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-xl p-4 sm:p-6 md:p-8 rounded-2xl shadow-2xl border border-slate-700/50 space-y-4 sm:space-y-5 md:space-y-6"
        >
            {/* Header */}
            <div className="space-y-1 sm:space-y-2">
                <h2 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                    Control Panel
                </h2>
                <p className="text-slate-400 text-xs sm:text-sm">
                    Configure your cache simulation
                </p>
            </div>

            {/* Policy Badge */}
            <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                <span className="text-slate-400 text-xs sm:text-sm">Active Policy:</span>
                <div className="px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full text-xs sm:text-sm font-semibold shadow-lg shadow-indigo-500/30">
                    {policy}
                </div>
            </div>

            {/* Reference String Input */}
            <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">
                    Reference String
                </label>
                <input
                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all placeholder:text-slate-500"
                    placeholder="e.g., 7,0,1,2,0,3,0,4,2,3,0,3,2"
                    value={reference}
                    onChange={e => setReference(e.target.value)}
                    disabled={isRunning}
                />
            </div>

            {/* Frame Count */}
            <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300 flex items-center justify-between">
                    <span>Cache Frames</span>
                    <span className="text-indigo-400 font-bold">{frameCount}</span>
                </label>
                <input
                    type="range"
                    min={1}
                    max={8}
                    className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                    value={frameCount}
                    onChange={e => setFrameCount(Number(e.target.value))}
                    disabled={isRunning}
                />
                <div className="flex justify-between text-xs text-slate-500">
                    <span>1</span>
                    <span>8</span>
                </div>
            </div>

            {/* Policy Selection */}
            <div className="space-y-2">
                <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-slate-300">
                        Replacement Policy
                    </label>
                    <button
                        onClick={() => setShowPolicyInfo(!showPolicyInfo)}
                        className="flex items-center gap-1 px-3 py-1.5 bg-slate-800/50 hover:bg-slate-700/50 border border-slate-600/50 rounded-lg text-xs text-slate-400 hover:text-slate-300 transition-all"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Info
                    </button>
                </div>

                {/* Policy Info Panel */}
                <AnimatePresence>
                    {showPolicyInfo && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="overflow-hidden"
                        >
                            <div className="space-y-3 p-4 bg-slate-950/50 border border-slate-700/50 rounded-xl mb-3">
                                {Object.entries(policyInfo).map(([key, info]) => (
                                    <div
                                        key={key}
                                        className={`p-3 rounded-lg border transition-all ${policy === key
                                            ? "bg-indigo-950/30 border-indigo-500/30"
                                            : "bg-slate-900/30 border-slate-700/30"
                                            }`}
                                    >
                                        <div className="flex items-start gap-3">
                                            <span className="text-2xl">{info.icon}</span>
                                            <div className="flex-1">
                                                <h4 className="font-semibold text-slate-200 mb-1">
                                                    {key} - {info.name}
                                                </h4>
                                                <p className="text-xs text-slate-400 mb-2">
                                                    {info.description}
                                                </p>
                                                <p className="text-xs text-slate-500 italic">
                                                    💡 {info.example}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className="grid grid-cols-3 gap-2">
                    {["FIFO", "LRU", "RANDOM"].map((p) => (
                        <button
                            key={p}
                            onClick={() => setPolicy(p)}
                            disabled={isRunning}
                            className={`px-4 py-3 rounded-xl font-medium transition-all ${policy === p
                                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/30"
                                : "bg-slate-800/50 text-slate-400 hover:bg-slate-700/50 hover:text-slate-300"
                                } ${isRunning ? "opacity-50 cursor-not-allowed" : ""}`}
                        >
                            {p}
                        </button>
                    ))}
                </div>
            </div>

            {/* Step-by-Step Toggle */}
            <div className="flex items-center justify-between p-4 bg-slate-800/30 rounded-xl border border-slate-700/30">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                    </div>
                    <div>
                        <p className="font-medium text-slate-200">Step Mode</p>
                        <p className="text-xs text-slate-500">Manual stepping</p>
                    </div>
                </div>
                <button
                    onClick={() => setStepByStep(!stepByStep)}
                    disabled={isRunning}
                    className={`relative w-14 h-7 rounded-full transition-all ${stepByStep ? "bg-indigo-600" : "bg-slate-700"
                        } ${isRunning ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                    <motion.div
                        className="absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full shadow-lg"
                        animate={{ x: stepByStep ? 28 : 0 }}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                </button>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-2">
                <motion.button
                    whileHover={{ scale: isRunning ? 1 : 1.02 }}
                    whileTap={{ scale: isRunning ? 1 : 0.98 }}
                    onClick={onRun}
                    disabled={isRunning}
                    className={`w-full py-4 rounded-xl font-semibold text-white transition-all shadow-xl ${isRunning
                        ? "bg-slate-700 cursor-not-allowed opacity-50"
                        : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-indigo-500/50"
                        }`}
                >
                    {isRunning ? "Running..." : "▶ Run Simulation"}
                </motion.button>

                {/* Next Step Button - Hidden on mobile, visible on desktop */}
                {stepByStep && isRunning && currentStep < totalSteps && (
                    <motion.button
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={onNextStep}
                        className="hidden sm:flex w-full py-4 rounded-xl font-semibold text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 transition-all shadow-xl shadow-emerald-500/50 items-center justify-center"
                    >
                        ⏭ Next Step ({currentStep + 1}/{totalSteps})
                    </motion.button>
                )}

                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={onReset}
                    className="w-full py-3 rounded-xl font-medium text-slate-300 bg-slate-800/50 hover:bg-slate-700/50 border border-slate-600/50 transition-all"
                >
                    ↻ Reset
                </motion.button>
            </div>

            {/* Info Card */}
            <div className="mt-6 p-4 bg-gradient-to-r from-indigo-950/30 to-purple-950/30 border border-indigo-500/20 rounded-xl">
                <p className="text-xs text-slate-400 leading-relaxed">
                    💡 <strong className="text-indigo-300">Tip:</strong> Enter page numbers separated by commas.
                    The simulator will visualize how the selected policy manages cache frames.
                </p>
            </div>
        </motion.div>
    )
}
