import React, { useState } from 'react';
import { Camera, Copy, Check, Upload, Sparkles, Image as ImageIcon } from 'lucide-react';
import { ComicPanel } from '../types/comic';

interface ComicPanelVisualProps {
  panel: ComicPanel;
  artStyle: string;
  onUpdateImage?: (imageUrl: string) => void;
  className?: string;
  isInteractive?: boolean;
}

export const ComicPanelVisual: React.FC<ComicPanelVisualProps> = ({
  panel,
  artStyle,
  onUpdateImage,
  className = '',
  isInteractive = true,
}) => {
  const [copiedPrompt, setCopiedPrompt] = useState(false);
  const [showPromptModal, setShowPromptModal] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const handleCopyPrompt = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(panel.image_prompt);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2000);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onUpdateImage) {
      setIsUploading(true);
      const reader = new FileReader();
      reader.onloadend = () => {
        onUpdateImage(reader.result as string);
        setIsUploading(false);
      };
      reader.readAsDataURL(file);
    }
  };

  // Helper color palettes based on artStyle
  const getStyleTheme = () => {
    switch (artStyle) {
      case 'Vintage Pop-Art':
        return {
          bg1: '#FFE600',
          bg2: '#FF3366',
          accent: '#0066FF',
          pattern: 'halftone-pop',
          textDark: true,
        };
      case 'Manga / Anime Noir':
        return {
          bg1: '#111827',
          bg2: '#374151',
          accent: '#EC4899',
          pattern: 'speed-lines',
          textDark: false,
        };
      case 'Dark Graphic Novel':
        return {
          bg1: '#090D16',
          bg2: '#1F2937',
          accent: '#DC2626',
          pattern: 'noir-shadows',
          textDark: false,
        };
      case 'Cyberpunk Synthwave':
        return {
          bg1: '#0F172A',
          bg2: '#3B0764',
          accent: '#06B6D4',
          pattern: 'synth-grid',
          textDark: false,
        };
      case 'Saturday Morning Cartoon':
        return {
          bg1: '#FBBF24',
          bg2: '#FB923C',
          accent: '#818CF8',
          pattern: 'bubbles',
          textDark: true,
        };
      case 'Watercolor Fantasy':
        return {
          bg1: '#064E3B',
          bg2: '#065F46',
          accent: '#34D399',
          pattern: 'watercolor',
          textDark: false,
        };
      case 'Modern Superhero Comic':
      default:
        return {
          bg1: '#1E1B4B',
          bg2: '#312E81',
          accent: '#F59E0B',
          pattern: 'action-burst',
          textDark: false,
        };
    }
  };

  const theme = getStyleTheme();

  return (
    <div
      className={`relative w-full h-full min-h-[220px] overflow-hidden bg-slate-950 flex flex-col justify-between group ${className}`}
    >
      {/* If custom user image exists, render it */}
      {panel.custom_image ? (
        <img
          src={panel.custom_image}
          alt={`Panel ${panel.panel_number}`}
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : (
        /* Stylized SVG Comic Art Scene Generator */
        <div className="absolute inset-0 w-full h-full overflow-hidden select-none pointer-events-none">
          <svg
            className="w-full h-full"
            viewBox="0 0 600 400"
            preserveAspectRatio="xMidYMid slice"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* Halftone Dot Pattern */}
              <pattern
                id={`dots-${panel.panel_number}`}
                x="0"
                y="0"
                width="16"
                height="16"
                patternUnits="userSpaceOnUse"
              >
                <circle cx="8" cy="8" r="3.2" fill="rgba(0,0,0,0.18)" />
              </pattern>

              {/* Linear Dynamic Gradients */}
              <linearGradient
                id={`grad-${panel.panel_number}`}
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor={theme.bg1} />
                <stop offset="60%" stopColor={theme.bg2} />
                <stop offset="100%" stopColor={panel.theme_color || theme.accent} />
              </linearGradient>

              {/* Cyber Glow Filter */}
              <filter id={`glow-${panel.panel_number}`}>
                <feGaussianBlur stdDeviation="3.5" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Background Gradient */}
            <rect width="600" height="400" fill={`url(#grad-${panel.panel_number})`} />

            {/* Halftone Overlay */}
            <rect
              width="600"
              height="400"
              fill={`url(#dots-${panel.panel_number})`}
              opacity="0.75"
            />

            {/* Art Style Specific Visual Features */}
            {theme.pattern === 'synth-grid' && (
              <g stroke="rgba(6, 182, 212, 0.3)" strokeWidth="1.5">
                {[...Array(12)].map((_, i) => (
                  <line
                    key={`h-${i}`}
                    x1="0"
                    y1={240 + i * 15}
                    x2="600"
                    y2={240 + i * 15}
                  />
                ))}
                {[...Array(15)].map((_, i) => (
                  <line
                    key={`v-${i}`}
                    x1={i * 42}
                    y1="240"
                    x2={300 + (i - 7) * 70}
                    y2="400"
                  />
                ))}
              </g>
            )}

            {/* Dramatic Speed Lines for Action / Dutch Angles */}
            {(panel.camera_angle === 'Dramatic Dutch Angle' ||
              panel.camera_angle === 'Close-up' ||
              theme.pattern === 'speed-lines') && (
              <g stroke="rgba(255,255,255,0.18)" strokeWidth="2.5">
                {[...Array(16)].map((_, i) => {
                  const angle = (i * 22.5 * Math.PI) / 180;
                  const x1 = 300 + Math.cos(angle) * 70;
                  const y1 = 200 + Math.sin(angle) * 70;
                  const x2 = 300 + Math.cos(angle) * 350;
                  const y2 = 200 + Math.sin(angle) * 350;
                  return (
                    <line
                      key={`speed-${i}`}
                      x1={x1}
                      y1={y1}
                      x2={x2}
                      y2={y2}
                      strokeDasharray={i % 2 === 0 ? '8 6' : '16 4'}
                    />
                  );
                })}
              </g>
            )}

            {/* Action Silhouettes & Composition Elements */}
            {panel.camera_angle === 'Wide Angle' ? (
              // Cityscape / Horizon landscape
              <g fill="rgba(0,0,0,0.5)">
                <path d="M0 320 L50 320 L50 240 L90 240 L90 320 L160 320 L160 210 L210 210 L210 320 L270 320 L310 180 L350 320 L420 320 L420 220 L490 220 L490 320 L600 320 L600 400 L0 400 Z" />
                {/* Glowing moon or celestial core */}
                <circle
                  cx="480"
                  cy="120"
                  r="45"
                  fill="rgba(255,255,255,0.2)"
                  filter={`url(#glow-${panel.panel_number})`}
                />
              </g>
            ) : panel.camera_angle === 'Close-up' ? (
              // Dramatic Hero Silhouette Close-up
              <g fill="rgba(0,0,0,0.65)" stroke="#000" strokeWidth="3">
                <circle cx="300" cy="180" r="85" />
                {/* Glowing eyes / visor */}
                <ellipse
                  cx="275"
                  cy="175"
                  rx="16"
                  ry="6"
                  fill="#FFF"
                  filter={`url(#glow-${panel.panel_number})`}
                />
                <ellipse
                  cx="325"
                  cy="175"
                  rx="16"
                  ry="6"
                  fill="#FFF"
                  filter={`url(#glow-${panel.panel_number})`}
                />
                <path
                  d="M210 320 Q300 240 390 320 L420 400 L180 400 Z"
                  fill="rgba(0,0,0,0.8)"
                />
              </g>
            ) : (
              // Dynamic Action Pose Silhouette
              <g>
                <path
                  d="M240 380 L270 260 L290 200 L300 130 Q300 110 320 110 Q340 110 340 130 L350 200 L370 260 L400 380 Z"
                  fill="rgba(0,0,0,0.65)"
                  stroke="#000"
                  strokeWidth="3"
                />
                {/* Action Energy Arc */}
                <path
                  d="M150 250 Q300 120 450 260"
                  fill="none"
                  stroke={panel.theme_color || '#F59E0B'}
                  strokeWidth="5"
                  strokeLinecap="round"
                  filter={`url(#glow-${panel.panel_number})`}
                />
              </g>
            )}

            {/* Vintage Pop-Art Burst Star (if pop art style) */}
            {artStyle === 'Vintage Pop-Art' && (
              <polygon
                points="100,50 120,80 150,70 140,100 170,110 145,130 160,160 130,150 120,180 100,160 80,180 70,150 40,160 55,130 30,110 60,100 50,70 80,80"
                fill="#FFDD00"
                stroke="#000"
                strokeWidth="3"
                opacity="0.85"
              />
            )}
          </svg>
        </div>
      )}

      {/* Camera Angle & Staging Badge (Top Right) */}
      <div className="relative z-10 flex items-center justify-between p-3 pointer-events-none">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-black/80 backdrop-blur-sm border border-black text-xs font-bold text-yellow-400 font-bebas uppercase tracking-wider shadow-sm pointer-events-auto">
          <Camera className="w-3.5 h-3.5 text-yellow-400" />
          <span>{panel.camera_angle}</span>
        </div>

        {/* Hover Action Controls (Upload Image / View AI Prompt) */}
        {isInteractive && (
          <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-auto">
            <button
              onClick={() => setShowPromptModal(true)}
              className="p-1.5 rounded bg-black/80 hover:bg-yellow-400 hover:text-black text-slate-200 border border-black shadow text-xs flex items-center gap-1 transition-colors"
              title="View Gemini AI Image Prompt"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span className="hidden sm:inline text-[11px] font-bold">Prompt</span>
            </button>

            {onUpdateImage && (
              <label className="p-1.5 rounded bg-black/80 hover:bg-cyan-400 hover:text-black text-slate-200 border border-black shadow text-xs flex items-center gap-1 cursor-pointer transition-colors">
                <Upload className="w-3.5 h-3.5" />
                <span className="hidden sm:inline text-[11px] font-bold">Upload Art</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                  disabled={isUploading}
                />
              </label>
            )}
          </div>
        )}
      </div>

      {/* Visual Scene Staging Description Pill (Bottom) */}
      <div className="relative z-10 p-3 mt-auto pointer-events-none">
        <div className="bg-black/75 backdrop-blur-md rounded border border-white/10 p-2 text-[11px] text-slate-200 line-clamp-2 leading-relaxed">
          <span className="text-yellow-400 font-bold uppercase mr-1">Visual:</span>
          {panel.scene_description}
        </div>
      </div>

      {/* Modal: View & Copy Gemini AI Image Prompt */}
      {showPromptModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={() => setShowPromptModal(false)}
        >
          <div
            className="bg-slate-900 border-3 border-black rounded-xl p-5 max-w-lg w-full shadow-[8px_8px_0px_#000] text-slate-100"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-yellow-400" />
                <h3 className="font-bangers text-xl text-yellow-400 tracking-wide">
                  Gemini Art Prompt (Panel #{panel.panel_number})
                </h3>
              </div>
              <button
                onClick={() => setShowPromptModal(false)}
                className="text-slate-400 hover:text-white font-bold text-sm px-2 py-1 rounded"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-400 mb-2 font-mono">
              Art Style: <span className="text-cyan-400 font-bold">{artStyle}</span> | Angle:{' '}
              <span className="text-purple-400 font-bold">{panel.camera_angle}</span>
            </p>

            <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 text-xs font-mono text-slate-200 whitespace-pre-wrap leading-relaxed max-h-44 overflow-y-auto mb-4">
              {panel.image_prompt}
            </div>

            <div className="flex items-center justify-between gap-3">
              <button
                onClick={handleCopyPrompt}
                className="comic-box bg-yellow-400 text-black px-4 py-2 rounded-lg font-bangers text-sm flex items-center gap-1.5 hover:bg-yellow-300 transition-colors"
              >
                {copiedPrompt ? (
                  <>
                    <Check className="w-4 h-4 text-black" /> Copied to Clipboard!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" /> Copy Prompt
                  </>
                )}
              </button>

              <button
                onClick={() => setShowPromptModal(false)}
                className="px-4 py-2 rounded-lg border border-slate-700 text-xs font-bold text-slate-300 hover:bg-slate-800"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
