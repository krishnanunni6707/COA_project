"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

type AnimatedArrowProps = {
    isActive: boolean
    isHit?: boolean
    activeFrameIndex?: number
    frameCount: number
}

export default function AnimatedArrow({ isActive, isHit, activeFrameIndex, frameCount }: AnimatedArrowProps) {
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 640)
        checkMobile()
        window.addEventListener('resize', checkMobile)
        return () => window.removeEventListener('resize', checkMobile)
    }, [])

    // Calculate vertical offset based on active frame
    // Frame height: 64px (h-16), gap: 8px (space-y-2) on mobile, 12px (space-y-3) on sm+
    const frameHeight = 64
    const gapMobile = 8
    const gapDesktop = 12

    // Cache label offset (label + gap before frames)
    const labelOffsetMobile = 64  // Label ~48px + gap-4 (16px)
    const labelOffsetDesktop = 72 // Label ~48px + gap-6 (24px)

    // Calculate offset from top to point at specific frame
    // Offset = labelHeight + gap + (frameIndex * (frameHeight + gap)) + halfFrameHeight (to center on frame)
    const frameOffsetMobile = activeFrameIndex !== undefined
        ? labelOffsetMobile + (activeFrameIndex * (frameHeight + gapMobile)) + (frameHeight / 2) - 4
        : 0
    const frameOffsetDesktop = activeFrameIndex !== undefined
        ? labelOffsetDesktop + (activeFrameIndex * (frameHeight + gapDesktop)) + (frameHeight / 2) - 4
        : 0

    // Use mobile offset on mobile, desktop offset on desktop  
    const yOffset = isMobile ? frameOffsetMobile : frameOffsetDesktop

    return (
        <motion.div
            className="relative flex flex-row items-center"
            animate={{
                y: isActive && activeFrameIndex !== undefined ? yOffset : 0,
            }}
            transition={{
                duration: 0.5,
                ease: "easeOut"
            }}
        >
            {/* Arrow Line - Horizontal on both mobile and desktop */}
            <div className="relative h-1 w-12 sm:w-20 md:w-24 lg:w-32 bg-gray-300 rounded-full overflow-hidden">
                {/* Animated Pulse */}
                {isActive && (
                    <motion.div
                        className={`absolute inset-0 rounded-full ${isHit
                            ? "bg-gradient-to-r from-emerald-500 to-emerald-400"
                            : "bg-gradient-to-r from-rose-500 to-rose-400"
                            }`}
                        initial={{ opacity: 0.3 }}
                        animate={{ opacity: [0.3, 0.8, 0.3] }}
                        transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />
                )}
            </div>

            {/* Arrow Head - Points right on both mobile and desktop */}
            <div className="relative">
                <motion.svg
                    className={`w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 -ml-2 ${isActive
                        ? isHit
                            ? "text-emerald-500"
                            : "text-rose-500"
                        : "text-gray-400"
                        }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    animate={isActive ? {
                        x: [0, 4, 0],
                    } : {}}
                    transition={{
                        duration: 1.5,
                        repeat: isActive ? Infinity : 0,
                        ease: "easeInOut"
                    }}
                >
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </motion.svg>

                {/* Glow Effect */}
                {isActive && (
                    <motion.div
                        className={`absolute inset-0 rounded-full blur-lg ${isHit ? "bg-emerald-500" : "bg-rose-500"
                            }`}
                        animate={{
                            scale: [1, 1.5, 1],
                            opacity: [0.5, 0.8, 0.5]
                        }}
                        transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />
                )}
            </div>
        </motion.div>
    )
}
