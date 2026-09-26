import React, { useState } from 'react';
import { InteractiveDiagramData, DiagramHotspot } from '../../types';
import { ZoomIn, Info, Sparkles, CheckCircle2, ChevronRight } from 'lucide-react';

interface Props {
  data: InteractiveDiagramData;
}

export const InteractiveDiagramViewer: React.FC<Props> = ({ data }) => {
  const [selectedHotspot, setSelectedHotspot] = useState<DiagramHotspot>(data.hotspots[0]);
  const [hoveredHotspot, setHoveredHotspot] = useState<string | null>(null);

  // Render SVG based on diagram type
  const renderSvgGraphics = () => {
    switch (data.type) {
      case 'heart':
        return (
          <svg viewBox="0 0 400 360" className="w-full h-full max-h-[380px] drop-shadow-md">
            <defs>
              <linearGradient id="heartArterial" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ef4444" />
                <stop offset="100%" stopColor="#b91c1c" />
              </linearGradient>
              <linearGradient id="heartVenous" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#1d4ed8" />
              </linearGradient>
              <linearGradient id="aortaGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#f87171" />
                <stop offset="100%" stopColor="#dc2626" />
              </linearGradient>
            </defs>
            {/* Aorta Arch */}
            <path d="M170,120 C170,40 260,30 260,110 L240,125 C240,75 190,75 190,120 Z" fill="url(#aortaGrad)" stroke="#991b1b" strokeWidth="2" />
            {/* Superior Vena Cava */}
            <rect x="110" y="40" width="35" height="90" rx="10" fill="url(#heartVenous)" stroke="#1e3a8a" strokeWidth="2" />
            {/* Pulmonary Trunk */}
            <path d="M185,120 C185,90 140,80 120,95 L115,115 C130,105 165,110 165,130 Z" fill="#2563eb" />
            {/* Right Atrium */}
            <path d="M100,120 C70,140 70,200 120,220 C140,220 150,190 150,150 C150,130 130,120 100,120 Z" fill="url(#heartVenous)" stroke="#1e40af" strokeWidth="2" />
            {/* Left Atrium */}
            <path d="M250,120 C280,140 280,190 250,210 C230,210 220,180 220,140 C220,120 240,120 250,120 Z" fill="url(#heartArterial)" stroke="#991b1b" strokeWidth="2" />
            {/* Right Ventricle */}
            <path d="M120,215 C120,270 160,310 185,320 L185,210 C150,210 130,210 120,215 Z" fill="#3b82f6" stroke="#1e3a8a" strokeWidth="2" opacity="0.9" />
            {/* Left Ventricle (Thicker muscle wall) */}
            <path d="M185,210 L185,320 C220,315 270,270 260,205 C240,205 210,210 185,210 Z" fill="url(#heartArterial)" stroke="#7f1d1d" strokeWidth="3" />
            {/* Septum / Central line */}
            <line x1="185" y1="130" x2="185" y2="320" stroke="#fecaca" strokeWidth="4" strokeDasharray="3 3" />
            {/* Flow arrows */}
            <path d="M125,70 L125,130" stroke="#93c5fd" strokeWidth="3" strokeLinecap="round" markerEnd="url(#arrow)" />
            <path d="M225,120 L225,60" stroke="#fca5a5" strokeWidth="3" strokeLinecap="round" />
          </svg>
        );

      case 'plant_cell':
        return (
          <svg viewBox="0 0 400 360" className="w-full h-full max-h-[380px] drop-shadow-md">
            <defs>
              <linearGradient id="cellWall" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#15803d" />
                <stop offset="100%" stopColor="#166534" />
              </linearGradient>
              <linearGradient id="vacuole" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#bae6fd" />
                <stop offset="100%" stopColor="#7dd3fc" />
              </linearGradient>
            </defs>
            {/* Cell Wall (Hexagonal / Rectangular) */}
            <polygon points="50,40 350,40 375,180 340,320 60,320 25,180" fill="#dcfce7" stroke="url(#cellWall)" strokeWidth="12" />
            <polygon points="58,48 342,48 365,180 332,312 68,312 35,180" fill="#bbf7d0" stroke="#22c55e" strokeWidth="3" />
            {/* Central Vacuole */}
            <path d="M160,110 C290,90 320,160 300,240 C280,280 200,280 170,250 C140,220 130,130 160,110 Z" fill="url(#vacuole)" stroke="#0284c7" strokeWidth="2" opacity="0.85" />
            {/* Nucleus */}
            <circle cx="110" cy="120" r="42" fill="#f43f5e" opacity="0.85" />
            <circle cx="110" cy="120" r="16" fill="#be123c" />
            {/* Chloroplasts */}
            <g transform="translate(80, 230)">
              <ellipse cx="25" cy="15" rx="30" ry="16" fill="#16a34a" stroke="#15803d" strokeWidth="2" />
              <line x1="8" y1="15" x2="42" y2="15" stroke="#86efac" strokeWidth="2" />
              <line x1="12" y1="10" x2="38" y2="10" stroke="#86efac" strokeWidth="2" />
              <line x1="12" y1="20" x2="38" y2="20" stroke="#86efac" strokeWidth="2" />
            </g>
            <g transform="translate(190, 60)">
              <ellipse cx="25" cy="15" rx="26" ry="14" fill="#16a34a" stroke="#15803d" strokeWidth="2" />
              <line x1="10" y1="15" x2="40" y2="15" stroke="#86efac" strokeWidth="2" />
            </g>
            {/* Mitochondria */}
            <g transform="translate(260, 270) rotate(-20)">
              <rect x="0" y="0" width="45" height="22" rx="11" fill="#f97316" stroke="#c2410c" strokeWidth="2" />
              <path d="M8,11 Q15,4 22,11 T36,11" stroke="#fde047" strokeWidth="2" fill="none" />
            </g>
          </svg>
        );

      case 'dna':
        return (
          <svg viewBox="0 0 400 360" className="w-full h-full max-h-[380px] drop-shadow-md">
            <defs>
              <linearGradient id="strandLeft" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#0ea5e9" />
                <stop offset="100%" stopColor="#2563eb" />
              </linearGradient>
              <linearGradient id="strandRight" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#d946ef" />
              </linearGradient>
            </defs>
            {/* Double Helix Sine Waves */}
            <g transform="translate(40, 20)">
              {/* Horizontal Base Pair Rungs */}
              {[30, 65, 100, 135, 170, 205, 240, 275, 310].map((y, idx) => {
                const spread = Math.sin((y / 320) * Math.PI * 3.5) * 65;
                const x1 = 160 - spread;
                const x2 = 160 + spread;
                const isAT = idx % 2 === 0;
                return (
                  <g key={y}>
                    <line x1={x1} y1={y} x2={(x1 + x2) / 2} y2={y} stroke={isAT ? "#ef4444" : "#10b981"} strokeWidth="5" strokeLinecap="round" />
                    <circle cx={(x1 + x2) / 2} cy={y} r="3" fill="#cbd5e1" />
                    <line x1={(x1 + x2) / 2} y1={y} x2={x2} y2={y} stroke={isAT ? "#f59e0b" : "#3b82f6"} strokeWidth="5" strokeLinecap="round" />
                  </g>
                );
              })}
              {/* Left Backbone */}
              <path
                d="M 95,20 C 130,55 220,95 220,135 C 220,175 100,215 100,255 C 100,295 210,320 210,340"
                fill="none"
                stroke="url(#strandLeft)"
                strokeWidth="10"
                strokeLinecap="round"
              />
              {/* Right Backbone */}
              <path
                d="M 225,20 C 190,55 100,95 100,135 C 100,175 220,215 220,255 C 220,295 110,320 110,340"
                fill="none"
                stroke="url(#strandRight)"
                strokeWidth="10"
                strokeLinecap="round"
              />
            </g>
          </svg>
        );

      default: // 'cell' Animal Cell
        return (
          <svg viewBox="0 0 400 360" className="w-full h-full max-h-[380px] drop-shadow-md">
            <defs>
              <radialGradient id="cytoGrad" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#fef08a" stopOpacity="0.7" />
                <stop offset="70%" stopColor="#fed7aa" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#fdba74" stopOpacity="0.95" />
              </radialGradient>
              <radialGradient id="nucGrad" cx="40%" cy="40%" r="60%">
                <stop offset="0%" stopColor="#a855f7" />
                <stop offset="80%" stopColor="#6b21a8" />
              </radialGradient>
            </defs>
            {/* Plasma Membrane */}
            <path
              d="M60,160 C50,80 140,40 240,50 C330,60 370,120 360,200 C350,280 270,320 170,310 C80,300 70,240 60,160 Z"
              fill="url(#cytoGrad)"
              stroke="#ea580c"
              strokeWidth="6"
            />
            {/* Nucleus */}
            <circle cx="200" cy="180" r="50" fill="url(#nucGrad)" stroke="#4c1d95" strokeWidth="3" />
            <circle cx="188" cy="170" r="18" fill="#3b0764" />
            {/* Endoplasmic Reticulum folds */}
            <path d="M230,130 C270,120 280,150 255,165 C285,175 285,200 250,210" fill="none" stroke="#e11d48" strokeWidth="4" strokeLinecap="round" />
            {/* Mitochondria 1 */}
            <g transform="translate(100, 220) rotate(-25)">
              <rect x="0" y="0" width="50" height="24" rx="12" fill="#ef4444" stroke="#991b1b" strokeWidth="2" />
              <path d="M8,12 Q14,4 20,12 T34,12" stroke="#fef08a" strokeWidth="2" fill="none" />
            </g>
            {/* Mitochondria 2 */}
            <g transform="translate(260, 90) rotate(45)">
              <rect x="0" y="0" width="46" height="22" rx="11" fill="#ef4444" stroke="#991b1b" strokeWidth="2" />
              <path d="M8,11 Q14,4 20,11 T32,11" stroke="#fef08a" strokeWidth="2" fill="none" />
            </g>
            {/* Golgi Apparatus */}
            <g transform="translate(260, 220)">
              <path d="M0,0 C15,-8 30,-8 45,0" stroke="#f59e0b" strokeWidth="5" strokeLinecap="round" fill="none" />
              <path d="M2,10 C16,3 32,3 46,10" stroke="#f59e0b" strokeWidth="5" strokeLinecap="round" fill="none" />
              <path d="M5,20 C18,14 30,14 42,20" stroke="#f59e0b" strokeWidth="5" strokeLinecap="round" fill="none" />
              <circle cx="54" cy="5" r="4" fill="#f59e0b" />
              <circle cx="-5" cy="15" r="3" fill="#f59e0b" />
            </g>
            {/* Ribosomes (dots) */}
            {[
              [140, 110], [155, 95], [175, 80], [210, 95],
              [120, 170], [135, 150], [145, 185],
              [240, 250], [225, 270], [160, 260]
            ].map(([x, y], i) => (
              <circle key={i} cx={x} cy={y} r="2.5" fill="#475569" />
            ))}
          </svg>
        );
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden p-4 sm:p-6 transition-all duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 gap-2">
        <div>
          <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-semibold text-xs tracking-wider uppercase">
            <Sparkles className="w-4 h-4 animate-spin-slow" />
            Interaktiv 2D/3D Diagramma
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-1">
            {data.title}
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {data.subtitle}
          </p>
        </div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-xs font-medium self-start sm:self-auto border border-emerald-200 dark:border-emerald-800">
          <Info className="w-3.5 h-3.5" />
          Nuqtalar ustiga bosing
        </div>
      </div>

      {/* Main Diagram Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6 items-center">
        {/* Interactive Visual Canvas with Hotspots */}
        <div className="lg:col-span-7 relative bg-gradient-to-br from-slate-50 via-slate-100/50 to-emerald-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-emerald-950/20 rounded-2xl p-4 sm:p-6 border border-slate-200/80 dark:border-slate-800/80 flex items-center justify-center min-h-[340px]">
          {renderSvgGraphics()}

          {/* Hotspot Markers */}
          {data.hotspots.map((hotspot) => {
            const isSelected = selectedHotspot?.id === hotspot.id;
            const isHovered = hoveredHotspot === hotspot.id;

            return (
              <button
                key={hotspot.id}
                onClick={() => setSelectedHotspot(hotspot)}
                onMouseEnter={() => setHoveredHotspot(hotspot.id)}
                onMouseLeave={() => setHoveredHotspot(null)}
                style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%` }}
                className={`absolute -translate-x-1/2 -translate-y-1/2 group transition-all duration-200 z-20 focus:outline-none`}
                aria-label={hotspot.label}
              >
                <div className="relative flex items-center justify-center">
                  {/* Pulsing ring */}
                  <span
                    className={`absolute -inset-2 rounded-full animate-ping opacity-60 ${
                      isSelected ? 'bg-emerald-500' : 'bg-blue-400'
                    }`}
                  />
                  {/* Center Dot / Badge */}
                  <span
                    className={`relative px-2.5 py-1 rounded-full text-xs font-bold shadow-lg transition-transform duration-200 flex items-center gap-1 border ${
                      isSelected
                        ? 'bg-emerald-600 text-white border-white scale-110 ring-4 ring-emerald-500/30'
                        : isHovered
                        ? 'bg-slate-900 text-white border-slate-700 scale-105'
                        : 'bg-white/95 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-slate-300 dark:border-slate-600'
                    }`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    {hotspot.label}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Part Details Card */}
        <div className="lg:col-span-5 flex flex-col justify-between h-full bg-slate-50 dark:bg-slate-800/60 rounded-2xl p-5 border border-slate-200 dark:border-slate-700/60">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-700">
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                Tanlangan qism
              </span>
              <span className="px-2 py-0.5 rounded text-xs bg-slate-200 dark:bg-slate-700 font-mono text-slate-700 dark:text-slate-300">
                {selectedHotspot.label}
              </span>
            </div>

            <h4 className="text-xl font-bold text-slate-900 dark:text-white mt-3 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
              {selectedHotspot.title}
            </h4>

            <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mt-2.5">
              {selectedHotspot.description}
            </p>

            {selectedHotspot.fact && (
              <div className="mt-4 p-3.5 bg-amber-50 dark:bg-amber-950/40 rounded-xl border border-amber-200 dark:border-amber-800/60">
                <div className="flex items-center gap-1.5 text-xs font-bold text-amber-800 dark:text-amber-300 mb-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  Qiziqarli fakt:
                </div>
                <p className="text-xs text-amber-900 dark:text-amber-200/90 leading-relaxed">
                  {selectedHotspot.fact}
                </p>
              </div>
            )}
          </div>

          {/* Quick List of Other Parts */}
          <div className="mt-5 pt-4 border-t border-slate-200 dark:border-slate-700">
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium block mb-2">
              Barcha qismlar ({data.hotspots.length}):
            </span>
            <div className="flex flex-wrap gap-1.5">
              {data.hotspots.map((h) => (
                <button
                  key={h.id}
                  onClick={() => setSelectedHotspot(h)}
                  className={`text-xs px-2.5 py-1 rounded-lg font-medium transition-colors ${
                    selectedHotspot.id === h.id
                      ? 'bg-emerald-600 text-white'
                      : 'bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
                  }`}
                >
                  {h.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
