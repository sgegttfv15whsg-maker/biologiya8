import React, { useState } from 'react';
import { ZoomIn, ZoomOut, X, Maximize2, Minimize2, Sparkles, Info } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  caption?: string;
  imageUrl?: string;
  altText?: string;
  fallbackSvg?: React.ReactNode;
}

export const ImageModalViewer: React.FC<Props> = ({
  isOpen,
  onClose,
  title,
  caption,
  imageUrl,
  altText,
  fallbackSvg
}) => {
  const [scale, setScale] = useState(1);
  const [imgError, setImgError] = useState(false);

  if (!isOpen) return null;

  const handleZoomIn = () => setScale(s => Math.min(s + 0.25, 2.5));
  const handleZoomOut = () => setScale(s => Math.max(s - 0.25, 0.5));
  const handleResetZoom = () => setScale(1);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="bg-white dark:bg-slate-900 rounded-3xl w-full max-w-4xl max-h-[90vh] border border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col overflow-hidden">
        {/* Top Action Bar */}
        <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-950/50">
          <div>
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              Biologik Illyustratsiya & Diagramma
            </span>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mt-0.5">
              {title}
            </h3>
          </div>

          <div className="flex items-center gap-1 sm:gap-2">
            {/* Zoom Controls */}
            <div className="flex items-center bg-slate-200/60 dark:bg-slate-800 rounded-2xl p-1">
              <button
                onClick={handleZoomOut}
                className="p-2 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-700 transition-colors"
                title="Kichraytirish (Zoom Out)"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <button
                onClick={handleResetZoom}
                className="px-2 text-xs font-mono font-bold text-slate-700 dark:text-slate-300"
                title="Masshtabni tiklash"
              >
                {Math.round(scale * 100)}%
              </button>
              <button
                onClick={handleZoomIn}
                className="p-2 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-700 transition-colors"
                title="Kattalashtirish (Zoom In)"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-2.5 rounded-2xl bg-slate-100 hover:bg-rose-50 dark:bg-slate-800 dark:hover:bg-rose-950/40 text-slate-600 hover:text-rose-600 dark:text-slate-300 transition-colors"
              title="Yopish"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Image Content Container */}
        <div className="flex-1 overflow-auto p-4 sm:p-8 flex items-center justify-center bg-slate-100/50 dark:bg-slate-950/50 min-h-[350px]">
          <div
            style={{ transform: `scale(${scale})`, transition: 'transform 0.2s ease-out' }}
            className="flex items-center justify-center origin-center select-none"
          >
            {imageUrl && !imgError ? (
              <img
                src={imageUrl}
                alt={altText || title}
                onError={() => setImgError(true)}
                className="max-h-[500px] w-auto object-contain rounded-2xl shadow-xl drop-shadow-md"
              />
            ) : (
              fallbackSvg || (
                <div className="p-8 text-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm max-w-md">
                  <div className="text-6xl mb-3">🧬</div>
                  <h4 className="font-bold text-slate-900 dark:text-white">{title}</h4>
                  <p className="text-xs text-slate-500 mt-1">
                    Ilmiy mikroskopik va anatomik tuzilish diagrammasi
                  </p>
                </div>
              )
            )}
          </div>
        </div>

        {/* Caption & Explanation */}
        {caption && (
          <div className="p-4 sm:p-5 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed flex items-start gap-2.5">
            <Info className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
            <div>
              <strong className="text-slate-900 dark:text-white block font-bold">
                Tushuntirish:
              </strong>
              <span>{caption}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
