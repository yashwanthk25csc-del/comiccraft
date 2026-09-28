import React, { useState } from 'react';
import {
  PlusCircle,
  Search,
  BookOpen,
  Users,
  Clock,
  Sparkles,
  Trash2,
  Copy,
  ExternalLink,
  SlidersHorizontal,
  Bookmark,
  ChevronRight,
  Flame,
} from 'lucide-react';
import { ComicStory, Character } from '../types/comic';
import { ComicPanelVisual } from './ComicPanelVisual';
import { GENRES, INSPIRATION_PROMPTS } from '../data/sampleComics';
import { comicSound } from '../utils/comicSound';

interface DashboardProps {
  comics: ComicStory[];
  characters: Character[];
  onSelectComic: (comic: ComicStory) => void;
  onCreateNew: (initialPrompt?: string, genre?: string) => void;
  onDeleteComic: (comicId: string) => void;
  onDuplicateComic: (comic: ComicStory) => void;
  onManageCharacters: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  comics,
  characters,
  onSelectComic,
  onCreateNew,
  onDeleteComic,
  onDuplicateComic,
  onManageCharacters,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState<string>('All');
  const [activeTab, setActiveTab] = useState<'comics' | 'characters' | 'templates'>('comics');

  const filteredComics = comics.filter((comic) => {
    const matchesSearch =
      comic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      comic.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      comic.genre.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGenre = selectedGenre === 'All' || comic.genre === selectedGenre;
    return matchesSearch && matchesGenre;
  });

  const formatDate = (isoString: string) => {
    try {
      const d = new Date(isoString);
      return d.toLocaleDateString(undefined, {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
    } catch {
      return 'Recent';
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 bg-halftone pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pt-6">
      {/* Dashboard Creator Banner */}
      <div className="comic-box bg-slate-900 rounded-2xl p-6 sm:p-8 mb-8 border-3 border-black relative overflow-hidden">
        {/* Background decorative comic burst */}
        <div className="absolute -right-10 -bottom-10 opacity-10 pointer-events-none">
          <Sparkles className="w-80 h-80 text-yellow-400" />
        </div>

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            {/* User Profile Avatar */}
            <div className="relative">
              <div className="w-16 h-16 rounded-2xl bg-yellow-400 border-3 border-black flex items-center justify-center shadow-[4px_4px_0px_#000]">
                <Flame className="w-9 h-9 text-black fill-yellow-400" />
              </div>
              <span className="absolute -bottom-1 -right-1 bg-red-500 text-white font-mono text-[10px] font-bold px-1.5 py-0.2 rounded border border-black">
                PRO
              </span>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-bangers text-3xl sm:text-4xl text-white tracking-wide">
                  Comic Studio Dashboard
                </h1>
              </div>
              <p className="text-slate-400 text-xs sm:text-sm font-comic">
                Manage your stories, character roster, and creative ideas.
              </p>
            </div>
          </div>

          {/* Quick Metrics & New Comic CTA */}
          <div className="flex flex-wrap items-center gap-4 w-full md:w-auto">
            <div className="flex items-center gap-3 bg-slate-950 px-4 py-2 rounded-xl border border-slate-800">
              <div className="text-center">
                <span className="font-bangers text-xl text-yellow-400 block">{comics.length}</span>
                <span className="text-[10px] text-slate-400 uppercase font-mono">Comics</span>
              </div>
              <div className="h-6 w-px bg-slate-800" />
              <div className="text-center">
                <span className="font-bangers text-xl text-cyan-400 block">
                  {characters.length}
                </span>
                <span className="text-[10px] text-slate-400 uppercase font-mono">Characters</span>
              </div>
              <div className="h-6 w-px bg-slate-800" />
              <div className="text-center">
                <span className="font-bangers text-xl text-emerald-400 block">
                  {comics.reduce((acc, c) => acc + c.panels.length, 0)}
                </span>
                <span className="text-[10px] text-slate-400 uppercase font-mono">Panels</span>
              </div>
            </div>

            <button
              onClick={() => {
                comicSound.playFanfare();
                onCreateNew();
              }}
              className="comic-box bg-yellow-400 hover:bg-yellow-300 text-black px-5 py-2.5 rounded-xl font-bangers text-base tracking-wider flex items-center gap-2 shadow-[3px_3px_0px_#000] transition-all flex-1 md:flex-none justify-center"
            >
              <PlusCircle className="w-5 h-5 stroke-[2.5]" />
              <span>Create New Comic</span>
            </button>
          </div>
        </div>
      </div>

      {/* Tabs Filter Bar (Comics, Characters, Templates) */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-2 bg-slate-900 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setActiveTab('comics')}
            className={`px-4 py-1.5 rounded-lg font-bangers text-sm tracking-wider flex items-center gap-1.5 transition-all ${
              activeTab === 'comics'
                ? 'bg-yellow-400 text-black border-2 border-black shadow-[2px_2px_0px_#000]'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Recent Comics ({comics.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('characters')}
            className={`px-4 py-1.5 rounded-lg font-bangers text-sm tracking-wider flex items-center gap-1.5 transition-all ${
              activeTab === 'characters'
                ? 'bg-yellow-400 text-black border-2 border-black shadow-[2px_2px_0px_#000]'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Saved Characters ({characters.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('templates')}
            className={`px-4 py-1.5 rounded-lg font-bangers text-sm tracking-wider flex items-center gap-1.5 transition-all ${
              activeTab === 'templates'
                ? 'bg-yellow-400 text-black border-2 border-black shadow-[2px_2px_0px_#000]'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Bookmark className="w-4 h-4" />
            <span>Idea Sparks & Templates</span>
          </button>
        </div>

        {/* Search Bar */}
        {activeTab === 'comics' && (
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search comic title or genre..."
                className="w-full bg-slate-900 border border-slate-700 text-slate-200 text-xs rounded-xl pl-9 pr-3 py-2 focus:outline-none focus:border-yellow-400"
              />
            </div>

            {/* Genre Filter */}
            <select
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
              className="bg-slate-900 border border-slate-700 text-slate-200 text-xs rounded-xl px-3 py-2 focus:outline-none focus:border-yellow-400"
            >
              <option value="All">All Genres</option>
              {GENRES.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* TAB 1: COMICS LIST */}
      {activeTab === 'comics' && (
        <div>
          {filteredComics.length === 0 ? (
            <div className="comic-box bg-slate-900/50 p-12 text-center rounded-2xl border-2 border-dashed border-slate-800">
              <BookOpen className="w-12 h-12 text-slate-600 mx-auto mb-3" />
              <h3 className="font-bangers text-2xl text-slate-300">No Comics Found</h3>
              <p className="text-slate-400 font-comic text-sm max-w-md mx-auto mt-1 mb-6">
                {searchQuery
                  ? `No comics matched "${searchQuery}". Try a different keyword.`
                  : 'You have not created any comics in this genre yet.'}
              </p>
              <button
                onClick={() => onCreateNew()}
                className="comic-box bg-yellow-400 text-black px-5 py-2.5 rounded-xl font-bangers text-sm"
              >
                Create Comic Now
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Quick Launch "Create New" Card */}
              <div
                onClick={() => onCreateNew()}
                className="comic-box bg-gradient-to-br from-yellow-400/10 via-slate-900 to-slate-900 border-2 border-dashed border-yellow-400/50 hover:border-yellow-400 rounded-xl p-6 flex flex-col items-center justify-center text-center cursor-pointer comic-box-hover min-h-[340px] group"
              >
                <div className="w-16 h-16 rounded-2xl bg-yellow-400 border-2 border-black flex items-center justify-center mb-4 shadow-[3px_3px_0px_#000] group-hover:rotate-6 transition-transform">
                  <PlusCircle className="w-8 h-8 text-black stroke-[2.5]" />
                </div>
                <h3 className="font-bangers text-2xl text-yellow-400 tracking-wide">
                  New Comic Story
                </h3>
                <p className="text-slate-400 text-xs font-comic mt-1 max-w-xs">
                  Generate with Gemini 3.8 Flash or use your own custom prompt.
                </p>
                <span className="mt-4 px-3 py-1 bg-yellow-400 text-black font-bangers text-xs rounded border border-black shadow-sm">
                  Launch Wizard
                </span>
              </div>

              {/* Comic Cards */}
              {filteredComics.map((comic) => (
                <div
                  key={comic.id}
                  className="comic-box bg-slate-900 rounded-xl overflow-hidden flex flex-col justify-between group comic-box-hover border-3 border-black shadow-[4px_4px_0px_#000]"
                >
                  {/* Card Header Cover Art */}
                  <div
                    onClick={() => {
                      comicSound.playPop();
                      onSelectComic(comic);
                    }}
                    className="h-44 relative bg-slate-950 overflow-hidden cursor-pointer"
                  >
                    <ComicPanelVisual
                      panel={comic.panels[0]}
                      artStyle={comic.artStyle}
                      isInteractive={false}
                    />

                    {/* Genre Badge */}
                    <div className="absolute top-2 left-2 z-10 bg-yellow-400 text-black font-bangers text-xs px-2.5 py-0.5 rounded border border-black shadow-sm">
                      {comic.genre}
                    </div>

                    {/* Panels Count */}
                    <div className="absolute top-2 right-2 z-10 bg-black/80 backdrop-blur-sm text-yellow-400 font-mono text-[10px] px-2 py-0.5 rounded border border-slate-700">
                      {comic.panels.length} PANELS
                    </div>

                    {/* Art Style Tag */}
                    <div className="absolute bottom-2 left-2 z-10 bg-black/80 text-slate-200 text-[10px] px-2 py-0.5 rounded font-mono">
                      {comic.artStyle}
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <h3
                        onClick={() => {
                          comicSound.playPop();
                          onSelectComic(comic);
                        }}
                        className="font-bangers text-xl text-yellow-400 tracking-wide hover:text-yellow-300 cursor-pointer line-clamp-1 mb-1"
                      >
                        {comic.title}
                      </h3>
                      <p className="text-xs text-slate-300 font-comic line-clamp-2 leading-relaxed">
                        {comic.summary}
                      </p>
                    </div>

                    {/* Card Footer Actions */}
                    <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1.5 text-slate-400 font-mono text-[11px]">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{formatDate(comic.updatedAt)}</span>
                      </div>

                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => onDuplicateComic(comic)}
                          title="Duplicate Comic"
                          className="p-1.5 text-slate-400 hover:text-white rounded hover:bg-slate-800 transition-colors"
                        >
                          <Copy className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => onDeleteComic(comic.id)}
                          title="Delete Comic"
                          className="p-1.5 text-slate-400 hover:text-red-400 rounded hover:bg-slate-800 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => {
                            comicSound.playPop();
                            onSelectComic(comic);
                          }}
                          className="comic-box-sm bg-yellow-400 text-black px-2.5 py-1 rounded font-bangers text-xs hover:bg-yellow-300 flex items-center gap-1 ml-1"
                        >
                          <span>Open</span>
                          <ChevronRight className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: SAVED CHARACTERS */}
      {activeTab === 'characters' && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-bangers text-2xl text-white tracking-wide">
                Saved Characters Roster
              </h2>
              <p className="text-xs text-slate-400 font-comic">
                These heroes and antagonists can be injected directly into new comic story prompts.
              </p>
            </div>
            <button
              onClick={onManageCharacters}
              className="comic-box bg-cyan-400 hover:bg-cyan-300 text-black px-4 py-2 rounded-xl font-bangers text-sm flex items-center gap-1.5"
            >
              <PlusCircle className="w-4 h-4 stroke-[2.5]" />
              <span>Add New Character</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {characters.map((char) => (
              <div
                key={char.id}
                className="comic-box bg-slate-900 rounded-xl p-4 flex flex-col justify-between border-3 border-black shadow-[3px_3px_0px_#000]"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-10 h-10 rounded-xl border-2 border-black flex items-center justify-center font-bangers text-lg text-white shadow-sm"
                        style={{ backgroundColor: char.avatarColor }}
                      >
                        {char.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-bangers text-lg text-white leading-none">
                          {char.name}
                        </h4>
                        <span className="text-[10px] font-mono text-yellow-400 font-bold uppercase">
                          {char.role}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 text-xs font-comic">
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-mono block">
                        Appearance:
                      </span>
                      <p className="text-slate-200 line-clamp-2">{char.appearance}</p>
                    </div>

                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-mono block">
                        Personality:
                      </span>
                      <p className="text-slate-300 line-clamp-2">{char.personality}</p>
                    </div>

                    {char.abilities && (
                      <div>
                        <span className="text-[10px] text-cyan-400 uppercase font-mono block">
                          Abilities:
                        </span>
                        <p className="text-slate-300 line-clamp-1">{char.abilities}</p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800 flex justify-end">
                  <button
                    onClick={() => {
                      onCreateNew(`A story starring ${char.name}, the ${char.role.toLowerCase()}.`);
                    }}
                    className="text-xs text-yellow-400 font-bold hover:underline flex items-center gap-1"
                  >
                    <span>Create Comic with {char.name}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: TEMPLATES & SPARKS */}
      {activeTab === 'templates' && (
        <div>
          <div className="mb-4">
            <h2 className="font-bangers text-2xl text-white tracking-wide">
              Story Starter Sparks & Templates
            </h2>
            <p className="text-xs text-slate-400 font-comic">
              Click any starter prompt to load into the Comic Creator with Gemini AI.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {INSPIRATION_PROMPTS.map((prompt, idx) => (
              <div
                key={idx}
                onClick={() => {
                  comicSound.playPop();
                  onCreateNew(prompt);
                }}
                className="comic-box bg-slate-900 rounded-xl p-5 cursor-pointer hover:border-yellow-400 transition-all flex items-start gap-4 group"
              >
                <div className="w-10 h-10 rounded-xl bg-yellow-400 text-black font-bangers text-lg flex items-center justify-center shrink-0 border-2 border-black shadow-[2px_2px_0px_#000] group-hover:rotate-6 transition-transform">
                  {idx + 1}
                </div>
                <div className="flex-1">
                  <p className="font-comic text-sm text-slate-100 group-hover:text-yellow-300 transition-colors leading-relaxed">
                    "{prompt}"
                  </p>
                  <div className="mt-3 flex items-center justify-between text-xs">
                    <span className="text-yellow-400 font-bangers tracking-wider uppercase">
                      Ready to Generate
                    </span>
                    <span className="text-slate-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      Use Spark <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
