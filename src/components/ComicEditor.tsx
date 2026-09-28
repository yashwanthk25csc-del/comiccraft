import React, { useState } from 'react';
import {
  Sparkles,
  Plus,
  Trash2,
  ArrowLeft,
  ArrowRight,
  MoveUp,
  MoveDown,
  RefreshCw,
  Eye,
  Download,
  Share2,
  Palette,
  MessageSquare,
  Layers,
  Settings,
  Upload,
  Check,
  Film,
  Zap,
} from 'lucide-react';
import { ComicStory, ComicPanel, Dialogue, BubbleType, CameraAngle } from '../types/comic';
import { ComicPanelVisual } from './ComicPanelVisual';
import { SpeechBubble, NarrationBox, SoundEffectBurst } from './SpeechBubble';
import { ART_STYLES } from '../data/sampleComics';
import { comicSound } from '../utils/comicSound';

interface ComicEditorProps {
  comic: ComicStory;
  onUpdateComic: (updated: ComicStory) => void;
  onPreview: () => void;
  onExport: () => void;
}

export const ComicEditor: React.FC<ComicEditorProps> = ({
  comic,
  onUpdateComic,
  onPreview,
  onExport,
}) => {
  const [activePanelIdx, setActivePanelIdx] = useState<number>(0);
  const [viewMode, setViewMode] = useState<'spread' | 'director' | 'webtoon'>('spread');
  const [isEditingInline, setIsEditingInline] = useState(false);

  // Regeneration state
  const [showRegenModal, setShowRegenModal] = useState(false);
  const [regenPanelIdx, setRegenPanelIdx] = useState<number>(0);
  const [regenInstruction, setRegenInstruction] = useState('');
  const [isRegenerating, setIsRegenerating] = useState(false);

  const currentPanel = comic.panels[activePanelIdx] || comic.panels[0];

  // Comic sound effects library
  const soundEffects = ['BOOM!', 'POW!', 'KABOOM!', 'ZAP!', 'WHOOSH!', 'CRASH!', 'CLANG!', 'BZZZT!', 'CREEEAK!'];

  // Change Comic Title
  const handleTitleChange = (newTitle: string) => {
    onUpdateComic({
      ...comic,
      title: newTitle,
      updatedAt: new Date().toISOString(),
    });
  };

  // Change Art Style
  const handleArtStyleChange = (styleName: string) => {
    comicSound.playPop();
    onUpdateComic({
      ...comic,
      artStyle: styleName,
      updatedAt: new Date().toISOString(),
    });
  };

  // Move Panel Left/Up
  const handleMovePanel = (index: number, direction: 'prev' | 'next') => {
    comicSound.playPop();
    const newPanels = [...comic.panels];
    const targetIdx = direction === 'prev' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= newPanels.length) return;

    const temp = newPanels[index];
    newPanels[index] = newPanels[targetIdx];
    newPanels[targetIdx] = temp;

    // Re-index panel numbers
    const updated = newPanels.map((p, i) => ({ ...p, panel_number: i + 1 }));
    onUpdateComic({ ...comic, panels: updated, updatedAt: new Date().toISOString() });
    setActivePanelIdx(targetIdx);
  };

  // Delete Panel
  const handleDeletePanel = (index: number) => {
    if (comic.panels.length <= 1) return;
    comicSound.playPop();
    const updated = comic.panels
      .filter((_, i) => i !== index)
      .map((p, i) => ({ ...p, panel_number: i + 1 }));

    onUpdateComic({ ...comic, panels: updated, updatedAt: new Date().toISOString() });
    setActivePanelIdx(Math.max(0, index - 1));
  };

  // Add New Panel
  const handleAddPanel = () => {
    comicSound.playPop();
    const newNumber = comic.panels.length + 1;
    const newPanel: ComicPanel = {
      panel_number: newNumber,
      scene_description: 'A dramatic new twist as the heroes regroup.',
      characters: comic.characters.slice(0, 2).map((c) => c.name),
      action: 'The characters formulate their next bold move.',
      dialogue: [
        {
          id: `dlg-${newNumber}-1`,
          character: comic.characters[0]?.name || 'Hero',
          text: 'We cannot give up now!',
          bubbleType: 'speech',
        },
      ],
      narration: 'The tension rose as the countdown ticked away...',
      image_prompt: `${comic.artStyle} comic panel: Dramatic medium shot of heroes strategizing under glowing lights.`,
      sound_effect: 'WHOOSH!',
      camera_angle: 'Medium Shot',
      theme_color: '#F59E0B',
    };

    onUpdateComic({
      ...comic,
      panels: [...comic.panels, newPanel],
      updatedAt: new Date().toISOString(),
    });
    setActivePanelIdx(comic.panels.length);
  };

  // Update specific panel field
  const handleUpdatePanel = (panelIdx: number, updates: Partial<ComicPanel>) => {
    const updatedPanels = comic.panels.map((p, i) => (i === panelIdx ? { ...p, ...updates } : p));
    onUpdateComic({ ...comic, panels: updatedPanels, updatedAt: new Date().toISOString() });
  };

  // Add Dialogue to Panel
  const handleAddDialogue = (panelIdx: number) => {
    comicSound.playPop();
    const panel = comic.panels[panelIdx];
    const newDialogue: Dialogue = {
      id: `dlg-${panelIdx + 1}-${Date.now()}`,
      character: comic.characters[0]?.name || 'Hero',
      text: 'New dialogue line here...',
      bubbleType: 'speech',
    };
    handleUpdatePanel(panelIdx, {
      dialogue: [...panel.dialogue, newDialogue],
    });
  };

  // Update specific dialogue
  const handleUpdateDialogue = (
    panelIdx: number,
    dlgIdx: number,
    updates: Partial<Dialogue>
  ) => {
    const panel = comic.panels[panelIdx];
    const updatedDialogue = panel.dialogue.map((d, i) =>
      i === dlgIdx ? { ...d, ...updates } : d
    );
    handleUpdatePanel(panelIdx, { dialogue: updatedDialogue });
  };

  // Delete dialogue
  const handleDeleteDialogue = (panelIdx: number, dlgIdx: number) => {
    comicSound.playPop();
    const panel = comic.panels[panelIdx];
    const updatedDialogue = panel.dialogue.filter((_, i) => i !== dlgIdx);
    handleUpdatePanel(panelIdx, { dialogue: updatedDialogue });
  };

  // Regenerate panel with Gemini
  const handleRegeneratePanel = async () => {
    setIsRegenerating(true);
    comicSound.playPunch();

    try {
      const panel = comic.panels[regenPanelIdx];
      const res = await fetch('/api/regenerate-panel', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          comicTitle: comic.title,
          characters: comic.characters,
          panelNumber: panel.panel_number,
          userInstruction: regenInstruction,
          currentPanel: panel,
          artStyle: comic.artStyle,
        }),
      });

      if (!res.ok) throw new Error('Regeneration failed');
      const regeneratedPanel: ComicPanel = await res.json();

      const updatedPanels = comic.panels.map((p, i) =>
        i === regenPanelIdx ? { ...regeneratedPanel, panel_number: p.panel_number } : p
      );

      onUpdateComic({ ...comic, panels: updatedPanels, updatedAt: new Date().toISOString() });
      setShowRegenModal(false);
      setRegenInstruction('');
      comicSound.playFanfare();
    } catch {
      alert('Panel regeneration fallback applied.');
    } finally {
      setIsRegenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 bg-halftone pb-24">
      {/* Top Editor Toolbar */}
      <div className="sticky top-[58px] z-30 bg-slate-900/95 backdrop-blur-md border-b-2 border-black px-4 py-2.5 shadow-md">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          {/* Comic Title Input */}
          <div className="flex items-center gap-3 flex-1 min-w-[240px]">
            <input
              type="text"
              value={comic.title}
              onChange={(e) => handleTitleChange(e.target.value)}
              className="bg-transparent font-bangers text-2xl sm:text-3xl text-yellow-400 tracking-wide focus:outline-none focus:bg-slate-950 px-2 py-0.5 rounded border border-transparent hover:border-slate-700 focus:border-yellow-400 max-w-md w-full"
              placeholder="Comic Title..."
            />
            <span className="text-xs font-mono text-slate-400 hidden sm:inline">
              Issue #{comic.issueNumber || 1}
            </span>
          </div>

          {/* View Modes & Action Buttons */}
          <div className="flex items-center gap-2">
            {/* View Mode Toggle */}
            <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
              <button
                onClick={() => setViewMode('spread')}
                className={`px-3 py-1 rounded-lg font-bangers tracking-wider ${
                  viewMode === 'spread'
                    ? 'bg-yellow-400 text-black border border-black shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Page Spread
              </button>
              <button
                onClick={() => setViewMode('director')}
                className={`px-3 py-1 rounded-lg font-bangers tracking-wider ${
                  viewMode === 'director'
                    ? 'bg-yellow-400 text-black border border-black shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Director Studio
              </button>
              <button
                onClick={() => setViewMode('webtoon')}
                className={`px-3 py-1 rounded-lg font-bangers tracking-wider ${
                  viewMode === 'webtoon'
                    ? 'bg-yellow-400 text-black border border-black shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Vertical Strip
              </button>
            </div>

            {/* Inline Editing Toggle */}
            <button
              onClick={() => setIsEditingInline(!isEditingInline)}
              className={`comic-box-sm px-3 py-1.5 rounded-lg text-xs font-bangers tracking-wider transition-colors ${
                isEditingInline
                  ? 'bg-cyan-400 text-black'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {isEditingInline ? 'Done Editing' : 'Edit Text In-Place'}
            </button>

            {/* Preview Button */}
            <button
              onClick={() => {
                comicSound.playPageTurn();
                onPreview();
              }}
              className="comic-box bg-slate-800 hover:bg-slate-700 text-white px-3.5 py-1.5 rounded-lg text-xs font-bangers tracking-wider flex items-center gap-1.5 shadow-[2px_2px_0px_#000]"
            >
              <Eye className="w-3.5 h-3.5 text-yellow-400" />
              <span>Full Reader</span>
            </button>

            {/* Export Button */}
            <button
              onClick={() => {
                comicSound.playPop();
                onExport();
              }}
              className="comic-box bg-yellow-400 hover:bg-yellow-300 text-black px-3.5 py-1.5 rounded-lg text-xs font-bangers tracking-wider flex items-center gap-1.5 shadow-[2px_2px_0px_#000]"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {/* VIEW MODE 1: PAGE SPREAD (Authentic Comic Book Layout) */}
        {viewMode === 'spread' && (
          <div>
            {/* Comic Book Page Container */}
            <div className="comic-box-lg bg-white p-3 sm:p-5 rounded-2xl shadow-[8px_8px_0px_#000] text-black">
              {/* Comic Page Header */}
              <div className="flex items-center justify-between border-b-3 border-black pb-2 mb-4 text-xs font-bangers uppercase tracking-wider">
                <span className="text-red-600 text-sm">{comic.title}</span>
                <span className="text-slate-600 font-mono">
                  PAGE 1 OF 1 • ART STYLE: {comic.artStyle}
                </span>
                <span className="text-slate-800">COMIC-CRAFT AI PRESS</span>
              </div>

              {/* Dynamic Panels Grid */}
              <div
                className={`grid gap-4 ${
                  comic.panels.length <= 4
                    ? 'grid-cols-1 md:grid-cols-2'
                    : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                }`}
              >
                {comic.panels.map((panel, idx) => (
                  <div
                    key={panel.panel_number}
                    className={`comic-box bg-slate-950 rounded-xl overflow-hidden flex flex-col relative transition-all ${
                      activePanelIdx === idx ? 'ring-4 ring-yellow-400' : ''
                    }`}
                  >
                    {/* Panel Staging Controls Bar */}
                    <div className="bg-slate-900 border-b-2 border-black p-2 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <span className="bg-yellow-400 text-black px-2 py-0.5 rounded font-bangers text-xs border border-black shadow-sm">
                          PANEL #{panel.panel_number}
                        </span>
                        <span className="text-[10px] font-mono text-cyan-400">
                          {panel.camera_angle}
                        </span>
                      </div>

                      {/* Mini Toolbar */}
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => {
                            setRegenPanelIdx(idx);
                            setShowRegenModal(true);
                          }}
                          className="p-1 rounded bg-slate-800 hover:bg-yellow-400 hover:text-black text-slate-300 text-[10px] flex items-center gap-1 transition-colors"
                          title="Regenerate with Gemini"
                        >
                          <RefreshCw className="w-3 h-3" />
                          <span className="hidden sm:inline">AI Redraw</span>
                        </button>

                        <button
                          disabled={idx === 0}
                          onClick={() => handleMovePanel(idx, 'prev')}
                          className="p-1 text-slate-400 hover:text-white disabled:opacity-30"
                          title="Move Left"
                        >
                          <ArrowLeft className="w-3.5 h-3.5" />
                        </button>
                        <button
                          disabled={idx === comic.panels.length - 1}
                          onClick={() => handleMovePanel(idx, 'next')}
                          className="p-1 text-slate-400 hover:text-white disabled:opacity-30"
                          title="Move Right"
                        >
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeletePanel(idx)}
                          className="p-1 text-slate-400 hover:text-red-400"
                          title="Delete Panel"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Artwork Visual Viewport */}
                    <div className="h-56 sm:h-64 w-full relative">
                      <ComicPanelVisual
                        panel={panel}
                        artStyle={comic.artStyle}
                        onUpdateImage={(imgUrl) =>
                          handleUpdatePanel(idx, { custom_image: imgUrl })
                        }
                      />

                      {/* Action Sound Effect Burst */}
                      {panel.sound_effect && (
                        <div className="absolute top-3 right-3 z-20">
                          <SoundEffectBurst
                            effect={panel.sound_effect}
                            onClick={() => comicSound.playPunch()}
                          />
                        </div>
                      )}
                    </div>

                    {/* Dialogue & Narration Layer */}
                    <div className="p-3 bg-slate-900 flex-1 flex flex-col justify-between gap-2.5 border-t-2 border-black">
                      {/* Narration caption */}
                      {(panel.narration || isEditingInline) && (
                        <NarrationBox
                          text={panel.narration}
                          isEditing={isEditingInline}
                          onTextChange={(val) => handleUpdatePanel(idx, { narration: val })}
                        />
                      )}

                      {/* Dialogue bubbles list */}
                      <div className="space-y-2 mt-1">
                        {panel.dialogue.map((dlg, dIdx) => (
                          <div key={dlg.id} className="relative group">
                            <SpeechBubble
                              character={dlg.character}
                              text={dlg.text}
                              bubbleType={dlg.bubbleType}
                              avatarColor={
                                comic.characters.find((c) => c.name === dlg.character)?.avatarColor
                              }
                              isEditing={isEditingInline}
                              onTextChange={(val) =>
                                handleUpdateDialogue(idx, dIdx, { text: val })
                              }
                            />

                            {/* Dialogue edit controls if in edit mode */}
                            {isEditingInline && (
                              <div className="flex items-center gap-1 mt-1 ml-2 text-[10px]">
                                <select
                                  value={dlg.bubbleType}
                                  onChange={(e) =>
                                    handleUpdateDialogue(idx, dIdx, {
                                      bubbleType: e.target.value as BubbleType,
                                    })
                                  }
                                  className="bg-slate-800 text-white rounded px-1.5 py-0.5 border border-slate-700"
                                >
                                  <option value="speech">Speech Bubble</option>
                                  <option value="thought">Thought Bubble</option>
                                  <option value="shout">Shout Bubble</option>
                                  <option value="whisper">Whisper Bubble</option>
                                  <option value="radio">Radio/Comm Bubble</option>
                                </select>

                                <select
                                  value={dlg.character}
                                  onChange={(e) =>
                                    handleUpdateDialogue(idx, dIdx, {
                                      character: e.target.value,
                                    })
                                  }
                                  className="bg-slate-800 text-white rounded px-1.5 py-0.5 border border-slate-700"
                                >
                                  {comic.characters.map((c) => (
                                    <option key={c.id} value={c.name}>
                                      {c.name}
                                    </option>
                                  ))}
                                  <option value="Narrator">Narrator</option>
                                </select>

                                <button
                                  onClick={() => handleDeleteDialogue(idx, dIdx)}
                                  className="text-red-400 hover:text-red-300 px-1"
                                >
                                  Remove
                                </button>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>

                      {/* Quick Add Dialogue Button */}
                      {isEditingInline && (
                        <button
                          onClick={() => handleAddDialogue(idx)}
                          className="text-[11px] text-cyan-400 hover:text-cyan-300 font-bold flex items-center gap-1 mt-1"
                        >
                          <Plus className="w-3 h-3" /> Add Dialogue
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Add New Panel Button at Bottom */}
              <div className="mt-6 flex justify-center">
                <button
                  onClick={handleAddPanel}
                  className="comic-box bg-yellow-400 hover:bg-yellow-300 text-black px-6 py-2.5 rounded-xl font-bangers text-base tracking-wider flex items-center gap-2 shadow-[3px_3px_0px_#000]"
                >
                  <Plus className="w-5 h-5 stroke-[2.5]" />
                  <span>Add New Panel</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* VIEW MODE 2: DIRECTOR STUDIO (Panel by panel deep editor) */}
        {viewMode === 'director' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Panel Selector Thumbnails (Left Column) */}
            <div className="lg:col-span-3 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <h3 className="font-bangers text-xl text-yellow-400 tracking-wide">
                  Panels ({comic.panels.length})
                </h3>
                <button
                  onClick={handleAddPanel}
                  className="comic-box-sm bg-yellow-400 text-black px-2.5 py-1 rounded text-xs font-bangers flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" /> Add
                </button>
              </div>

              <div className="space-y-2 max-h-[75vh] overflow-y-auto pr-1">
                {comic.panels.map((p, idx) => (
                  <div
                    key={p.panel_number}
                    onClick={() => setActivePanelIdx(idx)}
                    className={`comic-box p-3 rounded-xl cursor-pointer transition-all flex items-center gap-3 ${
                      activePanelIdx === idx
                        ? 'bg-slate-800 border-yellow-400 shadow-[3px_3px_0px_#FACC15]'
                        : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="w-10 h-10 rounded-lg bg-yellow-400 text-black font-bangers text-lg flex items-center justify-center shrink-0 border border-black shadow-sm">
                      #{p.panel_number}
                    </div>
                    <div className="flex-1 overflow-hidden">
                      <span className="font-mono text-[10px] text-cyan-400 block truncate">
                        {p.camera_angle} • {p.sound_effect || 'No SFX'}
                      </span>
                      <p className="text-xs text-slate-300 font-comic line-clamp-1">
                        {p.action || p.scene_description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Active Panel Deep Director (Right Column) */}
            <div className="lg:col-span-9">
              {currentPanel && (
                <div className="comic-box-lg bg-slate-900 rounded-2xl p-6 border-3 border-black shadow-[6px_6px_0px_#000] space-y-6">
                  {/* Director Header */}
                  <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
                    <div className="flex items-center gap-3">
                      <span className="px-3 py-1 rounded-lg bg-yellow-400 text-black font-bangers text-lg border-2 border-black shadow-sm">
                        PANEL #{currentPanel.panel_number} DIRECTOR
                      </span>
                      <span className="text-xs font-mono text-slate-400">
                        {currentPanel.characters.join(', ')}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setRegenPanelIdx(activePanelIdx);
                          setShowRegenModal(true);
                        }}
                        className="comic-box bg-gradient-to-r from-yellow-400 to-amber-500 text-black px-3.5 py-1.5 rounded-lg font-bangers text-sm flex items-center gap-1.5"
                      >
                        <RefreshCw className="w-4 h-4" />
                        <span>Regenerate with Gemini</span>
                      </button>

                      <button
                        onClick={() => handleDeletePanel(activePanelIdx)}
                        className="p-2 text-slate-400 hover:text-red-400 rounded hover:bg-slate-800"
                        title="Delete Panel"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Panel Artwork Preview & Scene Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="h-64 rounded-xl overflow-hidden comic-box relative">
                      <ComicPanelVisual
                        panel={currentPanel}
                        artStyle={comic.artStyle}
                        onUpdateImage={(imgUrl) =>
                          handleUpdatePanel(activePanelIdx, { custom_image: imgUrl })
                        }
                      />
                      {currentPanel.sound_effect && (
                        <div className="absolute top-3 right-3 z-20">
                          <SoundEffectBurst
                            effect={currentPanel.sound_effect}
                            onClick={() => comicSound.playPunch()}
                          />
                        </div>
                      )}
                    </div>

                    {/* Camera Angle & SFX Controls */}
                    <div className="space-y-4">
                      {/* Camera Angle */}
                      <div>
                        <label className="text-xs font-mono text-cyan-400 block mb-1 uppercase font-bold">
                          Camera Angle:
                        </label>
                        <select
                          value={currentPanel.camera_angle}
                          onChange={(e) =>
                            handleUpdatePanel(activePanelIdx, {
                              camera_angle: e.target.value as CameraAngle,
                            })
                          }
                          className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-yellow-400"
                        >
                          <option value="Close-up">Close-up</option>
                          <option value="Medium Shot">Medium Shot</option>
                          <option value="Wide Angle">Wide Angle</option>
                          <option value="Bird's Eye">Bird's Eye</option>
                          <option value="Low Angle">Low Angle</option>
                          <option value="Dramatic Dutch Angle">Dramatic Dutch Angle</option>
                          <option value="Over-the-Shoulder">Over-the-Shoulder</option>
                        </select>
                      </div>

                      {/* Sound Effect Selector */}
                      <div>
                        <label className="text-xs font-mono text-yellow-400 block mb-1 uppercase font-bold">
                          Comic Sound Effect (SFX):
                        </label>
                        <div className="flex gap-2">
                          <select
                            value={currentPanel.sound_effect || ''}
                            onChange={(e) =>
                              handleUpdatePanel(activePanelIdx, { sound_effect: e.target.value })
                            }
                            className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-yellow-400"
                          >
                            <option value="">None</option>
                            {soundEffects.map((sfx) => (
                              <option key={sfx} value={sfx}>
                                {sfx}
                              </option>
                            ))}
                          </select>
                          <input
                            type="text"
                            placeholder="Or custom SFX..."
                            value={currentPanel.sound_effect || ''}
                            onChange={(e) =>
                              handleUpdatePanel(activePanelIdx, { sound_effect: e.target.value })
                            }
                            className="w-36 bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                          />
                        </div>
                      </div>

                      {/* Scene Description */}
                      <div>
                        <label className="text-xs font-mono text-slate-400 block mb-1 uppercase font-bold">
                          Visual Scene Description:
                        </label>
                        <textarea
                          rows={3}
                          value={currentPanel.scene_description}
                          onChange={(e) =>
                            handleUpdatePanel(activePanelIdx, {
                              scene_description: e.target.value,
                            })
                          }
                          className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs text-slate-200 focus:outline-none focus:border-yellow-400 font-comic leading-relaxed"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Narration Editor */}
                  <div>
                    <label className="text-xs font-mono text-yellow-400 block mb-1 uppercase font-bold">
                      Narration Box (Yellow Header Caption):
                    </label>
                    <input
                      type="text"
                      value={currentPanel.narration}
                      onChange={(e) =>
                        handleUpdatePanel(activePanelIdx, { narration: e.target.value })
                      }
                      placeholder="e.g. Meanwhile, forty miles beyond the city walls..."
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-yellow-400 font-comic"
                    />
                  </div>

                  {/* Dialogue Manager */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <label className="text-xs font-mono text-cyan-400 uppercase font-bold">
                        Dialogue & Speech Bubbles ({currentPanel.dialogue.length})
                      </label>
                      <button
                        onClick={() => handleAddDialogue(activePanelIdx)}
                        className="comic-box-sm bg-cyan-400 text-black px-3 py-1 rounded-lg text-xs font-bangers flex items-center gap-1"
                      >
                        <Plus className="w-3.5 h-3.5" /> Add Dialogue
                      </button>
                    </div>

                    <div className="space-y-3">
                      {currentPanel.dialogue.map((dlg, dIdx) => (
                        <div
                          key={dlg.id}
                          className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2"
                        >
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <div className="flex items-center gap-2">
                              {/* Character Speaker */}
                              <select
                                value={dlg.character}
                                onChange={(e) =>
                                  handleUpdateDialogue(activePanelIdx, dIdx, {
                                    character: e.target.value,
                                  })
                                }
                                className="bg-slate-900 border border-slate-700 text-xs text-white rounded-lg px-2.5 py-1"
                              >
                                {comic.characters.map((c) => (
                                  <option key={c.id} value={c.name}>
                                    {c.name}
                                  </option>
                                ))}
                                <option value="Unknown">Unknown Speaker</option>
                              </select>

                              {/* Bubble Type */}
                              <select
                                value={dlg.bubbleType}
                                onChange={(e) =>
                                  handleUpdateDialogue(activePanelIdx, dIdx, {
                                    bubbleType: e.target.value as BubbleType,
                                  })
                                }
                                className="bg-slate-900 border border-slate-700 text-xs text-yellow-400 rounded-lg px-2.5 py-1 font-mono"
                              >
                                <option value="speech">Speech Bubble</option>
                                <option value="thought">Thought Bubble</option>
                                <option value="shout">Shout / Scream</option>
                                <option value="whisper">Whisper</option>
                                <option value="radio">Radio / Communicator</option>
                              </select>
                            </div>

                            <button
                              onClick={() => handleDeleteDialogue(activePanelIdx, dIdx)}
                              className="text-xs text-red-400 hover:text-red-300 font-bold"
                            >
                              Delete
                            </button>
                          </div>

                          <textarea
                            rows={2}
                            value={dlg.text}
                            onChange={(e) =>
                              handleUpdateDialogue(activePanelIdx, dIdx, { text: e.target.value })
                            }
                            className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-yellow-400 font-comic"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* VIEW MODE 3: VERTICAL WEBTOON STRIP (Seamless scroll) */}
        {viewMode === 'webtoon' && (
          <div className="max-w-xl mx-auto space-y-4">
            <div className="text-center pb-2">
              <span className="font-mono text-xs text-slate-400">
                Webtoon Infinite Scroll Mode • {comic.panels.length} Continuous Panels
              </span>
            </div>

            {comic.panels.map((panel) => (
              <div
                key={panel.panel_number}
                className="comic-box bg-slate-950 rounded-2xl overflow-hidden border-4 border-black shadow-[6px_6px_0px_#000]"
              >
                <div className="h-72 w-full relative">
                  <ComicPanelVisual
                    panel={panel}
                    artStyle={comic.artStyle}
                    isInteractive={false}
                  />
                  {panel.sound_effect && (
                    <div className="absolute top-4 right-4 z-20">
                      <SoundEffectBurst
                        effect={panel.sound_effect}
                        onClick={() => comicSound.playPunch()}
                      />
                    </div>
                  )}
                </div>

                <div className="p-4 bg-slate-900/95 space-y-3 border-t-3 border-black">
                  {panel.narration && <NarrationBox text={panel.narration} />}

                  <div className="space-y-2">
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
        )}
      </div>

      {/* Modal: Regenerate Panel with Gemini */}
      {showRegenModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm">
          <div className="comic-box-lg bg-slate-900 border-4 border-black rounded-3xl p-6 max-w-lg w-full shadow-[8px_8px_0px_#000]">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-yellow-400" />
                <h3 className="font-bangers text-2xl text-yellow-400 tracking-wide">
                  Regenerate Panel #{comic.panels[regenPanelIdx]?.panel_number} with Gemini
                </h3>
              </div>
              <button
                onClick={() => setShowRegenModal(false)}
                className="text-slate-400 hover:text-white font-bold"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-300 font-comic mb-4">
              Direct Gemini to revise the dialogue, increase the action intensity, shift the camera
              angle, or introduce an unexpected plot element.
            </p>

            <textarea
              rows={4}
              placeholder="e.g. Make this panel an explosive showdown where Sparky uses his energy shield to deflect lasers from Baron Vance!"
              value={regenInstruction}
              onChange={(e) => setRegenInstruction(e.target.value)}
              className="w-full bg-slate-950 border-2 border-slate-700 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-yellow-400 mb-6 font-comic"
            />

            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() => setShowRegenModal(false)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-400 hover:bg-slate-800"
              >
                Cancel
              </button>
              <button
                onClick={handleRegeneratePanel}
                disabled={isRegenerating}
                className="comic-box bg-yellow-400 hover:bg-yellow-300 text-black px-5 py-2.5 rounded-xl font-bangers text-base tracking-wider flex items-center gap-2 disabled:opacity-50"
              >
                <Sparkles className="w-4 h-4" />
                <span>{isRegenerating ? 'Generating...' : 'Redraw with Gemini'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
