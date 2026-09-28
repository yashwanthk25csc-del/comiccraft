import React, { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Maximize2,
  Edit,
  Download,
  Share2,
  BookOpen,
  Volume2,
  Sparkles,
  Flame,
  Check,
} from 'lucide-react';
import { ComicStory } from '../types/comic';
import { ComicPanelVisual } from './ComicPanelVisual';
import { SpeechBubble, NarrationBox, SoundEffectBurst } from './SpeechBubble';
import { comicSound } from '../utils/comicSound';

interface ComicPreviewProps {
  comic: ComicStory;
  onBackToEditor: () => void;
  onExport: () => void;
}

export const ComicPreview: React.FC<ComicPreviewProps> = ({
  comic,
  onBackToEditor,
  onExport,
}) => {
  const [activeTab, setActiveTab] = useState<'reader' | 'cover'>('reader');
  const [copiedLink, setCopiedLink] = useState(false);

  const handleShare = () => {
    comicSound.playPop();
    if (navigator.share) {
      navigator.share({
        title: comic.title,
        text: `Read my AI comic "${comic.title}" created with ComicCraft AI!`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 bg-halftone pb-24 pt-4">
      {/* Top Reader Navigation Bar */}
      <div className="sticky top-[58px] z-30 bg-slate-900/90 backdrop-blur-md border-b-2 border-black px-4 py-2.5 shadow-md">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={() => {
              comicSound.playPop();
              onBackToEditor();
            }}
            className="flex items-center gap-1.5 text-xs font-bangers text-yellow-400 hover:text-yellow-300"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Editor</span>
          </button>

          {/* Reader / Cover Toggle */}
          <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
            <button
              onClick={() => {
                comicSound.playPageTurn();
                setActiveTab('reader');
              }}
              className={`px-3.5 py-1.5 rounded-lg font-bangers tracking-wider flex items-center gap-1.5 ${
                activeTab === 'reader'
                  ? 'bg-yellow-400 text-black border border-black shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Full Comic Reader</span>
            </button>

            <button
              onClick={() => {
                comicSound.playPageTurn();
                setActiveTab('cover');
              }}
              className={`px-3.5 py-1.5 rounded-lg font-bangers tracking-wider flex items-center gap-1.5 ${
                activeTab === 'cover'
                  ? 'bg-yellow-400 text-black border border-black shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Flame className="w-3.5 h-3.5" />
              <span>Vintage Issue Cover</span>
            </button>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="comic-box bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-lg text-xs font-bangers flex items-center gap-1.5 shadow-[2px_2px_0px_#000]"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
              <span>{copiedLink ? 'Link Copied!' : 'Share'}</span>
            </button>

            <button
              onClick={() => {
                comicSound.playPop();
                onExport();
              }}
              className="comic-box bg-yellow-400 hover:bg-yellow-300 text-black px-4 py-1.5 rounded-lg text-xs font-bangers flex items-center gap-1.5 shadow-[2px_2px_0px_#000]"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download & Print</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-6">
        {/* TAB 1: VINTAGE COLLECTOR'S COVER */}
        {activeTab === 'cover' && (
          <div className="max-w-2xl mx-auto">
            <div className="comic-box-lg bg-yellow-400 p-4 sm:p-6 rounded-3xl shadow-[10px_10px_0px_#000] text-black relative overflow-hidden">
              {/* Cover Top Header Badge */}
              <div className="flex items-center justify-between border-b-4 border-black pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <div className="bg-red-600 text-white font-bangers text-xs px-2.5 py-1 rounded border-2 border-black uppercase shadow-sm">
                    ISSUE #{comic.issueNumber || 1} • SPECIAL EDITION
                  </div>
                  <span className="font-bebas text-sm font-bold text-black tracking-wider">
                    75¢ COMIC-CRAFT AI
                  </span>
                </div>

                {/* Vintage Comics Code Stamp */}
                <div className="border-2 border-black bg-white px-2 py-1 rounded text-center shadow-sm">
                  <span className="block font-bangers text-[8px] text-red-600 leading-tight">
                    APPROVED
                  </span>
                  <span className="block font-bangers text-[9px] text-black leading-none">
                    BY THE
                  </span>
                  <span className="block font-bangers text-[8px] text-black leading-tight">
                    AI CODE
                  </span>
                </div>
              </div>

              {/* Huge Comic Title Banner */}
              <div className="text-center my-4">
                <h1 className="font-bangers text-5xl sm:text-7xl text-black tracking-wider uppercase leading-none drop-shadow-[3px_3px_0px_#FFF]">
                  {comic.title}
                </h1>
                <p className="font-bebas text-lg sm:text-xl text-red-600 tracking-wide mt-1 font-bold uppercase">
                  {comic.summary}
                </p>
              </div>

              {/* Cover Central Artwork */}
              <div className="comic-box rounded-2xl overflow-hidden h-96 relative my-4 bg-slate-950">
                <ComicPanelVisual
                  panel={comic.panels[0]}
                  artStyle={comic.artStyle}
                  isInteractive={false}
                />
                <div className="absolute top-4 right-4 z-20">
                  <SoundEffectBurst effect="KABOOM!" />
                </div>
              </div>

              {/* Character Star Highlights */}
              <div className="bg-black/90 text-white p-3 rounded-xl border-2 border-black mb-4 flex flex-wrap items-center justify-around gap-2 text-xs font-mono">
                {comic.characters.map((c) => (
                  <div key={c.id} className="flex items-center gap-1.5">
                    <span
                      className="w-2.5 h-2.5 rounded-full inline-block"
                      style={{ backgroundColor: c.avatarColor }}
                    />
                    <strong className="text-yellow-400">{c.name}</strong>
                    <span className="text-slate-400">({c.role})</span>
                  </div>
                ))}
              </div>

              {/* Cover Footer & Barcode */}
              <div className="flex items-end justify-between pt-2 border-t-3 border-black text-xs font-mono">
                <div>
                  <span className="block font-bold">WRITER: {comic.author || 'Gemini 3.8 AI'}</span>
                  <span className="text-slate-800 text-[11px]">
                    GENRE: {comic.genre} • TONE: {comic.tone}
                  </span>
                </div>

                {/* Simulated Barcode */}
                <div className="bg-white p-1.5 rounded border border-black flex flex-col items-center">
                  <div className="flex gap-[2px] h-7 items-end">
                    {[...Array(24)].map((_, i) => (
                      <div
                        key={i}
                        className="bg-black"
                        style={{
                          width: i % 3 === 0 ? '3px' : '1.5px',
                          height: '100%',
                        }}
                      />
                    ))}
                  </div>
                  <span className="text-[8px] font-mono tracking-widest mt-0.5">0 71486 01942 3</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: FULL COMIC BOOK READER (Page by page spread) */}
        {activeTab === 'reader' && (
          <div className="comic-box-lg bg-white p-4 sm:p-8 rounded-3xl shadow-[10px_10px_0px_#000] text-black">
            {/* Page Header */}
            <div className="flex items-center justify-between border-b-3 border-black pb-3 mb-6 text-xs font-bangers uppercase tracking-wider">
              <span className="text-red-600 text-base">{comic.title}</span>
              <span className="text-slate-600 font-mono">
                {comic.genre} • {comic.artStyle}
              </span>
              <span className="text-slate-800">COMIC-CRAFT AI PRESS</span>
            </div>

            {/* Panels Layout */}
            <div
              className={`grid gap-6 ${
                comic.panels.length <= 4
                  ? 'grid-cols-1 md:grid-cols-2'
                  : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
              }`}
            >
              {comic.panels.map((panel) => (
                <div
                  key={panel.panel_number}
                  className="comic-box bg-slate-950 rounded-2xl overflow-hidden flex flex-col relative group"
                >
                  {/* Panel Number Badge */}
                  <div className="absolute top-2.5 left-2.5 z-20 bg-yellow-400 text-black border-2 border-black rounded px-2.5 py-0.5 font-bangers text-xs shadow-sm">
                    PANEL #{panel.panel_number}
                  </div>

                  {/* Artwork */}
                  <div className="h-60 sm:h-64 w-full relative">
                    <ComicPanelVisual
                      panel={panel}
                      artStyle={comic.artStyle}
                      isInteractive={false}
                    />

                    {panel.sound_effect && (
                      <div className="absolute top-3 right-3 z-20">
                        <SoundEffectBurst
                          effect={panel.sound_effect}
                          onClick={() => comicSound.playPunch()}
                        />
                      </div>
                    )}
                  </div>

                  {/* Dialogue & Narration */}
                  <div className="p-3.5 bg-slate-900 flex-1 flex flex-col justify-between gap-2.5 border-t-3 border-black">
                    {panel.narration && <NarrationBox text={panel.narration} />}

                    <div className="space-y-2 mt-1">
                      {panel.dialogue.map((dlg) => (
                        <SpeechBubble
                          key={dlg.id}
                          character={dlg.character}
                          text={dlg.text}
                          bubbleType={dlg.bubbleType}
                          avatarColor={
                            comic.characters.find((c) => c.name === dlg.character)?.avatarColor
                          }
                        />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Comic End Plaque */}
            <div className="mt-8 pt-6 border-t-3 border-black text-center font-bangers">
              <span className="inline-block bg-black text-yellow-400 px-6 py-2 rounded-xl text-xl tracking-wider">
                — TO BE CONTINUED IN ISSUE #2 —
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
