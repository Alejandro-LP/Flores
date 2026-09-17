'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="py-12 px-5 border-t border-border">
      <div className="max-w-sm mx-auto flex flex-col items-center gap-4 text-center">
        {/* Names */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'backOut' }}
          className="flex items-center gap-3"
        >
          <span className="text-xl font-bold gradient-gold-text">Alejandro</span>
          <motion.div
            animate={{ scale: [1, 1.25, 1] }}
            transition={{ repeat: Infinity, duration: 1.4, ease: 'easeInOut' }}
          >
            <Heart size={22} className="text-primary fill-primary" />
          </motion.div>
          <span className="text-xl font-bold gradient-gold-text">Paula</span>
        </motion.div>

        {/* Divider */}
        <div className="flex items-center gap-3 w-full max-w-[200px]">
          <div className="h-px flex-1 bg-primary/20" />
          <span className="text-primary text-sm">✿</span>
          <div className="h-px flex-1 bg-primary/20" />
        </div>

        {/* Tagline */}
        <p className="text-xs text-muted-foreground">
          Día de las Flores Amarillas · 17 de septiembre de 2026
        </p>

        {/* Links */}
        <div className="flex items-center gap-4 text-xs text-muted-foreground/60 mt-1">
          <a href="#" className="hover:text-foreground transition-colors">Privacidad</a>
          <span>·</span>
          <a href="#" className="hover:text-foreground transition-colors">Términos</a>
        </div>

        <p className="text-[11px] text-muted-foreground/40 mt-1">
          © 2026 FloresAmarillas — Hecho con amor
        </p>
      </div>
    </footer>
  );
}