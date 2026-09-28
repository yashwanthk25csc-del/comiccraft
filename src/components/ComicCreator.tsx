import React, { useState } from 'react';
import {
  Sparkles,
  Zap,
  Dice5,
  Users,
  Film,
  Smile,
  Shield,
  Palette,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Flame,
} from 'lucide-react';
import { Character, ComicStory, GenerationRequest } from '../types/comic';
import { GENRES, TONES, ART_STYLES, INSPIRATION_PROMPTS } from '../data/sampleComics';
import { comicSound } from '../utils/comicSound';

interface ComicCreatorProps {
  savedCharacters: Character[];
  onComicGenerated: (comic: ComicStory) => void;
  onCancel: () => void;
  initialPrompt?: string;
  initialGenre?: string;
}

export const ComicCreator: React.FC<ComicCreatorProps> = ({
  savedCharacters,
  onComicGenerated,
  onCancel,
  initialPrompt = '',
  initialGenre = 'Sci-Fi',
}) => {
  const [prompt, setPrompt] = useState(initialPrompt);
  const [genre, setGenre] = useState(initialGenre);
  const [tone, setTone] = useState('Inspirational');
  const [panelCount, setPanelCount] = useState<number>(6);
  const [targetAudience, setTargetAudience] = useState('Teens');
  const [artStyle, setArtStyle] = useState('Modern Superhero Comic');

  // Selected character IDs from saved character roster
  const [selectedCharIds, setSelectedCharIds] = useState<string[]>(
    savedCharacters.slice(0, 2).map((c) => c.id)
  );

  // Custom character quick input
  const [customCharName, setCustomCharName] = useState('');
  const [customCharDesc, setCustomCharDesc] = useState('');

  // Generation status
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStep, setGenerationStep] = useState(0);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const generationSteps = [
    'Sending creative brief to Gemini 3.8 Flash...',
    'Writing character dialogue & comic story beats...',
    'Directing panel staging, camera angles & action cues...',
    'Generating visual art prompts & sound bursts...',
    'Assembling comic book layout...',
  ];

  // Random surprise prompt
  const handleRandomPrompt = () => {
    comicSound.playPop();
    const random = INSPIRATION_PROMPTS[Math.floor(Math.random() * INSPIRATION_PROMPTS.length)];
    setPrompt(random);
  };

  const toggleCharacter = (charId: string) => {
    comicSound.playPop();
    if (selectedCharIds.includes(charId)) {
      setSelectedCharIds(selectedCharIds.filter((id) => id !== charId));
    } else {
      setSelectedCharIds([...selectedCharIds, charId]);
    }
  };

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) {
      setErrorMsg('Please enter a story idea or click "Random Spark"!');
      return;
    }

    setErrorMsg(null);
    setIsGenerating(true);
    setGenerationStep(0);
    comicSound.playPunch();

    // Step cycle animation timer
    const interval = setInterval(() => {
      setGenerationStep((prev) => (prev < generationSteps.length - 1 ? prev + 1 : prev));
    }, 1200);

    try {
      // Gather selected characters
      const chosenCharacters = savedCharacters
        .filter((c) => selectedCharIds.includes(c.id))
        .map((c) => ({
          name: c.name,
          role: c.role,
          appearance: c.appearance,
          personality: c.personality,
          abilities: c.abilities,
        }));

      if (customCharName.trim()) {
        chosenCharacters.push({
          name: customCharName.trim(),
          role: 'Protagonist',
          appearance: customCharDesc.trim() || 'Hero in dynamic costume',
          personality: 'Bold and determined',
          abilities: 'Resourcefulness',
        });
      }

      const payload: GenerationRequest = {
        prompt: prompt.trim(),
        genre,
        tone,
        panelCount,
        targetAudience,
        artStyle,
        characters: chosenCharacters,
      };

      const res = await fetch('/api/generate-comic', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error(`Generation failed with status ${res.status}`);
      }

      const comicData: ComicStory = await res.json();
      clearInterval(interval);
      comicSound.playFanfare();
      onComicGenerated(comicData);
    } catch (err: any) {
      clearInterval(interval);
      setIsGenerating(false);
      setErrorMsg(err?.message || 'Something went wrong while generating with Gemini. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 bg-halftone pb-24 pt-6 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-yellow-400/10 border border-yellow-400/30 text-yellow-400 text-xs font-bold font-mono uppercase mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Gemini Comic Story Generator</span>
        </div>
        <h1 className="font-bangers text-4xl sm:text-6xl text-white tracking-wide uppercase drop-shadow-[3px_3px_0px_#000]">
          Craft Your Comic Adventure
        </h1>
        <p className="text-slate-400 font-comic text-sm sm:text-base max-w-xl mx-auto mt-1">
          Tell Gemini your concept and configure the story parameters below to generate a complete,
          panel-by-panel comic book.
        </p>
      </div>

      {errorMsg && (
        <div className="comic-box bg-red-950/80 border-2 border-red-500 text-red-200 p-4 rounded-xl mb-6 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
          <div className="text-xs font-mono leading-relaxed">
            <strong className="block font-bold">Generation Notice:</strong>
            {errorMsg}
          </div>
        </div>
      )}

      {/* Main Creation Form */}
      <form onSubmit={handleGenerate} className="space-y-8">
        {/* SECTION 1: Story Idea / Premise */}
        <div className="comic-box bg-slate-900 rounded-2xl p-6 border-3 border-black shadow-[4px_4px_0px_#000]">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
            <label className="font-bangers text-xl sm:text-2xl text-yellow-400 tracking-wide flex items-center gap-2">
              <Zap className="w-5 h-5 fill-yellow-400 text-black" />
              1. Story Idea & Core Plot
            </label>

            <button
              type="button"
              onClick={handleRandomPrompt}
              className="comic-box-sm bg-yellow-400/20 hover:bg-yellow-400 hover:text-black text-yellow-400 px-3 py-1 rounded-lg text-xs font-bangers tracking-wider flex items-center gap-1.5 transition-colors"
            >
              <Dice5 className="w-4 h-4" />
              <span>Surprise Me / Random Spark</span>
            </button>
          </div>

          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            rows={4}
            placeholder="e.g. A young inventor discovers a robot buried beneath her grandfather's workshop with a glowing cosmic map inside..."
            className="w-full bg-slate-950 text-slate-100 placeholder:text-slate-500 border-2 border-slate-700 rounded-xl p-4 text-sm font-comic focus:outline-none focus:border-yellow-400 transition-colors leading-relaxed"
            required
          />

          <p className="text-[11px] text-slate-400 font-mono mt-2">
            Tip: Include any key twists, objects, conflicts, or humorous moments you want featured.
          </p>
        </div>

        {/* SECTION 2: Genre & Story Tone */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Genre */}
          <div className="comic-box bg-slate-900 rounded-2xl p-6 border-3 border-black shadow-[4px_4px_0px_#000]">
            <label className="font-bangers text-xl text-cyan-400 tracking-wide flex items-center gap-2 mb-3">
              <Film className="w-5 h-5 text-cyan-400" />
              2. Story Genre
            </label>

            <div className="grid grid-cols-2 gap-2">
              {GENRES.map((g) => (
                <button
                  type="button"
                  key={g}
                  onClick={() => {
                    comicSound.playPop();
                    setGenre(g);
                  }}
                  className={`px-3 py-2 rounded-xl text-xs font-bangers tracking-wider text-left transition-all border-2 ${
                    genre === g
                      ? 'bg-cyan-400 text-black border-black shadow-[2px_2px_0px_#000] scale-[1.02]'
                      : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>

          {/* Tone */}
          <div className="comic-box bg-slate-900 rounded-2xl p-6 border-3 border-black shadow-[4px_4px_0px_#000]">
            <label className="font-bangers text-xl text-yellow-400 tracking-wide flex items-center gap-2 mb-3">
              <Smile className="w-5 h-5 text-yellow-400" />
              3. Story Tone
            </label>

            <div className="grid grid-cols-2 gap-2">
              {TONES.map((t) => (
                <button
                  type="button"
                  key={t}
                  onClick={() => {
                    comicSound.playPop();
                    setTone(t);
                  }}
                  className={`px-3 py-2 rounded-xl text-xs font-bangers tracking-wider text-left transition-all border-2 ${
                    tone === t
                      ? 'bg-yellow-400 text-black border-black shadow-[2px_2px_0px_#000] scale-[1.02]'
                      : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* SECTION 3: Comic Panels & Target Audience */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Panel Count */}
          <div className="comic-box bg-slate-900 rounded-2xl p-6 border-3 border-black shadow-[4px_4px_0px_#000]">
            <label className="font-bangers text-xl text-purple-400 tracking-wide flex items-center gap-2 mb-3">
              <Sparkles className="w-5 h-5 text-purple-400" />
              4. Number of Comic Panels
            </label>

            <div className="grid grid-cols-5 gap-2">
              {[3, 4, 6, 8, 10].map((num) => (
                <button
                  type="button"
                  key={num}
                  onClick={() => {
                    comicSound.playPop();
                    setPanelCount(num);
                  }}
                  className={`py-3 rounded-xl text-center font-bangers text-base tracking-wider border-2 transition-all ${
                    panelCount === num
                      ? 'bg-purple-500 text-white border-black shadow-[2px_2px_0px_#000] scale-105'
                      : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  {num} <span className="block text-[10px] font-mono">Panels</span>
                </button>
              ))}
            </div>
          </div>

          {/* Target Audience */}
          <div className="comic-box bg-slate-900 rounded-2xl p-6 border-3 border-black shadow-[4px_4px_0px_#000]">
            <label className="font-bangers text-xl text-emerald-400 tracking-wide flex items-center gap-2 mb-3">
              <Shield className="w-5 h-5 text-emerald-400" />
              5. Target Audience
            </label>

            <div className="grid grid-cols-2 gap-2">
              {['Kids (All Ages)', 'Teens (PG-13)', 'Young Adults', 'Mature'].map((aud) => (
                <button
                  type="button"
                  key={aud}
                  onClick={() => {
                    comicSound.playPop();
                    setTargetAudience(aud);
                  }}
                  className={`px-3 py-2.5 rounded-xl text-xs font-bangers tracking-wider text-left transition-all border-2 ${
                    targetAudience === aud
                      ? 'bg-emerald-400 text-black border-black shadow-[2px_2px_0px_#000] scale-[1.02]'
                      : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  {aud}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* SECTION 4: Visual Art Style */}
        <div className="comic-box bg-slate-900 rounded-2xl p-6 border-3 border-black shadow-[4px_4px_0px_#000]">
          <label className="font-bangers text-xl sm:text-2xl text-red-400 tracking-wide flex items-center gap-2 mb-3">
            <Palette className="w-5 h-5 text-red-400" />
            6. Visual Art Style
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {ART_STYLES.map((style) => (
              <div
                key={style.id}
                onClick={() => {
                  comicSound.playPop();
                  setArtStyle(style.id);
                }}
                className={`comic-box-sm p-4 rounded-xl cursor-pointer transition-all border-2 ${
                  artStyle === style.id
                    ? 'bg-slate-800 border-yellow-400 shadow-[3px_3px_0px_#FACC15] scale-[1.02]'
                    : 'bg-slate-950 border-slate-800 hover:border-slate-700 text-slate-300'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <h4 className="font-bangers text-lg text-white">{style.name}</h4>
                  <span
                    className="text-[9px] font-mono px-1.5 py-0.5 rounded text-white font-bold"
                    style={{ backgroundColor: style.color }}
                  >
                    {style.previewBadge}
                  </span>
                </div>
                <p className="text-xs text-slate-400 font-comic leading-tight">{style.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 5: Characters Inclusion */}
        <div className="comic-box bg-slate-900 rounded-2xl p-6 border-3 border-black shadow-[4px_4px_0px_#000]">
          <div className="flex items-center justify-between gap-3 mb-3">
            <label className="font-bangers text-xl sm:text-2xl text-cyan-400 tracking-wide flex items-center gap-2">
              <Users className="w-5 h-5 text-cyan-400" />
              7. Include Characters in Story
            </label>
            <span className="text-xs text-slate-400 font-mono">
              Selected: {selectedCharIds.length}
            </span>
          </div>

          <p className="text-xs text-slate-400 font-comic mb-4">
            Select characters from your saved library. Gemini AI will incorporate their appearance,
            role, and personality into the script.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
            {savedCharacters.map((char) => {
              const isSelected = selectedCharIds.includes(char.id);
              return (
                <div
                  key={char.id}
                  onClick={() => toggleCharacter(char.id)}
                  className={`comic-box-sm p-3 rounded-xl cursor-pointer transition-all border-2 flex items-center gap-3 ${
                    isSelected
                      ? 'bg-slate-800 border-cyan-400 shadow-[2px_2px_0px_#06B6D4]'
                      : 'bg-slate-950 border-slate-800 opacity-60 hover:opacity-100'
                  }`}
                >
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center font-bangers text-white border border-black shadow-sm shrink-0"
                    style={{ backgroundColor: char.avatarColor }}
                  >
                    {char.name.charAt(0)}
                  </div>
                  <div className="overflow-hidden flex-1">
                    <h5 className="font-bangers text-sm text-white truncate">{char.name}</h5>
                    <span className="text-[10px] font-mono text-cyan-400 block">{char.role}</span>
                  </div>
                  {isSelected && <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />}
                </div>
              );
            })}
          </div>

          {/* Quick Custom Character */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
            <span className="font-bangers text-sm text-slate-300 block mb-2">
              + Or Add a Quick Character for This Story:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                type="text"
                placeholder="Character Name (e.g. Captain Nova)"
                value={customCharName}
                onChange={(e) => setCustomCharName(e.target.value)}
                className="bg-slate-900 border border-slate-700 text-xs rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-400"
              />
              <input
                type="text"
                placeholder="Appearance / Traits (e.g. cyborg eye, red cape, witty)"
                value={customCharDesc}
                onChange={(e) => setCustomCharDesc(e.target.value)}
                className="bg-slate-900 border border-slate-700 text-xs rounded-lg px-3 py-2 text-white focus:outline-none focus:border-cyan-400"
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-3 rounded-xl border border-slate-700 text-slate-300 hover:bg-slate-800 font-bangers text-base"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={isGenerating}
            className="comic-box bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500 hover:from-yellow-300 hover:to-amber-300 text-black px-8 py-4 rounded-2xl font-bangers text-xl sm:text-2xl tracking-wider flex items-center gap-3 shadow-[6px_6px_0px_#000] active:translate-x-1 active:translate-y-1 transition-all disabled:opacity-50"
          >
            <Sparkles className="w-7 h-7 fill-black" />
            <span>Generate Comic with Gemini</span>
          </button>
        </div>
      </form>

      {/* Generation Progress Modal */}
      {isGenerating && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="comic-box-lg bg-slate-900 border-4 border-black rounded-3xl p-8 max-w-md w-full text-center shadow-[10px_10px_0px_#000] relative overflow-hidden">
            {/* Spinning Comic Icon */}
            <div className="w-20 h-20 rounded-2xl bg-yellow-400 border-3 border-black mx-auto mb-6 flex items-center justify-center shadow-[4px_4px_0px_#000] animate-bounce">
              <Zap className="w-10 h-10 text-black fill-yellow-400 stroke-[2.5]" />
            </div>

            <h3 className="font-bangers text-3xl text-yellow-400 tracking-wide mb-2 uppercase">
              Creating Comic Magic!
            </h3>
            <p className="text-slate-300 font-comic text-sm mb-6">
              Gemini 3.8 Flash is drafting your story, characters, and panels...
            </p>

            {/* Active Step Indicator */}
            <div className="bg-slate-950 rounded-xl p-4 border border-slate-800 mb-6 text-left space-y-2">
              {generationSteps.map((step, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs font-mono">
                  {idx < generationStep ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  ) : idx === generationStep ? (
                    <Sparkles className="w-4 h-4 text-yellow-400 animate-spin shrink-0" />
                  ) : (
                    <div className="w-4 h-4 rounded-full border border-slate-700 shrink-0" />
                  )}
                  <span
                    className={
                      idx === generationStep
                        ? 'text-yellow-300 font-bold'
                        : idx < generationStep
                        ? 'text-slate-400'
                        : 'text-slate-600'
                    }
                  >
                    {step}
                  </span>
                </div>
              ))}
            </div>

            {/* Progress bar */}
            <div className="w-full bg-slate-950 h-3 rounded-full border border-slate-800 overflow-hidden">
              <div
                className="bg-yellow-400 h-full transition-all duration-500"
                style={{
                  width: `${((generationStep + 1) / generationSteps.length) * 100}%`,
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
