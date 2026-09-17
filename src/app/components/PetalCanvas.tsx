'use client';

import React, { useEffect, useRef } from 'react';
import { usePetalStore } from '../store/petalStore';

interface Flower {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
  color: string;
  swayOffset: number;
  swaySpeed: number;
}

const FLOWER_COLORS = [
  'rgba(245, 200, 66, 0.9)',
  'rgba(255, 220, 50, 0.85)',
  'rgba(255, 235, 120, 0.95)',
  'rgba(212, 160, 23, 0.8)',
  'rgba(255, 249, 180, 0.9)',
  'rgba(240, 190, 40, 0.85)',
];

function createFlower(canvasWidth: number, startFromTop = false): Flower {
  return {
    x: Math.random() * canvasWidth,
    y: startFromTop ? -Math.random() * 200 - 20 : -Math.random() * window.innerHeight - 20,
    size: Math.random() * 16 + 10,
    speedY: Math.random() * 0.5 + 0.2,
    speedX: (Math.random() - 0.5) * 0.3,
    rotation: Math.random() * Math.PI * 2,
    rotationSpeed: (Math.random() - 0.5) * 0.015,
    opacity: Math.random() * 0.35 + 0.65,
    color: FLOWER_COLORS[Math.floor(Math.random() * FLOWER_COLORS.length)],
    swayOffset: Math.random() * Math.PI * 2,
    swaySpeed: Math.random() * 0.008 + 0.004,
  };
}

function drawFlower(ctx: CanvasRenderingContext2D, flower: Flower, time: number) {
  ctx.save();
  ctx.translate(flower.x, flower.y);
  ctx.rotate(flower.rotation);
  ctx.globalAlpha = flower.opacity;

  const s = flower.size;
  const petalCount = 5;
  const petalLength = s * 0.55;
  const petalWidth = s * 0.22;

  // Draw petals
  for (let i = 0; i < petalCount; i++) {
    ctx.save();
    ctx.rotate((i * Math.PI * 2) / petalCount);
    ctx.beginPath();
    ctx.ellipse(0, -petalLength * 0.5, petalWidth, petalLength, 0, 0, Math.PI * 2);
    ctx.fillStyle = flower.color;
    ctx.fill();
    ctx.restore();
  }

  // Draw center
  ctx.beginPath();
  ctx.arc(0, 0, s * 0.18, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(255, 255, 200, 0.95)';
  ctx.fill();

  ctx.restore();
}

export default function PetalCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const flowersRef = useRef<Flower[]>([]);
  const animFrameRef = useRef<number>(0);
  const runningRef = useRef(false);
  const timeRef = useRef(0);

  useEffect(() => {
    // Start continuous rain immediately
    startRain();

    const unsubscribe = usePetalStore.subscribe((state) => {
      if (state.continuous && !runningRef.current) {
        startRain();
      }
    });

    return () => {
      unsubscribe();
      cancelAnimationFrame(animFrameRef.current);
      runningRef.current = false;
    };
  }, []);

  function startRain() {
    const canvas = canvasRef.current;
    if (!canvas || runningRef.current) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    runningRef.current = true;
    flowersRef.current = [];

    // Pre-populate flowers spread across the screen
    for (let i = 0; i < 120; i++) {
      const f = createFlower(canvas.width, false);
      // Spread initial flowers at various heights so it looks like it's already snowing
      f.y = Math.random() * canvas.height;
      flowersRef.current.push(f);
    }

    animate();
  }

  function animate() {
    if (!runningRef.current) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Resize if needed
    if (canvas.width !== window.innerWidth || canvas.height !== window.innerHeight) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    timeRef.current += 1;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Continuously spawn new flowers to maintain density
    if (flowersRef.current.length < 130) {
      for (let i = 0; i < 3; i++) {
        flowersRef.current.push(createFlower(canvas.width, true));
      }
    }

    flowersRef.current = flowersRef.current.filter((flower) => {
      // Gentle sway like snowflakes
      flower.x += flower.speedX + Math.sin(timeRef.current * flower.swaySpeed + flower.swayOffset) * 0.4;
      flower.y += flower.speedY;
      flower.rotation += flower.rotationSpeed;

      if (flower.y > canvas.height + 30) {
        // Recycle: move back to top
        flower.y = -flower.size - 10;
        flower.x = Math.random() * canvas.width;
        flower.speedY = Math.random() * 0.5 + 0.2;
        flower.speedX = (Math.random() - 0.5) * 0.3;
      }

      drawFlower(ctx, flower, timeRef.current);
      return true;
    });

    animFrameRef.current = requestAnimationFrame(animate);
  }

  return (
    <canvas
      ref={canvasRef}
      className="petal-canvas"
      aria-hidden="true"
    />
  );
}