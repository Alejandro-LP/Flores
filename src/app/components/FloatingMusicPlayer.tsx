'use client';

import React, { useState } from 'react';

export default function FloatingMusicPlayer() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  const videoId = 'R5cbxTPZNL0';

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
      {/* Player panel */}
      {isOpen && !isMinimized && (
        <div
          className="rounded-2xl overflow-hidden shadow-2xl border border-yellow-200/40"
          style={{
            background: 'rgba(255, 253, 240, 0.92)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
          }}
        >
          {/* Header bar */}
          <div className="flex items-center justify-between px-3 py-2 bg-yellow-100/60">
            <div className="flex items-center gap-2">
              <span className="text-yellow-500 text-sm">🌻</span>
              <span className="text-xs font-medium text-yellow-800 tracking-wide">
                Para Paula
              </span>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setIsMinimized(true)}
                className="w-5 h-5 rounded-full bg-yellow-200 hover:bg-yellow-300 flex items-center justify-center transition-colors"
                aria-label="Minimizar"
              >
                <span className="text-yellow-700 text-xs leading-none">−</span>
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="w-5 h-5 rounded-full bg-red-200 hover:bg-red-300 flex items-center justify-center transition-colors"
                aria-label="Cerrar"
              >
                <span className="text-red-700 text-xs leading-none">×</span>
              </button>
            </div>
          </div>

          {/* YouTube embed */}
          <div className="w-64 aspect-video">
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
              title="Canción para Paula"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="block"
            />
          </div>
        </div>
      )}

      {/* Minimized bar */}
      {isOpen && isMinimized && (
        <div
          className="flex items-center gap-2 px-3 py-2 rounded-full shadow-lg border border-yellow-200/40 cursor-pointer"
          style={{
            background: 'rgba(255, 253, 240, 0.92)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
          }}
          onClick={() => setIsMinimized(false)}
        >
          <span className="text-yellow-500 text-sm animate-pulse">♪</span>
          <span className="text-xs text-yellow-800 font-medium">Para Paula</span>
          <button
            onClick={(e) => { e?.stopPropagation(); setIsOpen(false); }}
            className="w-4 h-4 rounded-full bg-red-200 hover:bg-red-300 flex items-center justify-center transition-colors ml-1"
            aria-label="Cerrar"
          >
            <span className="text-red-700 text-xs leading-none">×</span>
          </button>
        </div>
      )}

      {/* Toggle button */}
      {!isOpen && (
        <button
          onClick={() => { setIsOpen(true); setIsMinimized(false); }}
          className="w-12 h-12 rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110 active:scale-95 border border-yellow-200/60"
          style={{
            background: 'linear-gradient(135deg, #fde68a, #fbbf24)',
          }}
          aria-label="Abrir reproductor de música"
        >
          <span className="text-white text-xl">🎵</span>
        </button>
      )}
    </div>
  );
}
