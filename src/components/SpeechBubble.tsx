import React from 'react';
import { BubbleType } from '../types/comic';

interface SpeechBubbleProps {
  character: string;
  text: string;
  bubbleType: BubbleType;
  avatarColor?: string;
  isEditing?: boolean;
  onTextChange?: (newText: string) => void;
  className?: string;
}

export const SpeechBubble: React.FC<SpeechBubbleProps> = ({
  character,
  text,
  bubbleType,
  avatarColor = '#3B82F6',
  isEditing = false,
  onTextChange,
  className = '',
}) => {
  // Render based on bubble style
  if (bubbleType === 'thought') {
    // Cloud thought bubble
    return (
      <div className={`relative max-w-[85%] ${className}`}>
        <div className="bg-white text-black font-comic font-bold text-xs sm:text-sm px-3.5 py-2.5 rounded-3xl border-3 border-black shadow-[3px_3px_0px_#000] leading-snug">
          {character && (
            <span
              className="inline-block px-1.5 py-0.5 rounded text-[10px] font-bangers uppercase tracking-wider text-white mr-1.5 shadow-sm"
              style={{ backgroundColor: avatarColor }}
            >
              {character} (THINKS)
            </span>
          )}
          {isEditing ? (
            <textarea
              value={text}
              onChange={(e) => onTextChange?.(e.target.value)}
              className="w-full bg-yellow-50 text-black border border-black/40 rounded p-1 text-xs resize-none focus:outline-none focus:ring-2 focus:ring-yellow-400"
              rows={2}
            />
          ) : (
            <span className="italic">{text}</span>
          )}
        </div>
        {/* Thought bubbles little floating circles */}
        <div className="flex gap-1 mt-1 ml-4">
          <div className="w-2.5 h-2.5 rounded-full bg-white border-2 border-black"></div>
          <div className="w-1.5 h-1.5 rounded-full bg-white border border-black"></div>
        </div>
      </div>
    );
  }

  if (bubbleType === 'shout') {
    // Jagged energetic action shout bubble
    return (
      <div className={`relative max-w-[90%] ${className}`}>
        <div className="bg-yellow-300 text-black font-bangers text-sm sm:text-base tracking-wide px-4 py-2.5 rounded-xl border-3 border-black shadow-[4px_4px_0px_#EF4444] uppercase leading-tight transform -rotate-1">
          {character && (
            <span
              className="inline-block px-2 py-0.5 rounded text-[11px] font-bangers tracking-wider text-white mr-1.5 shadow-sm"
              style={{ backgroundColor: avatarColor }}
            >
              {character} (SHOUTS)
            </span>
          )}
          {isEditing ? (
            <textarea
              value={text}
              onChange={(e) => onTextChange?.(e.target.value)}
              className="w-full bg-white text-black border border-black rounded p-1 text-xs resize-none focus:outline-none"
              rows={2}
            />
          ) : (
            <span>{text}</span>
          )}
        </div>
      </div>
    );
  }

  if (bubbleType === 'whisper') {
    // Dashed whisper bubble
    return (
      <div className={`relative max-w-[85%] ${className}`}>
        <div className="bg-slate-100/95 text-slate-800 font-comic italic text-xs px-3 py-2 rounded-2xl border-2 border-dashed border-slate-700 shadow-[2px_2px_0px_rgba(0,0,0,0.5)]">
          {character && (
            <span
              className="inline-block px-1.5 py-0.2 rounded text-[9px] font-sans font-bold text-white mr-1 opacity-80"
              style={{ backgroundColor: avatarColor }}
            >
              {character} (whisper)
            </span>
          )}
          {isEditing ? (
            <textarea
              value={text}
              onChange={(e) => onTextChange?.(e.target.value)}
              className="w-full bg-white border border-slate-400 rounded p-1 text-xs resize-none focus:outline-none"
              rows={2}
            />
          ) : (
            <span>"{text}"</span>
          )}
        </div>
      </div>
    );
  }

  if (bubbleType === 'radio') {
    // Sci-fi / transmission communicator bubble
    return (
      <div className={`relative max-w-[85%] ${className}`}>
        <div className="bg-slate-900 text-cyan-300 font-mono text-xs px-3.5 py-2 rounded-md border-2 border-cyan-400 shadow-[3px_3px_0px_#06B6D4] flex items-start gap-1.5">
          <span className="text-[10px] font-bold text-cyan-400 animate-pulse">📡</span>
          <div className="flex-1">
            {character && (
              <span className="text-[10px] uppercase font-bold text-cyan-200 block mb-0.5">
                [{character} // TRANSMISSION]:
              </span>
            )}
            {isEditing ? (
              <textarea
                value={text}
                onChange={(e) => onTextChange?.(e.target.value)}
                className="w-full bg-slate-950 text-cyan-300 border border-cyan-500 rounded p-1 text-xs resize-none focus:outline-none"
                rows={2}
              />
            ) : (
              <span>{text}</span>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Default Standard Speech Bubble
  return (
    <div className={`relative max-w-[85%] ${className}`}>
      <div className="bg-white text-black font-comic font-bold text-xs sm:text-sm px-3.5 py-2.5 rounded-2xl border-3 border-black shadow-[3px_3px_0px_#000] leading-snug">
        {character && (
          <span
            className="inline-block px-1.5 py-0.5 rounded text-[10px] font-bangers uppercase tracking-wider text-white mr-1.5 shadow-sm"
            style={{ backgroundColor: avatarColor }}
          >
            {character}
          </span>
        )}
        {isEditing ? (
          <textarea
            value={text}
            onChange={(e) => onTextChange?.(e.target.value)}
            className="w-full bg-yellow-50 text-black border border-black/40 rounded p-1 text-xs resize-none focus:outline-none focus:ring-2 focus:ring-yellow-400"
            rows={2}
          />
        ) : (
          <span>{text}</span>
        )}
      </div>

      {/* Bubble pointer tail */}
      <div className="w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[10px] border-t-white ml-5 -mt-0.5 relative z-10 filter drop-shadow-[0_2px_0_#000]"></div>
    </div>
  );
};

// Comic Narration Box component (Yellow header caption)
export const NarrationBox: React.FC<{
  text: string;
  isEditing?: boolean;
  onTextChange?: (newText: string) => void;
  className?: string;
}> = ({ text, isEditing = false, onTextChange, className = '' }) => {
  if (!text && !isEditing) return null;

  return (
    <div
      className={`comic-box-sm bg-yellow-300 text-black px-3 py-1.5 rounded-sm font-comic text-xs font-bold uppercase tracking-tight shadow-md ${className}`}
    >
      {isEditing ? (
        <textarea
          value={text}
          onChange={(e) => onTextChange?.(e.target.value)}
          placeholder="Narration caption (e.g. 'Meanwhile in the secret lab...')"
          className="w-full bg-white text-black border border-black/40 rounded p-1 text-xs resize-none focus:outline-none"
          rows={2}
        />
      ) : (
        <span>{text}</span>
      )}
    </div>
  );
};

// Action Sound Effect Burst Badge
export const SoundEffectBurst: React.FC<{
  effect: string;
  className?: string;
  onClick?: () => void;
}> = ({ effect, className = '', onClick }) => {
  if (!effect) return null;

  return (
    <div
      onClick={onClick}
      className={`cursor-pointer select-none inline-block transform hover:scale-110 active:scale-95 transition-transform duration-150 ${className}`}
      title="Click to play comic sound!"
    >
      <div className="comic-burst bg-gradient-to-r from-red-600 via-yellow-400 to-amber-500 p-3 sm:p-4 text-center filter drop-shadow-[3px_3px_0px_#000]">
        <span className="font-bangers text-black text-base sm:text-xl md:text-2xl font-black tracking-wider uppercase drop-shadow-[1px_1px_0px_#FFF]">
          {effect}
        </span>
      </div>
    </div>
  );
};
