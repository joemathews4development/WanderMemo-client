// components/AiThinkingLoader.jsx
import { Box, Typography, CircularProgress } from "@mui/material"
import { keyframes } from "@mui/system"
import { useEffect, useState } from "react"

const dotAnimation = keyframes`
0% { opacity: 0.2 }
20% { opacity: 1 }
100% { opacity: 0.2 }
`

const messages = [
    "Analyzing destinations...",
    "Finding amazing activities...",
    "Optimizing your itinerary...",
    "Adding local experiences...",
    "Almost ready..."
]

function AiThinkingLoader() {

    const [index, setIndex] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % messages.length)
        }, 2000)
        return () => clearInterval(interval)
    }, [])

    return (
        <Box sx={{
            display: "flex", flexDirection: "column", alignItems: "center",
            justifyContent: "center", p: 6, gap: 3
        }}
        >
            {/* Animated Spinner */}
            <CircularProgress size={60} />
            {/* AI Thinking Text */}
            <Typography variant="h6" fontWeight={600}>
                🤖 AI is planning your trip
            </Typography>
            {/* Animated dots */}
            <Box sx={{ display: "flex", gap: 1 }}>
                {[0, 1, 2].map((i) => (
                    <Box key={i} sx={{
                        width: 8, height: 8, borderRadius: "50%", backgroundColor: "primary.main",
                        animation: `${dotAnimation} 1.4s infinite`, animationDelay: `${i * 0.2}s`
                    }}
                    />
                ))}
            </Box>
            <Typography variant="body1" color="text.secondary" sx={{
                transition: "opacity 0.3s ease"
            }}
            >
                {messages[index]}
            </Typography>
        </Box>
    )
}

export default AiThinkingLoader