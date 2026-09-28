/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HomePage } from './components/HomePage';
import { Dashboard } from './components/Dashboard';
import { ComicCreator } from './components/ComicCreator';
import { ComicEditor } from './components/ComicEditor';
import { CharacterManager } from './components/CharacterManager';
import { ComicPreview } from './components/ComicPreview';
import { ExportModal } from './components/ExportModal';
import { ComicStory, Character } from './types/comic';
import { SAMPLE_COMICS, INITIAL_CHARACTERS } from './data/sampleComics';
import { comicSound } from './utils/comicSound';

export default function App() {
  // Navigation state
  const [currentTab, setCurrentTab] = useState<
    'home' | 'dashboard' | 'create' | 'editor' | 'characters' | 'preview'
  >('home');

  // Comics state (persisted in localStorage)
  const [comics, setComics] = useState<ComicStory[]>(() => {
    try {
      const saved = localStorage.getItem('comiccraft_comics');
      if (saved) return JSON.parse(saved);
    } catch {}
    return SAMPLE_COMICS;
  });

  // Characters state (persisted in localStorage)
  const [characters, setCharacters] = useState<Character[]>(() => {
    try {
      const saved = localStorage.getItem('comiccraft_characters');
      if (saved) return JSON.parse(saved);
    } catch {}
    return INITIAL_CHARACTERS;
  });

  // Active loaded comic ID
  const [activeComicId, setActiveComicId] = useState<string>(
    SAMPLE_COMICS[0]?.id || ''
  );

  // Pre-fill parameters for creation wizard
  const [creatorPrompt, setCreatorPrompt] = useState<string>('');
  const [creatorGenre, setCreatorGenre] = useState<string>('Sci-Fi');

  // Export Modal visibility
  const [isExportOpen, setIsExportOpen] = useState(false);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('comiccraft_comics', JSON.stringify(comics));
    } catch {}
  }, [comics]);

  useEffect(() => {
    try {
      localStorage.setItem('comiccraft_characters', JSON.stringify(characters));
    } catch {}
  }, [characters]);

  const activeComic = comics.find((c) => c.id === activeComicId) || comics[0];

  // Handlers
  const handleSelectComic = (comic: ComicStory) => {
    setActiveComicId(comic.id);
    setCurrentTab('editor');
  };

  const handleCreateNew = (initialPrompt?: string, genre?: string) => {
    setCreatorPrompt(initialPrompt || '');
    setCreatorGenre(genre || 'Sci-Fi');
    setCurrentTab('create');
  };

  const handleComicGenerated = (newComic: ComicStory) => {
    setComics([newComic, ...comics]);
    setActiveComicId(newComic.id);
    setCurrentTab('editor');
  };

  const handleUpdateComic = (updatedComic: ComicStory) => {
    setComics(comics.map((c) => (c.id === updatedComic.id ? updatedComic : c)));
  };

  const handleDeleteComic = (comicId: string) => {
    comicSound.playPop();
    const filtered = comics.filter((c) => c.id !== comicId);
    setComics(filtered);
    if (activeComicId === comicId) {
      setActiveComicId(filtered[0]?.id || '');
    }
  };

  const handleDuplicateComic = (comic: ComicStory) => {
    comicSound.playPop();
    const duplicated: ComicStory = {
      ...comic,
      id: `comic-${Date.now()}`,
      title: `${comic.title} (Copy)`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setComics([duplicated, ...comics]);
    setActiveComicId(duplicated.id);
  };

  const handleAddCharacter = (newChar: Character) => {
    setCharacters([...characters, newChar]);
  };

  const handleUpdateCharacter = (updatedChar: Character) => {
    setCharacters(characters.map((c) => (c.id === updatedChar.id ? updatedChar : c)));
  };

  const handleDeleteCharacter = (charId: string) => {
    setCharacters(characters.filter((c) => c.id !== charId));
  };

  return (
    <div className="min-h-screen bg-slate-950 font-sans selection:bg-yellow-400 selection:text-black">
      {/* Navigation Header */}
      <Navbar
        currentTab={currentTab}
        onNavigate={(tab) => setCurrentTab(tab)}
        activeComicTitle={activeComic?.title}
        hasActiveComic={!!activeComic}
      />

      {/* Main Content Router */}
      <main>
        {currentTab === 'home' && (
          <HomePage
            onStartCreating={() => handleCreateNew()}
            onExploreComics={() => setCurrentTab('dashboard')}
            onSelectComic={handleSelectComic}
            featuredComics={comics}
          />
        )}

        {currentTab === 'dashboard' && (
          <Dashboard
            comics={comics}
            characters={characters}
            onSelectComic={handleSelectComic}
            onCreateNew={handleCreateNew}
            onDeleteComic={handleDeleteComic}
            onDuplicateComic={handleDuplicateComic}
            onManageCharacters={() => setCurrentTab('characters')}
          />
        )}

        {currentTab === 'create' && (
          <ComicCreator
            savedCharacters={characters}
            onComicGenerated={handleComicGenerated}
            onCancel={() => setCurrentTab('dashboard')}
            initialPrompt={creatorPrompt}
            initialGenre={creatorGenre}
          />
        )}

        {currentTab === 'editor' && activeComic && (
          <ComicEditor
            comic={activeComic}
            onUpdateComic={handleUpdateComic}
            onPreview={() => setCurrentTab('preview')}
            onExport={() => setIsExportOpen(true)}
          />
        )}

        {currentTab === 'characters' && (
          <CharacterManager
            characters={characters}
            onAddCharacter={handleAddCharacter}
            onUpdateCharacter={handleUpdateCharacter}
            onDeleteCharacter={handleDeleteCharacter}
            onClose={() => setCurrentTab('dashboard')}
          />
        )}

        {currentTab === 'preview' && activeComic && (
          <ComicPreview
            comic={activeComic}
            onBackToEditor={() => setCurrentTab('editor')}
            onExport={() => setIsExportOpen(true)}
          />
        )}
      </main>

      {/* Global Export Modal */}
      {activeComic && (
        <ExportModal
          comic={activeComic}
          isOpen={isExportOpen}
          onClose={() => setIsExportOpen(false)}
        />
      )}
    </div>
  );
}
