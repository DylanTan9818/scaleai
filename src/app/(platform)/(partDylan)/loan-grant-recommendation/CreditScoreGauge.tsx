// components/CreditScoreGauge.tsx
'use client'

import * as React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Clock } from "lucide-react"
import { Separator } from "@/components/ui/separator";

export function CreditScoreGauge({ score = 800 }: { score?: number }) {
      const colors = ['#F52F62', '#4BB7DC', '#48E194']

  const canvasRef = React.useRef<HTMLCanvasElement>(null)

  React.useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const width = canvas.width
    const height = canvas.height
    const centerX = width / 2
    const centerY = height / 2
    const radius = Math.min(width, height) / 2 - 10

    ctx.clearRect(0, 0, width, height)

    // Define three segments with noticeable gaps in between
    const arcWidth = 12
    const segmentAngle = Math.PI / 3.65  // Each segment is 30 degrees
    const spacingAngle = Math.PI / 12 // 15 degrees of blank space between segments
    const colors = ['#ff6f61', '#ffd700', '#40e0d0'] // Red, Yellow, Turquoise

    for (let i = 0; i < 3; i++) {
      ctx.beginPath()
      const startAngle = Math.PI + i * (segmentAngle + spacingAngle)
      const endAngle = startAngle + segmentAngle
      ctx.arc(centerX, centerY, radius, startAngle, endAngle)
      ctx.strokeStyle = colors[i]
      ctx.lineWidth = arcWidth
      ctx.lineCap = 'square'
      ctx.stroke()
    }

  
    // Draw dotted arc underneath the score
    ctx.setLineDash([2, 4])
    ctx.beginPath()
    ctx.arc(centerX, centerY, radius + -40, Math.PI, 0)
    ctx.strokeStyle = '#e5e5e5'
    ctx.lineWidth = 2
    ctx.stroke()

    // Reset line dash for future elements
    ctx.setLineDash([])

  }, [score])

  return (
    <Card className="h-[350px]">
      <CardContent className="p-6">
  <div className="relative flex flex-col items-center">
    <canvas 
      ref={canvasRef} 
      width={200} 
      height={200} 
      className="w-48 h-48"
    />
    <div 
      className="absolute" 
      style={{
        top: '50%', // Adjust this value to move it vertically
        transform: 'translateY(-50%)', // Adjust to center it properly
        textAlign: 'center'
      }}
    >
      <div className="text-3xl font-semibold mb-2">{score}</div>
      <div className="flex items-center justify-center gap-1 text-xs text-emerald-400">
        <Clock className="w-3 h-3 mt-5" />
        <span className="text-xl mt-5">EXCELLENT</span>
        
      </div>
    </div>
  </div>
</CardContent>

    </Card>
  )
}
