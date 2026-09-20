'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, ChevronDown } from 'lucide-react';
import { usePetalStore } from '../store/PetalStore';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const START_DATE = new Date('2026-07-05T00:00:00');

function calcTimeLeft(): TimeLeft {
  const now = new Date();
  const diff = now.getTime() - START_DATE.getTime();
  if (diff < 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  const totalSeconds = Math.floor(diff / 1000);
  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
  };
}

function TimeUnit({ value, label }: { value: number; label: string }) {
  return (
    <motion.div
      className="flex flex-col items-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="glass-card rounded-2xl px-4 py-3 min-w-[64px] text-center letter-shadow">
        <motion.span
          key={value}
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="block text-3xl font-bold gradient-gold-text tabular-nums"
        >
          {String(value).padStart(2, '0')}
        </motion.span>
        <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mt-1 block">
          {label}
        </span>
      </div>
    </motion.div>
  );
}

export default function HeroSection() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [clicked, setClicked] = useState(false);
  const trigger = usePetalStore((s) => s.trigger);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setTimeLeft(calcTimeLeft());
    const interval = setInterval(() => {
      setTimeLeft(calcTimeLeft());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  function handleCTA() {
    setClicked(true);
    trigger();
    const next = document.getElementById('story');
    if (next) {
      setTimeout(() => next.scrollIntoView({ behavior: 'smooth' }), 800);
    }
  }

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-5 pt-16 pb-12"
    >
      {/* Atmospheric background blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute -top-32 -left-32 w-[420px] h-[420px] rounded-full opacity-30"
          style={{ background: 'radial-gradient(circle, #F5C842 0%, #D4A017 50%, transparent 80%)', filter: 'blur(60px)' }}
        />
        <div
          className="absolute top-1/3 -right-24 w-[300px] h-[300px] rounded-full opacity-20"
          style={{ background: 'radial-gradient(circle, #FFE87A 0%, #C8860A 60%, transparent 80%)', filter: 'blur(50px)' }}
        />
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[200px] opacity-25"
          style={{ background: 'radial-gradient(ellipse, #FFF3CC 0%, transparent 70%)', filter: 'blur(40px)' }}
        />
        {/* Decorative floating flowers */}
        {[
          { top: '8%', left: '6%', size: 28, delay: 0 },
          { top: '12%', right: '8%', size: 20, delay: 0.5 },
          { top: '70%', left: '4%', size: 16, delay: 1 },
          { top: '80%', right: '6%', size: 22, delay: 1.5 },
        ].map((f, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{ top: f.top, left: (f as { left?: string }).left, right: (f as { right?: string }).right }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 0.6, scale: 1 }}
            transition={{ delay: f.delay + 0.8, duration: 0.6, ease: 'backOut' }}
          >
            <span
              className="float-gentle inline-block text-primary"
              style={{ fontSize: f.size, animationDelay: `${f.delay}s` }}
            >
              ✿
            </span>
          </motion.div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-sm mx-auto w-full">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7, ease: 'easeOut' }}
          className="flex items-center gap-2 mb-6"
        >
          <div className="h-px w-10 bg-primary/40" />
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
            Día de las Flores Amarillas
          </span>
          <div className="h-px w-10 bg-primary/40" />
        </motion.div>

        {/* Main headline */}
        <motion.h1
          className="text-hero font-bold text-foreground mb-3"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          Para Paula,
        </motion.h1>
        <motion.p
          className="text-section-title font-light text-foreground/70 mb-2"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          mi amor eterno
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.5, ease: 'backOut' }}
          className="mb-8"
        >
          <Heart className="text-primary fill-primary mx-auto mt-2" size={28} />
        </motion.div>

        {/* Countdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.8 }}
          className="w-full mb-3"
        >
          <p className="text-xs text-muted-foreground font-medium mb-4 uppercase tracking-widest">
            Llevamos juntos
          </p>
          <div className="flex items-start justify-center gap-3">
            <TimeUnit value={timeLeft.days} label="Días" />
            <span className="text-2xl font-bold text-primary mt-3">:</span>
            <TimeUnit value={timeLeft.hours} label="Horas" />
            <span className="text-2xl font-bold text-primary mt-3">:</span>
            <TimeUnit value={timeLeft.minutes} label="Min" />
            <span className="text-2xl font-bold text-primary mt-3">:</span>
            <TimeUnit value={timeLeft.seconds} label="Seg" />
          </div>
          <p className="text-[11px] text-muted-foreground mt-3">
            desde el 5 de julio de 2026 ✦
          </p>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.7 }}
          className="w-full mt-6"
        >
          <AnimatePresence mode="wait">
            {!clicked ? (
              <motion.button
                key="cta"
                onClick={handleCTA}
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.03 }}
                className="shimmer-btn pulse-gold w-full gradient-gold text-foreground font-bold text-sm px-8 py-4 rounded-full flex items-center justify-center gap-3 shadow-lg"
              >
                <Sparkles size={18} />
                Haz clic para ver florecer nuestro amor
                <Sparkles size={18} />
              </motion.button>
            ) : (
              <motion.div
                key="clicked"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full glass-card rounded-full py-4 px-8 text-center"
              >
                <span className="text-sm font-semibold gradient-gold-text">
                  ✨ Nuestro amor florece cada día ✨
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="mt-10 flex flex-col items-center gap-1 text-muted-foreground"
        >
          <span className="text-xs">Descubre nuestra historia</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
          >
            <ChevronDown size={18} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}