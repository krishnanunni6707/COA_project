"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import ControlPanel from "./ControlPanel"
import CpuBlock from "./CpuBlock"
import CacheVisualizer from "./CacheVisualizer"
import AnimatedArrow from "./AnimatedArrow"
import StatsPanel from "./StatsPanel"

type Step = {
    page: string
    frames: string[]
    hit: boolean
    evictedPage?: string
    activeFrameIndex?: number
}

export default function Simulator() {
    const [reference, setReference] = useState("")
    const [frameCount, setFrameCount] = useState(3)
    const [policy, setPolicy] = useState("FIFO")
    const [frames, setFrames] = useState<string[]>([])
    const [steps, setSteps] = useState<Step[]>([])
    const [current, setCurrent] = useState(0)
    const [hits, setHits] = useState(0)
    const [misses, setMisses] = useState(0)
    const [isRunning, setIsRunning] = useState(false)
    const [stepByStep, setStepByStep] = useState(false)
    const [currentPage, setCurrentPage] = useState<string>()
    const [activeFrameIndex, setActiveFrameIndex] = useState<number>()
    const [isHit, setIsHit] = useState<boolean>()
    const [evictedPage, setEvictedPage] = useState<string>()

    useEffect(() => {
        setFrames(Array(frameCount).fill("-"))
    }, [frameCount])

    useEffect(() => {
        if (current >= steps.length) {
            setIsRunning(false)
            setCurrentPage(undefined)
            setActiveFrameIndex(undefined)
            setIsHit(undefined)
            setEvictedPage(undefined)
            return
        }

        if (stepByStep) return // Wait for manual step

        const timer = setTimeout(() => {
            executeStep(current)
        }, 1200)

        return () => clearTimeout(timer)
    }, [current, steps, stepByStep])

    function executeStep(stepIndex: number) {
        if (stepIndex >= steps.length) return

        const step = steps[stepIndex]
        setCurrentPage(step.page)
        setIsHit(step.hit)
        setActiveFrameIndex(step.activeFrameIndex)
        setEvictedPage(step.evictedPage)
        setFrames([...step.frames])

        step.hit ? setHits(h => h + 1) : setMisses(m => m + 1)

        // Clear indicators after animation
        setTimeout(() => {
            setCurrentPage(undefined)
            setActiveFrameIndex(undefined)
            setIsHit(undefined)
            setEvictedPage(undefined)
            setCurrent(c => c + 1)
        }, 1000)
    }

    function runSimulation() {
        const ref = reference.split(",").map(s => s.trim()).filter(Boolean)
        if (!ref.length) return alert("Please enter a reference string")

        reset()
        setIsRunning(true)

        let simulatedSteps: Step[] = []
        if (policy === "FIFO") simulatedSteps = simulateFIFO(ref)
        if (policy === "LRU") simulatedSteps = simulateLRU(ref)
        if (policy === "RANDOM") simulatedSteps = simulateRandom(ref)

        setSteps(simulatedSteps)
        setCurrent(0)
    }

    function reset() {
        setHits(0)
        setMisses(0)
        setCurrent(0)
        setSteps([])
        setFrames(Array(frameCount).fill("-"))
        setIsRunning(false)
        setCurrentPage(undefined)
        setActiveFrameIndex(undefined)
        setIsHit(undefined)
        setEvictedPage(undefined)
    }

    function nextStep() {
        if (current < steps.length) {
            executeStep(current)
        }
    }

    function simulateFIFO(ref: string[]): Step[] {
        let frames: string[] = []
        let queue: string[] = []
        let result: Step[] = []

        ref.forEach(page => {
            let hit = frames.includes(page)
            let evicted: string | undefined = undefined
            let activeIndex: number | undefined = undefined

            if (!hit) {
                if (frames.length < frameCount) {
                    frames.push(page)
                    queue.push(page)
                    activeIndex = frames.length - 1
                } else {
                    evicted = queue.shift()!
                    activeIndex = frames.indexOf(evicted)
                    frames[activeIndex] = page
                    queue.push(page)
                }
            } else {
                activeIndex = frames.indexOf(page)
            }

            // Pad frames to match frameCount
            const paddedFrames = [...frames]
            while (paddedFrames.length < frameCount) {
                paddedFrames.push("-")
            }

            result.push({
                page,
                frames: paddedFrames,
                hit,
                evictedPage: evicted,
                activeFrameIndex: activeIndex
            })
        })

        return result
    }

    function simulateLRU(ref: string[]): Step[] {
        let frames: string[] = []
        let result: Step[] = []

        ref.forEach(page => {
            let hit = frames.includes(page)
            let evicted: string | undefined = undefined
            let activeIndex: number | undefined = undefined

            if (hit) {
                frames.splice(frames.indexOf(page), 1)
                frames.push(page)
                activeIndex = frames.length - 1
            } else {
                if (frames.length < frameCount) {
                    frames.push(page)
                    activeIndex = frames.length - 1
                } else {
                    evicted = frames[0]
                    frames.shift()
                    frames.push(page)
                    activeIndex = frames.length - 1
                }
            }

            // Pad frames to match frameCount
            const paddedFrames = [...frames]
            while (paddedFrames.length < frameCount) {
                paddedFrames.push("-")
            }

            result.push({
                page,
                frames: paddedFrames,
                hit,
                evictedPage: evicted,
                activeFrameIndex: activeIndex
            })
        })

        return result
    }

    function simulateRandom(ref: string[]): Step[] {
        let frames: string[] = []
        let result: Step[] = []

        ref.forEach(page => {
            let hit = frames.includes(page)
            let evicted: string | undefined = undefined
            let activeIndex: number | undefined = undefined

            if (!hit) {
                if (frames.length < frameCount) {
                    frames.push(page)
                    activeIndex = frames.length - 1
                } else {
                    activeIndex = Math.floor(Math.random() * frameCount)
                    evicted = frames[activeIndex]
                    frames[activeIndex] = page
                }
            } else {
                activeIndex = frames.indexOf(page)
            }

            // Pad frames to match frameCount
            const paddedFrames = [...frames]
            while (paddedFrames.length < frameCount) {
                paddedFrames.push("-")
            }

            result.push({
                page,
                frames: paddedFrames,
                hit,
                evictedPage: evicted,
                activeFrameIndex: activeIndex
            })
        })

        return result
    }

    return (
        <div className="min-h-screen p-3 sm:p-4 md:p-6 lg:p-8">
            {/* Background Gradient */}
            <div className="fixed inset-0 bg-gradient-to-br from-slate-50 via-white to-indigo-50 -z-10" />
            <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-100/30 via-transparent to-transparent -z-10" />

            <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6 md:space-y-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center space-y-2 sm:space-y-3 px-2"
                >
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-700 bg-clip-text text-transparent leading-tight">
                        Cache Replacement Simulator
                    </h1>
                    <p className="text-slate-600 text-sm sm:text-base md:text-lg">
                        Visualize FIFO, LRU, and Random cache replacement policies
                    </p>
                </motion.div>

                {/* Main Content */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
                    {/* Left Column - Control Panel */}
                    <div className="lg:col-span-1">
                        <ControlPanel
                            reference={reference}
                            setReference={setReference}
                            frameCount={frameCount}
                            setFrameCount={setFrameCount}
                            policy={policy}
                            setPolicy={setPolicy}
                            onRun={runSimulation}
                            onReset={reset}
                            onNextStep={nextStep}
                            isRunning={isRunning}
                            stepByStep={stepByStep}
                            setStepByStep={setStepByStep}
                            currentStep={current}
                            totalSteps={steps.length}
                        />
                    </div>

                    {/* Right Column - Visualization & Stats */}
                    <div className="lg:col-span-2 space-y-4 sm:space-y-6 md:space-y-8">
                        {/* Visualization */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="bg-white/90 backdrop-blur-xl p-4 sm:p-6 md:p-8 rounded-2xl shadow-2xl border border-gray-200"
                        >
                            {/* Desktop: CPU - Arrow - Cache horizontal */}
                            {/* Mobile: CPU top, then Arrow (left) - Cache (right) */}
                            <div className="flex flex-col items-center justify-center gap-6 sm:gap-8 md:gap-12">
                                {/* CPU - Full width on mobile, inline on desktop */}
                                <div className="sm:hidden w-full flex justify-center">
                                    <CpuBlock
                                        currentPage={currentPage}
                                        isActive={isRunning && currentPage !== undefined}
                                    />
                                </div>

                                {/* Arrow + Cache container for mobile */}
                                <div className="flex flex-row sm:flex-row items-start justify-center gap-6 sm:gap-8 md:gap-12 w-full sm:w-auto">
                                    {/* CPU - Hidden on mobile, shown on desktop */}
                                    <div className="hidden sm:block">
                                        <CpuBlock
                                            currentPage={currentPage}
                                            isActive={isRunning && currentPage !== undefined}
                                        />
                                    </div>

                                    {/* Arrow */}
                                    <AnimatedArrow
                                        isActive={isRunning && currentPage !== undefined}
                                        isHit={isHit}
                                        activeFrameIndex={activeFrameIndex}
                                        frameCount={frameCount}
                                    />

                                    {/* Cache */}
                                    <CacheVisualizer
                                        frames={frames}
                                        activeFrameIndex={activeFrameIndex}
                                        isHit={isHit}
                                        evictedPage={evictedPage}
                                    />
                                </div>
                            </div>
                        </motion.div>

                        {/* Statistics */}
                        <StatsPanel
                            hits={hits}
                            misses={misses}
                            currentStep={current}
                            totalSteps={steps.length}
                        />
                    </div>
                </div>

                {/* Floating Next Step Button - Mobile Only */}
                <AnimatePresence>
                    {stepByStep && isRunning && current < steps.length && (
                        <motion.button
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={nextStep}
                            className="sm:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-8 py-4 rounded-2xl font-bold text-white bg-gradient-to-r from-emerald-600 to-teal-600 shadow-2xl shadow-emerald-500/50 border-2 border-emerald-400/30 backdrop-blur-sm"
                        >
                            <div className="flex items-center gap-3">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                                </svg>
                                <span>Next Step ({current + 1}/{steps.length})</span>
                            </div>
                        </motion.button>
                    )}
                </AnimatePresence>
            </div>
        </div>
    )
}