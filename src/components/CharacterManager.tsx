import React, { useState } from 'react';
import {
  Users,
  PlusCircle,
  Sparkles,
  Trash2,
  Edit2,
  Shield,
  Zap,
  Heart,
  UserCheck,
  Check,
} from 'lucide-react';
import { Character } from '../types/comic';
import { comicSound } from '../utils/comicSound';

interface CharacterManagerProps {
  characters: Character[];
  onAddCharacter: (character: Character) => void;
  onUpdateCharacter: (character: Character) => void;
  onDeleteCharacter: (characterId: string) => void;
  onClose: () => void;
}

export const CharacterManager: React.FC<CharacterManagerProps> = ({
  characters,
  onAddCharacter,
  onUpdateCharacter,
  onDeleteCharacter,
  onClose,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [editingChar, setEditingChar] = useState<Character | null>(null);

  // Form State
  const [name, setName] = useState('');
  const [role, setRole] = useState<Character['role']>('Protagonist');
  const [appearance, setAppearance] = useState('');
  const [personality, setPersonality] = useState('');
  const [abilities, setAbilities] = useState('');
  const [relationships, setRelationships] = useState('');
  const [avatarColor, setAvatarColor] = useState('#F59E0B');

  const presetColors = [
    '#EF4444',
    '#F59E0B',
    '#10B981',
    '#06B6D4',
    '#3B82F6',
    '#8B5CF6',
    '#EC4899',
    '#1E293B',
  ];

  const handleOpenAdd = () => {
    comicSound.playPop();
    setEditingChar(null);
    setName('');
    setRole('Protagonist');
    setAppearance('');
    setPersonality('');
    setAbilities('');
    setRelationships('');
    setAvatarColor(presetColors[Math.floor(Math.random() * presetColors.length)]);
    setShowModal(true);
  };

  const handleOpenEdit = (char: Character) => {
    comicSound.playPop();
    setEditingChar(char);
    setName(char.name);
    setRole(char.role);
    setAppearance(char.appearance);
    setPersonality(char.personality);
    setAbilities(char.abilities || '');
    setRelationships(char.relationships || '');
    setAvatarColor(char.avatarColor);
    setShowModal(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    if (editingChar) {
      onUpdateCharacter({
        ...editingChar,
        name: name.trim(),
        role,
        appearance: appearance.trim(),
        personality: personality.trim(),
        abilities: abilities.trim(),
        relationships: relationships.trim(),
        avatarColor,
      });
    } else {
      onAddCharacter({
        id: `char-${Date.now()}`,
        name: name.trim(),
        role,
        appearance: appearance.trim(),
        personality: personality.trim(),
        abilities: abilities.trim(),
        relationships: relationships.trim(),
        avatarColor,
      });
    }

    comicSound.playFanfare();
    setShowModal(false);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 bg-halftone pb-24 pt-6 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-4 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-400/10 border border-cyan-400/30 text-cyan-400 text-xs font-mono font-bold uppercase mb-2">
            <Users className="w-3.5 h-3.5" />
            <span>Character Roster & Consistency Lab</span>
          </div>
          <h1 className="font-bangers text-3xl sm:text-5xl text-white tracking-wide uppercase drop-shadow-[2px_2px_0px_#000]">
            Comic Character Universe
          </h1>
          <p className="text-slate-400 font-comic text-xs sm:text-sm max-w-xl mt-1">
            Maintain consistent hero outfits, villain motivations, power sets, and relationships
            across all comic issues.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-bold text-slate-400 hover:text-white border border-slate-700 hover:bg-slate-800"
          >
            Back to Dashboard
          </button>

          <button
            onClick={handleOpenAdd}
            className="comic-box bg-yellow-400 hover:bg-yellow-300 text-black px-5 py-2.5 rounded-xl font-bangers text-base tracking-wider flex items-center gap-2 shadow-[3px_3px_0px_#000]"
          >
            <PlusCircle className="w-5 h-5 stroke-[2.5]" />
            <span>Create New Character</span>
          </button>
        </div>
      </div>

      {/* Characters Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {characters.map((char) => (
          <div
            key={char.id}
            className="comic-box bg-slate-900 rounded-2xl p-5 border-3 border-black shadow-[4px_4px_0px_#000] flex flex-col justify-between"
          >
            <div>
              {/* Header Badge */}
              <div className="flex items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <div
                    className="w-12 h-12 rounded-xl border-2 border-black flex items-center justify-center font-bangers text-2xl text-white shadow-[2px_2px_0px_#000]"
                    style={{ backgroundColor: char.avatarColor }}
                  >
                    {char.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-bangers text-2xl text-white leading-none">{char.name}</h3>
                    <span className="text-xs font-mono text-yellow-400 uppercase font-bold">
                      {char.role}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleOpenEdit(char)}
                    className="p-1.5 text-slate-400 hover:text-white rounded hover:bg-slate-800"
                    title="Edit Character"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => {
                      comicSound.playPop();
                      onDeleteCharacter(char.id);
                    }}
                    className="p-1.5 text-slate-400 hover:text-red-400 rounded hover:bg-slate-800"
                    title="Delete Character"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Details */}
              <div className="space-y-3 text-xs font-comic">
                <div>
                  <span className="text-[10px] font-mono text-cyan-400 uppercase font-bold block mb-0.5">
                    Appearance & Costume:
                  </span>
                  <p className="text-slate-200 leading-relaxed">{char.appearance}</p>
                </div>

                <div>
                  <span className="text-[10px] font-mono text-yellow-400 uppercase font-bold block mb-0.5">
                    Personality & Voice:
                  </span>
                  <p className="text-slate-300 leading-relaxed">{char.personality}</p>
                </div>

                {char.abilities && (
                  <div>
                    <span className="text-[10px] font-mono text-emerald-400 uppercase font-bold block mb-0.5">
                      Abilities & Gadgets:
                    </span>
                    <p className="text-slate-300 leading-relaxed">{char.abilities}</p>
                  </div>
                )}

                {char.relationships && (
                  <div>
                    <span className="text-[10px] font-mono text-purple-400 uppercase font-bold block mb-0.5">
                      Relationships / Lore:
                    </span>
                    <p className="text-slate-400 leading-relaxed">{char.relationships}</p>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400 font-mono">
              <span className="flex items-center gap-1">
                <span
                  className="w-2.5 h-2.5 rounded-full inline-block"
                  style={{ backgroundColor: char.avatarColor }}
                />
                Tag Color
              </span>
              <span className="text-yellow-400">Ready for Story Prompts</span>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Character Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm">
          <div className="comic-box-lg bg-slate-900 border-4 border-black rounded-3xl p-6 max-w-lg w-full shadow-[8px_8px_0px_#000] max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800">
              <h3 className="font-bangers text-2xl text-yellow-400 tracking-wide">
                {editingChar ? 'Edit Character' : 'Create New Comic Character'}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-slate-400 hover:text-white font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name & Role */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-mono text-slate-300 block mb-1 uppercase font-bold">
                    Character Name:
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Maya Lin"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-yellow-400"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono text-slate-300 block mb-1 uppercase font-bold">
                    Role in Stories:
                  </label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-yellow-400 font-mono"
                  >
                    <option value="Protagonist">Protagonist (Hero)</option>
                    <option value="Antagonist">Antagonist (Villain)</option>
                    <option value="Sidekick">Sidekick / Companion</option>
                    <option value="Mentor">Mentor / Guide</option>
                    <option value="Supporting">Supporting Character</option>
                  </select>
                </div>
              </div>

              {/* Tag Color */}
              <div>
                <label className="text-xs font-mono text-slate-300 block mb-1.5 uppercase font-bold">
                  Avatar Speech Bubble Color:
                </label>
                <div className="flex items-center gap-2">
                  {presetColors.map((c) => (
                    <button
                      type="button"
                      key={c}
                      onClick={() => setAvatarColor(c)}
                      className={`w-7 h-7 rounded-lg border-2 transition-transform ${
                        avatarColor === c ? 'border-white scale-110 shadow' : 'border-black'
                      }`}
                      style={{ backgroundColor: c }}
                    />
                  ))}
                </div>
              </div>

              {/* Appearance */}
              <div>
                <label className="text-xs font-mono text-cyan-400 block mb-1 uppercase font-bold">
                  Appearance & Visual Consistency:
                </label>
                <textarea
                  rows={2}
                  required
                  value={appearance}
                  onChange={(e) => setAppearance(e.target.value)}
                  placeholder="e.g. Messy copper hair, aviator goggles, oversized tool belt, grease-stained denim jacket..."
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-cyan-400 font-comic"
                />
              </div>

              {/* Personality */}
              <div>
                <label className="text-xs font-mono text-yellow-400 block mb-1 uppercase font-bold">
                  Personality & Speaking Voice:
                </label>
                <textarea
                  rows={2}
                  required
                  value={personality}
                  onChange={(e) => setPersonality(e.target.value)}
                  placeholder="e.g. Highly witty, impulsive, fiercely protective of companions, makes sarcastic gear metaphors..."
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-yellow-400 font-comic"
                />
              </div>

              {/* Abilities */}
              <div>
                <label className="text-xs font-mono text-emerald-400 block mb-1 uppercase font-bold">
                  Abilities, Gadgets or Powers:
                </label>
                <input
                  type="text"
                  value={abilities}
                  onChange={(e) => setAbilities(e.target.value)}
                  placeholder="e.g. Hyper-engineering intuition, kinetic wrench weaponry, electric pulse generator"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-400 font-comic"
                />
              </div>

              {/* Relationships */}
              <div>
                <label className="text-xs font-mono text-purple-400 block mb-1 uppercase font-bold">
                  Relationships & Backstory:
                </label>
                <input
                  type="text"
                  value={relationships}
                  onChange={(e) => setRelationships(e.target.value)}
                  placeholder="e.g. Granddaughter of Walter Lin; companion to Sparky; hunted by Baron Vance"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-400 font-comic"
                />
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-400 hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="comic-box bg-yellow-400 hover:bg-yellow-300 text-black px-5 py-2.5 rounded-xl font-bangers text-base tracking-wider"
                >
                  {editingChar ? 'Update Character' : 'Save Character'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
