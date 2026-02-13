"use client";

import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { useEffect, useRef } from "react";

type WaveBackgroundProps = {
  className?: string;
  color?: "lime" | "cyan";
  speed?: number;
  amplitude?: number;
  frequency?: number;
  opacity?: number;
};

export function WaveBackground({
  className,
  color = "lime",
  speed = 2,
  amplitude = 30,
  frequency = 0.02,
  opacity = 0.3,
}: WaveBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let time = 0;

    const colors = {
      lime: "rgba(204, 255, 0, OPACITY)",
      cyan: "rgba(0, 243, 255, OPACITY)",
    };

    const strokeColor = colors[color].replace("OPACITY", String(opacity));
    const glowColor = colors[color].replace("OPACITY", String(opacity * 0.5));

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    const drawWave = (offset: number, yOffset: number, lineOpacity: number) => {
      const width = canvas.offsetWidth;
      const height = canvas.offsetHeight;

      ctx.beginPath();
      ctx.moveTo(0, height / 2);

      for (let x = 0; x <= width; x++) {
        const y =
          height / 2 +
          Math.sin(x * frequency + time + offset) * amplitude +
          Math.sin(x * frequency * 2 + time * 1.5 + offset) *
            (amplitude * 0.3) +
          yOffset;
        ctx.lineTo(x, y);
      }

      ctx.strokeStyle = strokeColor.replace(
        String(opacity),
        String(opacity * lineOpacity),
      );
      ctx.lineWidth = 2;
      ctx.stroke();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

      // Glow effect
      ctx.shadowBlur = 20;
      ctx.shadowColor = glowColor;

      // Multiple waves with different phases
      drawWave(0, 0, 1);
      drawWave(Math.PI / 3, -20, 0.6);
      drawWave(Math.PI / 2, 20, 0.4);
      drawWave(Math.PI, -40, 0.3);

      time += 0.02 * speed;
      animationId = requestAnimationFrame(animate);
    };

    resize();
    window.addEventListener("resize", resize);
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationId);
    };
  }, [color, speed, amplitude, frequency, opacity]);

  return (
    <canvas
      ref={canvasRef}
      className={cn(
        "pointer-events-none absolute inset-0 size-full",
        className,
      )}
    />
  );
}

type PulseLineProps = {
  className?: string;
  color?: "lime" | "cyan";
};

export function PulseLine({ className, color = "lime" }: PulseLineProps) {
  const lineColor = color === "lime" ? "bg-lime-400" : "bg-cyan-400";
  const glowColor =
    color === "lime"
      ? "shadow-[0_0_20px_oklch(0.91_0.23_120/0.6)]"
      : "shadow-[0_0_20px_oklch(0.85_0.16_195/0.6)]";

  return (
    <div className={cn("relative h-px w-full overflow-hidden", className)}>
      <div className={cn("absolute inset-0", lineColor, "opacity-20")} />
      <motion.div
        className={cn("absolute h-full w-32", lineColor, glowColor)}
        animate={{
          x: ["-100%", "calc(100vw + 100%)"],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </div>
  );
}
