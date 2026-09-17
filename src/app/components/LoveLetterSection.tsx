'use client';

import React, { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Mail, Heart, X } from 'lucide-react';

const LETTER_CONTENT = `Mi amorcito,

Hoy, en este Día de las Flores Amarillas, quiero detener el tiempo un instante y recordar aquel día en que nos conocimos. Desde el primer segundo, algo en ti llamó mi atención de una forma tan sutil como magnética, un destello que hasta el día de hoy no logro explicar con palabras, pero que se quedó grabado en lo más profundo de mí.

Desde entonces, desde aquel 5 de julio en que cruzaste el umbral de mi vida, todo encontró su verdadera calma. No hubo ruidos ni tormentas, sino la paz profunda con la que la luz de la mañana arropa al mundo: suave, constante y absolutamente inevitable.

Eres el refugio donde siempre quiero habitar. Contigo hasta los detalles más sencillos se vuelven extraordinarios: el aroma del primer café, una charla que se alarga sin prisa, las risas que nacen del alma y ese silencio compartido que solo sabe a paz cuando estoy a tu lado.

Dicen que las flores amarillas guardan la calidez del sol y la alegría más pura. Para mí, tú eres exactamente eso: la luz suave que ilumina mis días y la certeza de haber encontrado mi hogar.

Gracias por ser refugio, por tu dulzura y por regalarme tu presencia. Gracias por elegir caminar de mi mano.

Hoy, mañana y siempre, mi corazón descansa tranquilo en el tuyo.

Con todo mi amor,
Alejandro ✦`;

export default function LoveLetterSection() {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="letter" className="py-16 px-5">
      <div className="max-w-sm mx-auto">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-10"
        >
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-muted-foreground block mb-3">
            04 — Carta de amor
          </span>
          <h2 className="text-section-title font-bold text-foreground mb-4">
            Un mensaje{' '}
            <span className="gradient-gold-text">para ti</span>
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Toca el sobre para abrir tu carta especial.
          </p>
        </motion.div>

        {/* Envelope trigger */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.3, duration: 0.7, ease: 'backOut' }}
          className="flex justify-center mb-8"
        >
          <motion.button
            onClick={() => setIsOpen(true)}
            whileHover={{ scale: 1.06, rotate: -2 }}
            whileTap={{ scale: 0.95 }}
            className="relative w-48 h-36 gradient-gold rounded-3xl flex flex-col items-center justify-center gap-3 shadow-xl cursor-pointer"
            aria-label="Abrir carta de amor"
          >
            {/* Envelope flap */}
            <div className="absolute top-0 left-0 right-0 h-1/2 flex items-start justify-center">
              <div
                className="w-full h-full rounded-t-3xl"
                style={{
                  background: 'linear-gradient(135deg, #E8B84B 0%, #C8860A 100%)',
                  clipPath: 'polygon(0 0, 50% 55%, 100% 0)',
                }}
              />
            </div>
            <Mail size={36} className="text-foreground relative z-10 mt-4" />
            <span className="text-xs font-bold text-foreground/80 relative z-10 uppercase tracking-wider">
              Abrir carta
            </span>
            {/* Wax seal */}
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-8 h-8 bg-accent rounded-full flex items-center justify-center shadow-md">
              <Heart size={14} className="text-white fill-white" />
            </div>
          </motion.button>
        </motion.div>

        {/* Letter overlay modal */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-end justify-center p-4 pb-0"
              style={{ background: 'rgba(61, 43, 0, 0.4)', backdropFilter: 'blur(8px)' }}
              onClick={(e) => { if (e?.target === e?.currentTarget) setIsOpen(false); }}
            >
              <motion.div
                initial={{ y: '100%', opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: '100%', opacity: 0 }}
                transition={{ type: 'spring', damping: 28, stiffness: 300 }}
                className="w-full max-w-sm bg-card rounded-t-4xl overflow-hidden letter-shadow"
                style={{ maxHeight: '88vh' }}
              >
                {/* Header strip */}
                <div className="gradient-gold px-6 py-5 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Heart size={18} className="text-foreground fill-foreground" />
                    <span className="text-sm font-bold text-foreground uppercase tracking-widest">
                      Para Paula
                    </span>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="w-8 h-8 rounded-full bg-foreground/10 flex items-center justify-center"
                    aria-label="Cerrar carta"
                  >
                    <X size={16} className="text-foreground" />
                  </button>
                </div>

                {/* Letter body */}
                <div className="overflow-y-auto px-6 py-6" style={{ maxHeight: 'calc(88vh - 80px)' }}>
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                  >
                    {/* Decorative top */}
                    <div className="flex items-center gap-3 mb-6">
                      <div className="h-px flex-1 bg-primary/20" />
                      <span className="text-primary text-lg">✿</span>
                      <div className="h-px flex-1 bg-primary/20" />
                    </div>

                    <div className="space-y-4">
                      {LETTER_CONTENT?.split('\n\n')?.map((paragraph, i) => (
                        <motion.p
                          key={i}
                          initial={{ opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 + i * 0.08, duration: 0.5 }}
                          className={`text-sm leading-relaxed ${
                            i === 0
                              ? 'text-foreground font-semibold text-base'
                              : i === LETTER_CONTENT?.split('\n\n')?.length - 1
                              ? 'text-accent font-semibold text-right' :'text-foreground/80'
                          }`}
                        >
                          {paragraph}
                        </motion.p>
                      ))}
                    </div>

                    {/* Decorative bottom */}
                    <div className="flex items-center gap-3 mt-8 mb-4">
                      <div className="h-px flex-1 bg-primary/20" />
                      <Heart size={16} className="text-primary fill-primary" />
                      <div className="h-px flex-1 bg-primary/20" />
                    </div>

                    {/* Date */}
                    <p className="text-center text-xs text-muted-foreground pb-6">
                      {new Date()?.toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </p>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}