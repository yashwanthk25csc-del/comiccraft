import React, { useState, useEffect } from 'react';
import { Sparkles, Volume2, VolumeX, BookOpen, Users, PlusCircle, Compass, Zap, Flame } from 'lucide-react';
import { comicSound } from '../utils/comicSound';

interface NavbarProps {
  currentTab: 'home' | 'dashboard' | 'create' | 'editor' | 'characters' | 'preview';
  onNavigate: (tab: 'home' | 'dashboard' | 'create' | 'editor' | 'characters' | 'preview') => void;
  activeComicTitle?: string;
  hasActiveComic?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onNavigate,
  activeComicTitle,
  hasActiveComic,
}) => {
  const [isMuted, setIsMuted] = useState(comicSound.getMuted());
  const [hasGemini, setHasGemini] = useState<boolean>(true);

  useEffect(() => {
    fetch('/api/health')
      .then((res) => res.json())
      .then((data) => {
        setHasGemini(data.hasGeminiKey);
      })
      .catch(() => setHasGemini(false));
  }, []);

  const handleToggleSound = () => {
    const muted = comicSound.toggleMute();
    setIsMuted(muted);
    if (!muted) {
      comicSound.playPop();
    }
  };

  const handleNav = (tab: any) => {
    comicSound.playPop();
    onNavigate(tab);
  };

  return (
    <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b-3 border-black text-white px-3 sm:px-6 py-2.5 shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 sm:gap-4">
        {/* Brand / Logo */}
        <div
          onClick={() => handleNav('home')}
          className="flex items-center gap-2 sm:gap-2.5 cursor-pointer group select-none"
        >
          <div className="relative">
            <div className="w-9 h-9 sm:w-10 sm:h-10 bg-yellow-400 border-2 border-black rounded-lg flex items-center justify-center shadow-[3px_3px_0px_#000] group-hover:-rotate-6 transition-transform">
              <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-black fill-yellow-400 stroke-[2.5]" />
            </div>
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
            </span>
          </div>

          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bangers text-xl sm:text-2xl text-yellow-400 tracking-wide drop-shadow-[2px_2px_0px_#000]">
                ComicCraft
              </span>
              <span className="font-bebas text-xs sm:text-sm px-1.5 py-0.2 bg-red-500 text-white font-bold rounded border border-black uppercase tracking-wider">
                AI
              </span>
            </div>
            <p className="text-[10px] text-slate-400 hidden sm:block font-mono -mt-1">
              Powered by Gemini AI
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-900/80 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => handleNav('home')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold font-sans transition-all flex items-center gap-1.5 ${
              currentTab === 'home'
                ? 'bg-yellow-400 text-black border-2 border-black shadow-[2px_2px_0px_#000]'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            Home
          </button>

          <button
            onClick={() => handleNav('dashboard')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold font-sans transition-all flex items-center gap-1.5 ${
              currentTab === 'dashboard'
                ? 'bg-yellow-400 text-black border-2 border-black shadow-[2px_2px_0px_#000]'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            Comics
          </button>

          <button
            onClick={() => handleNav('characters')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold font-sans transition-all flex items-center gap-1.5 ${
              currentTab === 'characters'
                ? 'bg-yellow-400 text-black border-2 border-black shadow-[2px_2px_0px_#000]'
                : 'text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            Characters
          </button>

          {hasActiveComic && (
            <>
              <button
                onClick={() => handleNav('editor')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold font-sans transition-all flex items-center gap-1.5 ${
                  currentTab === 'editor'
                    ? 'bg-yellow-400 text-black border-2 border-black shadow-[2px_2px_0px_#000]'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Flame className="w-3.5 h-3.5 text-orange-400" />
                Editor
              </button>

              <button
                onClick={() => handleNav('preview')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold font-sans transition-all flex items-center gap-1.5 ${
                  currentTab === 'preview'
                    ? 'bg-yellow-400 text-black border-2 border-black shadow-[2px_2px_0px_#000]'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                Reader
              </button>
            </>
          )}
        </nav>

        {/* Right Action Bar */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Gemini AI Status Badge */}
          <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-900 border border-slate-700 text-[11px] text-slate-300">
            <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
            <span>Gemini 3.8</span>
            <span
              className={`w-2 h-2 rounded-full ${
                hasGemini ? 'bg-emerald-400' : 'bg-blue-400'
              }`}
              title={hasGemini ? 'Gemini API Connected' : 'Gemini Smart Fallback Active'}
            />
          </div>

          {/* Sound Toggle */}
          <button
            onClick={handleToggleSound}
            className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-yellow-400 transition-colors"
            title={isMuted ? 'Turn Sound ON' : 'Turn Sound OFF'}
          >
            {isMuted ? (
              <VolumeX className="w-4 h-4 text-slate-400" />
            ) : (
              <Volume2 className="w-4 h-4 text-yellow-400" />
            )}
          </button>

          {/* Create Comic CTA Button */}
          <button
            onClick={() => handleNav('create')}
            className="comic-box bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-300 hover:to-amber-400 text-black px-3.5 sm:px-4 py-1.5 rounded-lg font-bangers text-sm sm:text-base tracking-wider flex items-center gap-1.5 transition-all shadow-[3px_3px_0px_#000] active:translate-x-0.5 active:translate-y-0.5"
          >
            <PlusCircle className="w-4 h-4 stroke-[2.5]" />
            <span>Create Comic</span>
          </button>
        </div>
      </div>
    </header>
  );
};
