'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Star, Sun, Heart } from 'lucide-react';
import Icon from '@/components/ui/AppIcon';



const timelineEvents = [
{
  date: '5 de julio, 2026',
  title: 'El día que todo cambió',
  description: 'El universo conspiró para que nuestros caminos se cruzaran. Desde ese instante, supe que algo extraordinario había comenzado.',
  icon: Star,
},
{
  date: 'Cada día desde entonces',
  title: 'Construyendo algo hermoso',
  description: 'Cada conversación, cada risa compartida, cada momento contigo ha ido tejiendo la historia más bonita de mi vida.',
  icon: Sun,
},
{
  date: 'Hoy, 17 de septiembre',
  title: 'Día de las Flores Amarillas',
  description: 'Hoy te regalo flores amarillas —símbolo de alegría y amistad profunda— porque eso eres tú para mí: mi alegría más grande.',
  icon: Heart,
}];


function TimelineCard({ event, index }: {event: typeof timelineEvents[0];index: number;}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const Icon = event.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
      className="relative">
      
      {/* Timeline dot */}
      <div className="absolute left-4 top-6 z-10 w-8 h-8 gradient-gold rounded-full flex items-center justify-center shadow-md">
        <Icon size={14} className="text-foreground" />
      </div>

      {/* Card */}
      <div className="ml-16 glass-card rounded-3xl overflow-hidden letter-shadow">
        <div className="px-5 pt-5 pb-1">
          <span className="text-xs font-bold uppercase tracking-widest text-foreground/70 bg-primary/10 px-3 py-1 rounded-full">
            {event.date}
          </span>
        </div>
        <div className="p-5">
          <h3 className="text-lg font-bold text-foreground mb-2">{event.title}</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">{event.description}</p>
        </div>
      </div>
    </motion.div>);

}

export default function StorySection() {
  const headRef = useRef<HTMLDivElement>(null);
  const headInView = useInView(headRef, { once: true });

  return (
    <section id="story" className="py-16 px-5">
      <div className="max-w-sm mx-auto">
        {/* Header */}
        <motion.div
          ref={headRef}
          initial={{ opacity: 0, y: 24 }}
          animate={headInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12">
          
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-muted-foreground block mb-3">
            02 — Nuestra Historia
          </span>
          <h2 className="text-section-title font-bold text-foreground mb-4">
            Desde el primer{' '}
            <span className="gradient-gold-text">instante</span>
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Cada capítulo de esta historia la escribimos juntos, tú y yo.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 timeline-line rounded-full opacity-30" />

          <div className="space-y-8">
            {timelineEvents.map((event, i) =>
            <TimelineCard key={i} event={event} index={i} />
            )}
          </div>
        </div>
      </div>
    </section>);

}