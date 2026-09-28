import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI, Type } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json({ limit: '10mb' }));

// Initialize GoogleGenAI server-side client
let ai: GoogleGenAI | null = null;
if (process.env.GEMINI_API_KEY) {
  ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// Fallback intelligent generator if API key is not present or rate limited
function generateFallbackComic(params: {
  prompt: string;
  genre: string;
  tone: string;
  panelCount: number;
  targetAudience: string;
  artStyle: string;
  characters?: any[];
}) {
  const { prompt, genre, tone, panelCount = 6, artStyle, characters = [] } = params;
  
  // Extract or invent protagonist & secondary character
  const mainCharName = characters.length > 0 && characters[0].name ? characters[0].name : 'Maya Lin';
  const mainCharDesc = characters.length > 0 && characters[0].appearance ? characters[0].appearance : 'Spirited teen inventor with bronze goggles, grease-smudged denim jacket, and quick wits.';
  
  const secondaryName = characters.length > 1 && characters[1].name ? characters[1].name : 'Unit 7-B "Sparky"';
  const secondaryDesc = characters.length > 1 && characters[1].appearance ? characters[1].appearance : 'Centuries-old brass automaton with glowing cyan optical lenses and gears ticking softly.';

  const titlesByGenre: Record<string, string[]> = {
    'Sci-Fi': ['The Quantum Workshop', 'Protocol: Awakening', 'Beyond The Neon Rust'],
    'Fantasy': ['Whispers of the Runestone', 'The Astral Blade', 'Chronicles of Mytharia'],
    'Superhero': ['The Midnight Vanguard', 'Electric Surge', 'Defenders of New Nova'],
    'Mystery': ['The Clockwork Enigma', 'Shadows on Baker Avenue', 'The Cipher in the Mist'],
    'Adventure': ['The Lost Relic of Sol', 'Horizon Hunters', 'The Subterranean Vault'],
    'Comedy': ['Accidental Mayhem', 'Operation: Do Not Push The Red Button', 'The Day the Droids rebelled (Politely)'],
    'Horror': ['Whispers from the Basement Floor', 'The Midnight Static', 'Cursed Circuitry'],
    'Romance': ['Starlight & Brass Gears', 'Love in the Year 3042', 'Heart of the Machine']
  };

  const defaultTitles = ['The Secret Below the Workshop', 'The Iron Herald', 'Tales of Tomorrow'];
  const titleList = titlesByGenre[genre] || defaultTitles;
  const title = titleList[Math.floor(Math.random() * titleList.length)];

  const soundEffects = ['CLANG!', 'WHIRRR!', 'BZZZT!', 'KABOOM!', 'WHOOSH!', 'CLICK!', 'SHHHK!', 'THUMP!'];
  const cameraAngles = [
    'Wide Angle',
    'Medium Shot',
    'Close-up',
    'Dramatic Dutch Angle',
    'Bird\'s Eye',
    'Low Angle',
    'Over-the-Shoulder'
  ] as const;

  const panels = [];
  const count = Math.max(3, Math.min(panelCount, 12));

  for (let i = 1; i <= count; i++) {
    let action = '';
    let scene_desc = '';
    let dialogueList: any[] = [];
    let narration = '';
    let sfx = '';

    if (i === 1) {
      action = `${mainCharName} sweeps dust off an old copper floorboard, spotting a faint luminescent glow underneath.`;
      scene_desc = `A cluttered, dimly lit workshop filled with antique clocks, brass calipers, and blueprints. In the center, ${mainCharName} kneels down, eyes wide with awe as dust particles drift in a beam of light.`;
      narration = `It was supposed to be another ordinary evening sorting grandfather's old workshop relics.`;
      dialogueList = [
        {
          id: `dlg-${i}-1`,
          character: mainCharName,
          text: `Grandpa never mentioned anything about a hidden basement hatch...`,
          bubbleType: 'thought',
        }
      ];
      sfx = 'CREEEAK!';
    } else if (i === 2) {
      action = `${mainCharName} pulls the heavy iron ring, unlocking a subterranean vault where ${secondaryName} rests in suspended slumber.`;
      scene_desc = `A dramatic low angle view looking up as the heavy trapdoor hinges swing back. Steam gently hisses from ancient pressure valves, revealing a metallic silhouette entombed in crystal.`;
      narration = `Buried beneath decades of sawdust lay something that defied modern science.`;
      dialogueList = [
        {
          id: `dlg-${i}-1`,
          character: mainCharName,
          text: `Whoa! It's completely intact!`,
          bubbleType: 'speech',
        }
      ];
      sfx = 'CLUNK!';
    } else if (i === 3) {
      action = `${mainCharName}'s finger brushes a glowing core on the machine's chest, initiating a sudden reboot sequence.`;
      scene_desc = `Extreme close-up on ${mainCharName}'s hand touching a crystalline energy cell. Brilliant cyan arcs of electricity spark across the brass chassis, casting vibrant neon reflections.`;
      narration = `A touch was all it took to reawaken dormant energy stored for centuries.`;
      dialogueList = [
        {
          id: `dlg-${i}-1`,
          character: mainCharName,
          text: `Careful now... let's see what happens if I adjust this valve...`,
          bubbleType: 'whisper',
        }
      ];
      sfx = 'BZZZT!';
    } else if (i === count - 1) {
      action = `${secondaryName}'s eyes blaze into life with a reassuring hum as it slowly rises, greeting ${mainCharName}.`;
      scene_desc = `Dynamic medium shot. ${secondaryName} stands upright, steam venting smoothly. ${mainCharName} steps back in startled wonder, grinning as the construct turns its visor.`;
      narration = `The forgotten guardian was awake, and the real adventure was only beginning.`;
      dialogueList = [
        {
          id: `dlg-${i}-1`,
          character: secondaryName,
          text: `System online. Designation: Active. Greetings, Creator.`,
          bubbleType: 'speech',
        },
        {
          id: `dlg-${i}-2`,
          character: mainCharName,
          text: `You can talk?! We have SO much work to do!`,
          bubbleType: 'shout',
        }
      ];
      sfx = 'WHIRRRR!';
    } else if (i === count) {
      action = `${mainCharName} and ${secondaryName} stand side-by-side looking at a glowing holographic map projecting into the workshop air.`;
      scene_desc = `Epic cinematic wide shot. Both characters silhouetted against a brilliant cosmic star-map projected from the automaton's chest. Outside the workshop window, the city skyline gleams under the moonlight.`;
      narration = `The world above slept peacefully, oblivious to the journey that had just begun.`;
      dialogueList = [
        {
          id: `dlg-${i}-1`,
          character: mainCharName,
          text: `Ready to change the world, partner?`,
          bubbleType: 'speech',
        },
        {
          id: `dlg-${i}-2`,
          character: secondaryName,
          text: `Course plotted. Ready when you are.`,
          bubbleType: 'speech',
        }
      ];
      sfx = '';
    } else {
      action = `Pivotal confrontation or discovery moment as gears align and hidden mechanisms reveal a deeper mystery.`;
      scene_desc = `Tense mid-scene panel. Gears turning, sparks flying, shadows dancing across the workbench as ancient codes scroll across a monitor screen.`;
      narration = `Every answer only unraveled a dozen more questions.`;
      dialogueList = [
        {
          id: `dlg-${i}-1`,
          character: mainCharName,
          text: `These coordinates lead outside the perimeter walls!`,
          bubbleType: 'speech',
        }
      ];
      sfx = soundEffects[i % soundEffects.length];
    }

    panels.push({
      panel_number: i,
      scene_description: scene_desc,
      characters: [mainCharName, secondaryName],
      action: action,
      dialogue: dialogueList,
      narration: narration,
      image_prompt: `${artStyle} style comic panel: ${scene_desc}, dramatic lighting, comic inks, vibrant color palette, dynamic perspective.`,
      sound_effect: sfx,
      camera_angle: cameraAngles[(i - 1) % cameraAngles.length],
      theme_color: i % 2 === 0 ? '#6366F1' : '#EC4899',
    });
  }

  return {
    title: title,
    genre: genre,
    tone: tone,
    targetAudience: params.targetAudience || 'All Ages',
    artStyle: artStyle,
    summary: `In this ${tone.toLowerCase()} ${genre.toLowerCase()} tale, ${mainCharName} uncovers an extraordinary relic hidden beneath the workshop floorboards, striking an unexpected alliance with ${secondaryName} that will forever alter their destiny.`,
    characters: [
      {
        id: 'char-1',
        name: mainCharName,
        role: 'Protagonist',
        appearance: mainCharDesc,
        personality: 'Curious, resourceful, quick-witted, fiercely loyal.',
        abilities: 'Engineering expertise, problem solving, gadget mastery.',
        relationships: `Granddaughter of the workshop master, ally to ${secondaryName}`,
        avatarColor: '#F59E0B'
      },
      {
        id: 'char-2',
        name: secondaryName,
        role: 'Sidekick',
        appearance: secondaryDesc,
        personality: 'Loyal, stoic, analytical, unexpectedly warm-hearted.',
        abilities: 'Holographic projection, heavy lifting, energy shield generation.',
        relationships: `Ancient guardian sworn to protect the workshop heir`,
        avatarColor: '#06B6D4'
      }
    ],
    panels: panels,
  };
}

// API: Generate complete comic story with Gemini
app.post('/api/generate-comic', async (req, res) => {
  const {
    prompt,
    genre = 'Sci-Fi Adventure',
    tone = 'Inspirational',
    panelCount = 6,
    targetAudience = 'Teens',
    artStyle = 'Modern Comic',
    characters = [],
  } = req.body;

  if (!prompt || typeof prompt !== 'string') {
    return res.status(400).json({ error: 'Prompt is required.' });
  }

  // If Gemini API is available, generate via gemini-3.8-flash
  if (ai) {
    try {
      const userPrompt = `
You are ComicCraft AI, an elite master comic book writer and visual storyboard artist.
Generate a complete, structured comic story based on the user's premise.

User Premise/Idea: "${prompt}"
Genre: ${genre}
Tone: ${tone}
Number of panels: ${panelCount}
Target Audience: ${targetAudience}
Art Style: ${artStyle}
Pre-specified Characters (if any): ${JSON.stringify(characters)}

REQUIREMENTS:
1. Return ONLY a valid JSON object matching the exact schema.
2. Title: Punchy, memorable comic book title.
3. Summary: 2-3 sentence engaging synopsis.
4. Characters: Array of characters with name, role (Protagonist, Antagonist, Sidekick, Mentor, Supporting), appearance, personality, abilities, relationships, and avatarColor (hex color string).
5. Panels: Exactly ${panelCount} panels. Each panel must have:
   - panel_number (integer starting from 1)
   - scene_description: Detailed visual staging, lighting, background, camera framing
   - characters: string array of character names present
   - action: What happens in this specific panel
   - dialogue: Array of dialogue objects: { character: string, text: string, bubbleType: "speech" | "thought" | "shout" | "whisper" | "radio" }
   - narration: Caption text describing mood, scene shift, or inner perspective (or empty string if none)
   - sound_effect: Comic SFX word like "BOOM!", "CRACKLE!", "WHOOSH!", "ZAP!", "SLAM!", or empty string
   - camera_angle: One of: "Close-up", "Medium Shot", "Wide Angle", "Bird's Eye", "Low Angle", "Dramatic Dutch Angle", "Over-the-Shoulder"
   - image_prompt: High-detail image generation prompt capturing the scene in ${artStyle} comic style with character consistency
   - theme_color: Hex color representing the panel's dominant mood (e.g. "#6366F1", "#EF4444", "#10B981")
`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: userPrompt,
        config: {
          systemInstruction: 'You are an award-winning comic book creator and visual layout director. Output purely valid JSON following the comic book story schema.',
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              summary: { type: Type.STRING },
              genre: { type: Type.STRING },
              tone: { type: Type.STRING },
              artStyle: { type: Type.STRING },
              targetAudience: { type: Type.STRING },
              characters: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    name: { type: Type.STRING },
                    role: { type: Type.STRING },
                    appearance: { type: Type.STRING },
                    personality: { type: Type.STRING },
                    abilities: { type: Type.STRING },
                    relationships: { type: Type.STRING },
                    avatarColor: { type: Type.STRING },
                  },
                  required: ['name', 'appearance', 'personality'],
                },
              },
              panels: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    panel_number: { type: Type.INTEGER },
                    scene_description: { type: Type.STRING },
                    characters: {
                      type: Type.ARRAY,
                      items: { type: Type.STRING },
                    },
                    action: { type: Type.STRING },
                    dialogue: {
                      type: Type.ARRAY,
                      items: {
                        type: Type.OBJECT,
                        properties: {
                          character: { type: Type.STRING },
                          text: { type: Type.STRING },
                          bubbleType: { type: Type.STRING },
                        },
                        required: ['character', 'text'],
                      },
                    },
                    narration: { type: Type.STRING },
                    sound_effect: { type: Type.STRING },
                    camera_angle: { type: Type.STRING },
                    image_prompt: { type: Type.STRING },
                    theme_color: { type: Type.STRING },
                  },
                  required: ['panel_number', 'scene_description', 'action', 'image_prompt'],
                },
              },
            },
            required: ['title', 'summary', 'characters', 'panels'],
          },
        },
      });

      const responseText = response.text?.trim() || '{}';
      const parsed = JSON.parse(responseText);

      // Hydrate IDs and clean up format
      const formattedCharacters = (parsed.characters || []).map((c: any, idx: number) => ({
        id: `char-${idx + 1}`,
        name: c.name || `Character ${idx + 1}`,
        role: c.role || (idx === 0 ? 'Protagonist' : 'Supporting'),
        appearance: c.appearance || '',
        personality: c.personality || '',
        abilities: c.abilities || '',
        relationships: c.relationships || '',
        avatarColor: c.avatarColor || ['#EF4444', '#3B82F6', '#10B981', '#F59E0B', '#8B5CF6'][idx % 5],
      }));

      const formattedPanels = (parsed.panels || []).map((p: any, idx: number) => ({
        panel_number: p.panel_number || idx + 1,
        scene_description: p.scene_description || '',
        characters: Array.isArray(p.characters) ? p.characters : [],
        action: p.action || '',
        dialogue: (p.dialogue || []).map((d: any, dIdx: number) => ({
          id: `dlg-${idx + 1}-${dIdx + 1}`,
          character: d.character || 'Narrator',
          text: d.text || '',
          bubbleType: ['speech', 'thought', 'shout', 'whisper', 'radio'].includes(d.bubbleType)
            ? d.bubbleType
            : 'speech',
        })),
        narration: p.narration || '',
        sound_effect: p.sound_effect || '',
        camera_angle: p.camera_angle || 'Medium Shot',
        image_prompt: p.image_prompt || `${artStyle} style comic panel: ${p.scene_description}`,
        theme_color: p.theme_color || '#6366F1',
      }));

      return res.json({
        id: `comic-${Date.now()}`,
        title: parsed.title || 'Untitled Comic Adventure',
        genre: parsed.genre || genre,
        tone: parsed.tone || tone,
        targetAudience: parsed.targetAudience || targetAudience,
        artStyle: parsed.artStyle || artStyle,
        summary: parsed.summary || prompt,
        characters: formattedCharacters,
        panels: formattedPanels,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        issueNumber: 1,
        layout: 'dynamic-action',
      });
    } catch (err: any) {
      console.warn('Gemini generation error, falling back to local generator:', err?.message || err);
      const fallback = generateFallbackComic({
        prompt,
        genre,
        tone,
        panelCount,
        targetAudience,
        artStyle,
        characters,
      });
      return res.json({
        id: `comic-${Date.now()}`,
        ...fallback,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        issueNumber: 1,
        layout: 'dynamic-action',
      });
    }
  }

  // Graceful fallback when no GEMINI_API_KEY is configured
  const fallback = generateFallbackComic({
    prompt,
    genre,
    tone,
    panelCount,
    targetAudience,
    artStyle,
    characters,
  });

  return res.json({
    id: `comic-${Date.now()}`,
    ...fallback,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    issueNumber: 1,
    layout: 'dynamic-action',
  });
});

// API: Regenerate single panel with specific user directions
app.post('/api/regenerate-panel', async (req, res) => {
  const { comicTitle, characters, panelNumber, userInstruction, currentPanel, artStyle } = req.body;

  if (ai) {
    try {
      const prompt = `
You are ComicCraft AI. Rewrite and enhance Comic Panel #${panelNumber} for the comic "${comicTitle}".
User's specific direction/edit: "${userInstruction || 'Make it more dramatic and action-packed'}"
Characters in comic: ${JSON.stringify(characters)}
Current panel state: ${JSON.stringify(currentPanel)}
Art Style: ${artStyle}

Return ONLY valid JSON matching this schema:
{
  "scene_description": string,
  "action": string,
  "characters": string[],
  "dialogue": [
    { "character": string, "text": string, "bubbleType": "speech" | "thought" | "shout" | "whisper" | "radio" }
  ],
  "narration": string,
  "sound_effect": string,
  "camera_angle": "Close-up" | "Medium Shot" | "Wide Angle" | "Bird's Eye" | "Low Angle" | "Dramatic Dutch Angle",
  "image_prompt": string,
  "theme_color": string
}
`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
        },
      });

      const parsed = JSON.parse(response.text?.trim() || '{}');
      return res.json({
        panel_number: panelNumber,
        scene_description: parsed.scene_description || currentPanel.scene_description,
        characters: parsed.characters || currentPanel.characters,
        action: parsed.action || currentPanel.action,
        dialogue: (parsed.dialogue || currentPanel.dialogue || []).map((d: any, idx: number) => ({
          id: `dlg-${panelNumber}-${idx + 1}`,
          character: d.character || 'Character',
          text: d.text || '',
          bubbleType: d.bubbleType || 'speech',
        })),
        narration: parsed.narration !== undefined ? parsed.narration : currentPanel.narration,
        sound_effect: parsed.sound_effect || 'KRAK!',
        camera_angle: parsed.camera_angle || 'Dramatic Dutch Angle',
        image_prompt: parsed.image_prompt || `${artStyle} comic panel: ${parsed.scene_description}`,
        theme_color: parsed.theme_color || '#EC4899',
      });
    } catch (err: any) {
      console.warn('Panel regeneration failed, falling back:', err?.message);
    }
  }

  // Fallback regeneration
  return res.json({
    ...currentPanel,
    panel_number: panelNumber,
    action: `Enhanced action: ${userInstruction || 'Dynamic shift in intensity'}`,
    sound_effect: 'KABOOM!',
    camera_angle: 'Dramatic Dutch Angle',
    narration: `Suddenly, the course of fate twisted once more!`,
    image_prompt: `${artStyle} comic panel: High-octane scene revision based on "${userInstruction}".`,
  });
});

// API: Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    hasGeminiKey: !!process.env.GEMINI_API_KEY,
    timestamp: new Date().toISOString(),
  });
});

// Serve frontend in production or integrate Vite middlewares in development
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`ComicCraft AI server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
