import React from 'react';
import {
  Sparkles,
  Zap,
  ArrowRight,
  BookOpen,
  Layers,
  Palette,
  Share2,
  Users,
  CheckCircle2,
  ChevronRight,
  Flame,
} from 'lucide-react';
import { ComicStory } from '../types/comic';
import { ComicPanelVisual } from './ComicPanelVisual';
import { SpeechBubble, NarrationBox, SoundEffectBurst } from './SpeechBubble';
import { comicSound } from '../utils/comicSound';

interface HomePageProps {
  onStartCreating: () => void;
  onExploreComics: () => void;
  onSelectComic: (comic: ComicStory) => void;
  featuredComics: ComicStory[];
}

export const HomePage: React.FC<HomePageProps> = ({
  onStartCreating,
  onExploreComics,
  onSelectComic,
  featuredComics,
}) => {
  const heroSampleComic = featuredComics[0];

  const handleSoundEffect = (sfx: string) => {
    comicSound.playPunch();
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 bg-halftone pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-8 pb-16 px-4 sm:px-6 lg:px-8 border-b-4 border-black bg-gradient-to-b from-indigo-950/70 via-slate-950 to-slate-950">
        <div className="max-w-7xl mx-auto">
          {/* Top Pill Announcement */}
          <div className="flex justify-center mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-yellow-400/10 border-2 border-yellow-400/40 text-yellow-300 text-xs sm:text-sm font-bold tracking-wide font-sans shadow-lg">
              <Sparkles className="w-4 h-4 text-yellow-400" />
              <span>Next-Gen Comic Book Creation with Google Gemini AI</span>
            </div>
          </div>

          {/* Hero Headlines */}
          <div className="text-center max-w-4xl mx-auto mb-10">
            <h1 className="font-bangers text-5xl sm:text-7xl lg:text-8xl tracking-wider text-white uppercase drop-shadow-[4px_4px_0px_#000] leading-none mb-4">
              Turn Your Ideas Into{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-400 to-amber-500 drop-shadow-[3px_3px_0px_#B45309]">
                Comics!
              </span>
            </h1>
            <p className="text-slate-300 text-base sm:text-xl font-comic max-w-2xl mx-auto leading-relaxed">
              Describe a plot, characters, or wild concept. Gemini AI transforms your imagination
              into complete comic pages with cinematic panels, snappy dialogue, dramatic narration,
              and authentic sound effects.
            </p>

            {/* Hero CTAs */}
            <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
              <button
                onClick={() => {
                  comicSound.playFanfare();
                  onStartCreating();
                }}
                className="comic-box bg-yellow-400 hover:bg-yellow-300 text-black px-7 py-3.5 rounded-xl font-bangers text-xl tracking-wider flex items-center gap-2.5 transition-all shadow-[5px_5px_0px_#000] active:translate-x-1 active:translate-y-1 hover:-translate-y-0.5"
              >
                <Zap className="w-6 h-6 fill-black" />
                <span>Create Your Comic</span>
                <ArrowRight className="w-5 h-5 stroke-[2.5]" />
              </button>

              <button
                onClick={() => {
                  comicSound.playPop();
                  onExploreComics();
                }}
                className="comic-box bg-slate-900 hover:bg-slate-800 text-white px-6 py-3.5 rounded-xl font-bangers text-lg tracking-wider border-3 border-black flex items-center gap-2 transition-all shadow-[5px_5px_0px_#000]"
              >
                <BookOpen className="w-5 h-5 text-yellow-400" />
                <span>Explore Showcase</span>
              </button>
            </div>
          </div>

          {/* Interactive Hero Comic Strip Demonstration */}
          {heroSampleComic && (
            <div className="mt-8 max-w-5xl mx-auto">
              <div className="comic-box-lg bg-yellow-400 p-2 sm:p-3 rounded-2xl">
                <div className="bg-slate-900 border-3 border-black rounded-xl p-4 sm:p-5">
                  {/* Comic Strip Header Banner */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-3 mb-4 border-b-2 border-black/80 text-xs font-mono">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-red-600 text-white font-bangers tracking-wider text-sm border border-black">
                        FEATURED ISSUE #1
                      </span>
                      <span className="font-bold text-yellow-400 text-sm font-comic">
                        {heroSampleComic.title}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-slate-400">
                      <span>Genre: <strong className="text-white">{heroSampleComic.genre}</strong></span>
                      <span>Style: <strong className="text-white">{heroSampleComic.artStyle}</strong></span>
                      <button
                        onClick={() => onSelectComic(heroSampleComic)}
                        className="text-xs font-bold text-yellow-400 hover:underline flex items-center gap-1"
                      >
                        Read Full Story <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* 3 Live Interactive Panels Preview */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {heroSampleComic.panels.slice(0, 3).map((panel) => (
                      <div
                        key={panel.panel_number}
                        className="comic-box bg-slate-950 rounded-lg overflow-hidden flex flex-col relative group"
                      >
                        {/* Panel Number Badge */}
                        <div className="absolute top-2 left-2 z-20 bg-yellow-400 text-black border-2 border-black rounded px-2 py-0.5 font-bangers text-xs shadow-sm">
                          PANEL #{panel.panel_number}
                        </div>

                        {/* Visual Art Scene */}
                        <div className="h-44 sm:h-52 w-full relative">
                          <ComicPanelVisual
                            panel={panel}
                            artStyle={heroSampleComic.artStyle}
                            isInteractive={false}
                          />

                          {/* Sound Effect Burst */}
                          {panel.sound_effect && (
                            <div className="absolute top-3 right-3 z-20">
                              <SoundEffectBurst
                                effect={panel.sound_effect}
                                onClick={() => handleSoundEffect(panel.sound_effect!)}
                              />
                            </div>
                          )}
                        </div>

                        {/* Dialogue & Narration Section */}
                        <div className="p-3 bg-slate-900/95 flex-1 flex flex-col justify-between gap-2 border-t-2 border-black">
                          {panel.narration && (
                            <NarrationBox text={panel.narration} />
                          )}

                          <div className="space-y-1.5 mt-1">
                            {panel.dialogue.slice(0, 2).map((dlg) => (
                              <SpeechBubble
                                key={dlg.id}
                                character={dlg.character}
                                text={dlg.text}
                                bubbleType={dlg.bubbleType}
                                avatarColor={
                                  heroSampleComic.characters.find((c) => c.name === dlg.character)
                                    ?.avatarColor
                                }
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Feature Highlights Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-1.5 text-yellow-400 font-bangers text-lg tracking-wider uppercase mb-1">
            <Sparkles className="w-5 h-5" />
            Unleash Comic Superpowers
          </div>
          <h2 className="font-bangers text-4xl sm:text-5xl text-white tracking-wide uppercase drop-shadow-[2px_2px_0px_#000]">
            Everything You Need To Build Comic Books
          </h2>
          <p className="text-slate-400 font-comic text-base max-w-xl mx-auto mt-2">
            From single-sentence brainstorms to full multi-panel graphic adventures.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Feature 1 */}
          <div className="comic-box bg-slate-900 p-6 rounded-2xl flex flex-col justify-between hover:border-yellow-400 transition-colors">
            <div>
              <div className="w-12 h-12 rounded-xl bg-yellow-400 border-2 border-black flex items-center justify-center shadow-[3px_3px_0px_#000] mb-4">
                <Sparkles className="w-6 h-6 text-black stroke-[2.5]" />
              </div>
              <h3 className="font-bangers text-2xl text-yellow-400 tracking-wide mb-2">
                Gemini AI Story Engine
              </h3>
              <p className="text-slate-300 text-sm font-comic leading-relaxed">
                Harness Gemini 3.8 Flash to write structured plots, snappy back-and-forth dialogue,
                cinematic camera angles, and dramatic narration tailored to your tone.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800 text-xs font-mono text-slate-400 flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Structured JSON panel pipeline</span>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="comic-box bg-slate-900 p-6 rounded-2xl flex flex-col justify-between hover:border-cyan-400 transition-colors">
            <div>
              <div className="w-12 h-12 rounded-xl bg-cyan-400 border-2 border-black flex items-center justify-center shadow-[3px_3px_0px_#000] mb-4">
                <Users className="w-6 h-6 text-black stroke-[2.5]" />
              </div>
              <h3 className="font-bangers text-2xl text-cyan-400 tracking-wide mb-2">
                Character Consistency Lab
              </h3>
              <p className="text-slate-300 text-sm font-comic leading-relaxed">
                Design hero and villain profiles with defined appearances, distinct personalities,
                signature abilities, and relationship dynamics that carry across every panel.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800 text-xs font-mono text-slate-400 flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4 text-cyan-400" />
              <span>Preserves traits & visual descriptors</span>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="comic-box bg-slate-900 p-6 rounded-2xl flex flex-col justify-between hover:border-red-400 transition-colors">
            <div>
              <div className="w-12 h-12 rounded-xl bg-red-500 border-2 border-black flex items-center justify-center shadow-[3px_3px_0px_#000] mb-4">
                <Palette className="w-6 h-6 text-white stroke-[2.5]" />
              </div>
              <h3 className="font-bangers text-2xl text-red-400 tracking-wide mb-2">
                7+ Authentic Art Styles
              </h3>
              <p className="text-slate-300 text-sm font-comic leading-relaxed">
                Choose from Modern Superhero inks, Vintage 60s Ben-Day Pop-Art, Manga Noir speed
                lines, Sin City graphic novel shadows, Saturday Morning Cartoon, or Cyberpunk neon.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800 text-xs font-mono text-slate-400 flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4 text-red-400" />
              <span>Pre-calibrated prompts & palettes</span>
            </div>
          </div>

          {/* Feature 4 */}
          <div className="comic-box bg-slate-900 p-6 rounded-2xl flex flex-col justify-between hover:border-purple-400 transition-colors">
            <div>
              <div className="w-12 h-12 rounded-xl bg-purple-500 border-2 border-black flex items-center justify-center shadow-[3px_3px_0px_#000] mb-4">
                <Layers className="w-6 h-6 text-white stroke-[2.5]" />
              </div>
              <h3 className="font-bangers text-2xl text-purple-400 tracking-wide mb-2">
                Live Interactive Comic Editor
              </h3>
              <p className="text-slate-300 text-sm font-comic leading-relaxed">
                Click to edit dialogue directly, toggle speech vs shout vs thought bubbles, swap sound
                effects, reorder panels, or ask Gemini to regenerate individual scenes.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800 text-xs font-mono text-slate-400 flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4 text-purple-400" />
              <span>Director mode & instant redraws</span>
            </div>
          </div>

          {/* Feature 5 */}
          <div className="comic-box bg-slate-900 p-6 rounded-2xl flex flex-col justify-between hover:border-emerald-400 transition-colors">
            <div>
              <div className="w-12 h-12 rounded-xl bg-emerald-400 border-2 border-black flex items-center justify-center shadow-[3px_3px_0px_#000] mb-4">
                <Share2 className="w-6 h-6 text-black stroke-[2.5]" />
              </div>
              <h3 className="font-bangers text-2xl text-emerald-400 tracking-wide mb-2">
                Multi-Format Export
              </h3>
              <p className="text-slate-300 text-sm font-comic leading-relaxed">
                Export high-resolution printable PDF comic books, crisp PNG snapshots, or digital
                comic JSON packages to share with friends, classrooms, or online communities.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800 text-xs font-mono text-slate-400 flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Print-ready layout & Web Share API</span>
            </div>
          </div>

          {/* Feature 6 */}
          <div className="comic-box bg-slate-900 p-6 rounded-2xl flex flex-col justify-between hover:border-orange-400 transition-colors">
            <div>
              <div className="w-12 h-12 rounded-xl bg-orange-400 border-2 border-black flex items-center justify-center shadow-[3px_3px_0px_#000] mb-4">
                <Flame className="w-6 h-6 text-black stroke-[2.5]" />
              </div>
              <h3 className="font-bangers text-2xl text-orange-400 tracking-wide mb-2">
                Immersive Comic Reader
              </h3>
              <p className="text-slate-300 text-sm font-comic leading-relaxed">
                Enjoy your creation in full-screen reader mode with vintage comic cover styling, issue
                numbering, Comics Code seals, and synthesized page-turn sound effects.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800 text-xs font-mono text-slate-400 flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4 text-orange-400" />
              <span>Full-screen cinematic viewing</span>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-900/60 border-y-3 border-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-bangers text-4xl sm:text-5xl text-yellow-400 tracking-wide uppercase drop-shadow-[2px_2px_0px_#000]">
              From Idea To Comic In 4 Steps
            </h2>
            <p className="text-slate-400 font-comic text-base">
              The creative storytelling workflow built for creators of all ages.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="comic-box bg-slate-950 p-5 rounded-xl text-center relative">
              <div className="w-10 h-10 rounded-full bg-yellow-400 text-black font-bangers text-xl flex items-center justify-center mx-auto mb-3 border-2 border-black shadow-[2px_2px_0px_#000]">
                1
              </div>
              <h4 className="font-bangers text-xl text-white mb-1">Enter Your Spark</h4>
              <p className="text-xs text-slate-400 font-comic">
                Write a quick premise or pick an inspiration spark. Choose your genre, tone, and art
                style.
              </p>
            </div>

            <div className="comic-box bg-slate-950 p-5 rounded-xl text-center relative">
              <div className="w-10 h-10 rounded-full bg-cyan-400 text-black font-bangers text-xl flex items-center justify-center mx-auto mb-3 border-2 border-black shadow-[2px_2px_0px_#000]">
                2
              </div>
              <h4 className="font-bangers text-xl text-white mb-1">Gemini AI Directs</h4>
              <p className="text-xs text-slate-400 font-comic">
                Gemini writes character voices, scenes, camera shots, visual prompts, and punchy
                dialogue.
              </p>
            </div>

            <div className="comic-box bg-slate-950 p-5 rounded-xl text-center relative">
              <div className="w-10 h-10 rounded-full bg-red-500 text-white font-bangers text-xl flex items-center justify-center mx-auto mb-3 border-2 border-black shadow-[2px_2px_0px_#000]">
                3
              </div>
              <h4 className="font-bangers text-xl text-white mb-1">Edit & Polish</h4>
              <p className="text-xs text-slate-400 font-comic">
                Tweak speech bubbles, change camera angles, customize sound bursts, or reorder
                panels.
              </p>
            </div>

            <div className="comic-box bg-slate-950 p-5 rounded-xl text-center relative">
              <div className="w-10 h-10 rounded-full bg-emerald-400 text-black font-bangers text-xl flex items-center justify-center mx-auto mb-3 border-2 border-black shadow-[2px_2px_0px_#000]">
                4
              </div>
              <h4 className="font-bangers text-xl text-white mb-1">Read & Export</h4>
              <p className="text-xs text-slate-400 font-comic">
                Read in vintage cover mode, print to high-grade PDF, or download high-res images to
                share.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Community Stories Showcase */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="font-bangers text-3xl sm:text-4xl text-white tracking-wide uppercase">
              Explore Popular Stories
            </h2>
            <p className="text-slate-400 font-comic text-sm">
              Click any story to open in the interactive comic editor and customize.
            </p>
          </div>

          <button
            onClick={onExploreComics}
            className="text-yellow-400 font-bangers text-lg tracking-wider flex items-center gap-1.5 hover:underline"
          >
            <span>View All in Library</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredComics.map((comic) => (
            <div
              key={comic.id}
              onClick={() => onSelectComic(comic)}
              className="comic-box bg-slate-900 rounded-xl overflow-hidden cursor-pointer comic-box-hover group flex flex-col"
            >
              {/* Cover Header */}
              <div className="h-44 relative bg-slate-950 overflow-hidden">
                <ComicPanelVisual
                  panel={comic.panels[0]}
                  artStyle={comic.artStyle}
                  isInteractive={false}
                />
                <div className="absolute top-2 left-2 bg-yellow-400 text-black font-bangers text-xs px-2 py-0.5 rounded border border-black shadow-sm">
                  {comic.genre}
                </div>
                <div className="absolute top-2 right-2 bg-black/80 text-white font-mono text-[10px] px-2 py-0.5 rounded">
                  {comic.panels.length} PANELS
                </div>
              </div>

              {/* Body */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-bangers text-xl text-yellow-400 tracking-wide mb-1 group-hover:text-yellow-300">
                    {comic.title}
                  </h3>
                  <p className="text-xs text-slate-300 font-comic line-clamp-2 leading-relaxed">
                    {comic.summary}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                  <span className="font-sans font-medium">{comic.artStyle}</span>
                  <span className="text-yellow-400 font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    Open <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto mt-6">
        <div className="comic-box-lg bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500 p-6 sm:p-10 rounded-3xl text-black text-center shadow-[8px_8px_0px_#000]">
          <h2 className="font-bangers text-3xl sm:text-5xl uppercase tracking-wider mb-3 leading-tight">
            Ready To Bring Your Story To Life?
          </h2>
          <p className="font-comic text-slate-900 text-sm sm:text-lg max-w-2xl mx-auto mb-6 font-bold">
            All it takes is a spark of imagination. Create your first comic book with Gemini AI in
            seconds.
          </p>
          <button
            onClick={() => {
              comicSound.playFanfare();
              onStartCreating();
            }}
            className="comic-box bg-slate-950 hover:bg-black text-yellow-400 px-8 py-3.5 rounded-xl font-bangers text-xl tracking-wider inline-flex items-center gap-2 transition-transform hover:scale-105"
          >
            <Sparkles className="w-5 h-5 text-yellow-400" />
            <span>Start Creating Now</span>
          </button>
        </div>
      </section>
    </div>
  );
};
