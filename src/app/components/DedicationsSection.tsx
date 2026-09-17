'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Quote } from 'lucide-react';

const dedications = [
  {
    phrase: 'Desde el primer instante en que te vi, algo en mí supo que eras la calma que siempre había buscado.',
    context: 'Lo que sentí al conocerte',
  },
  {
    phrase: 'Contigo los momentos más sencillos se vuelven extraordinarios: el café, las charlas sin prisa, el silencio que solo sabe a paz.',
    context: 'Lo que vivo a tu lado',
  },
  {
    phrase: 'Eres la luz suave que ilumina mis días y la certeza de haber encontrado mi hogar.',
    context: 'Lo que eres para mí',
  },
  {
    phrase: 'Gracias por elegir caminar de mi mano. Hoy, mañana y siempre, mi corazón descansa tranquilo en el tuyo.',
    context: 'En este día tan especial',
  },
];

function DedicationCard({ item, index }: { item: typeof dedications[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: index * 0.12 }}
      className="glass-card rounded-3xl p-6 letter-shadow"
    >
      <Quote className="text-primary/40 mb-3" size={24} />
      <p className="text-base font-medium text-foreground leading-relaxed mb-4 italic">
        &ldquo;{item.phrase}&rdquo;
      </p>
      <div className="flex items-center gap-2">
        <div className="h-px flex-1 bg-primary/20" />
        <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
          {item.context}
        </span>
        <div className="h-px flex-1 bg-primary/20" />
      </div>
    </motion.div>
  );
}

export default function DedicationsSection() {
  const headRef = useRef<HTMLDivElement>(null);
  const headInView = useInView(headRef, { once: true });

  return (
    <section className="py-12 px-5">
      <div className="max-w-sm mx-auto">
        {/* Header */}
        <motion.div
          ref={headRef}
          initial={{ opacity: 0, y: 24 }}
          animate={headInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-10"
        >
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-muted-foreground block mb-3">
            03 — Palabras del corazón
          </span>
          <h2 className="text-section-title font-bold text-foreground mb-4">
            Lo que siento{' '}
            <span className="gradient-gold-text">por ti</span>
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Palabras que Alejandro escribió pensando en Paula.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="space-y-4">
          {dedications.map((item, i) => (
            <DedicationCard key={i} item={item} index={i} />
          ))}
        </div>

        {/* Signature */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-center mt-8"
        >
          <p className="text-sm text-muted-foreground">— Con todo mi amor,</p>
          <p className="text-2xl font-bold gradient-gold-text mt-1">Alejandro</p>
        </motion.div>
      </div>
    </section>
  );
}