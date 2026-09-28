import { ComicStory, Character } from '../types/comic';

export const INITIAL_CHARACTERS: Character[] = [
  {
    id: 'char-maya',
    name: 'Maya Lin',
    role: 'Protagonist',
    appearance: '17-year-old mechanic prodigy with aviator goggles, messy copper hair, grease-streaked denim jacket, and a tool belt.',
    personality: 'Relentlessly curious, impulsive, courageous, has a witty comeback for everything.',
    abilities: 'Superhuman mechanical intuition, kinetic wrench weaponry, rapid gadget fabrication.',
    relationships: 'Granddaughter of legendary inventor Walter Lin; creator/guardian of Sparky.',
    avatarColor: '#F59E0B',
  },
  {
    id: 'char-sparky',
    name: 'Unit 7-B "Sparky"',
    role: 'Sidekick',
    appearance: 'Vintage brass automaton with articulated ball-joint limbs, a glowing cyan mono-eye lens, and internal clockwork gears.',
    personality: 'Methodical, protective, speaks in dry robotic observations, deeply emotional despite metal plating.',
    abilities: 'Sub-space energy shielding, holographic stellar mapping, high-torque hydraulic strength.',
    relationships: 'Loyal companion sworn to safeguard the Lin workshop legacy.',
    avatarColor: '#06B6D4',
  },
  {
    id: 'char-vane',
    name: 'Baron Vance',
    role: 'Antagonist',
    appearance: 'Tall imposing industrialist with a monocle HUD, charcoal pinstripe coat, and a cybernetic silver cane.',
    personality: 'Ruthless, aristocratic, obsessed with hoarding ancient energy cores for city domination.',
    abilities: 'Electromagnetic repulsion fields, drone swarm commander.',
    relationships: 'Rival to the late Walter Lin; seeking Sparky\'s internal core.',
    avatarColor: '#EF4444',
  },
  {
    id: 'char-kira',
    name: 'Kira Vance',
    role: 'Supporting',
    appearance: 'Stealthy rogue runner with neon-blue braided hair, reactive chrome armor, and holographic visor.',
    personality: 'Independent, rebellious, secretly helps the resistance behind her uncle\'s back.',
    abilities: 'Wall-running, digital decryption, smoke micro-bombs.',
    relationships: 'Niece of Baron Vance; reluctant informant for Maya.',
    avatarColor: '#8B5CF6',
  }
];

export const SAMPLE_COMICS: ComicStory[] = [
  {
    id: 'comic-robot-workshop',
    title: 'The Clockwork Spark',
    genre: 'Sci-Fi Adventure',
    tone: 'Inspirational',
    targetAudience: 'Teens',
    artStyle: 'Modern Superhero Comic',
    summary: 'While cleaning out her grandfather’s mysterious underground workshop, teen inventor Maya Lin accidentally reawakens a forgotten century-old brass robot with a cosmic secret.',
    issueNumber: 1,
    author: 'ComicCraft AI Studio',
    createdAt: '2026-09-28T02:00:00.000Z',
    updatedAt: '2026-09-28T02:30:00.000Z',
    layout: 'dynamic-action',
    characters: [
      INITIAL_CHARACTERS[0],
      INITIAL_CHARACTERS[1],
      INITIAL_CHARACTERS[2],
    ],
    panels: [
      {
        panel_number: 1,
        scene_description: 'A dusty, forgotten basement workshop packed with bronze gears, antique voltmeters, and blueprints. In the center, 17-year-old Maya Lin wipes a flashlight across the wooden floorboards, catching a glowing cyan seam.',
        characters: ['Maya Lin'],
        action: 'Maya discovers a hidden trapdoor seam beneath her grandfather\'s heavy anvil workbench.',
        dialogue: [
          {
            id: 'dlg-1-1',
            character: 'Maya Lin',
            text: 'Grandpa spent forty years here... what were you hiding under the foundation?',
            bubbleType: 'thought',
          },
        ],
        narration: 'Oakridge Industrial District, 2042. Some secrets refuse to stay buried.',
        image_prompt: 'Modern comic book style: Cluttered antique workshop filled with brass gears, blueprints, and shafts of golden dust light. A spirited teen girl with bronze goggles kneels over glowing floorboards.',
        sound_effect: 'CREEEAK!',
        camera_angle: 'Medium Shot',
        theme_color: '#F59E0B',
      },
      {
        panel_number: 2,
        scene_description: 'Dramatic low angle looking up as Maya heaves open the heavy copper trapdoor. Billowing steam and icy condensation rush out, revealing the gleaming metallic form of Unit 7-B in a glass preservation capsule.',
        characters: ['Maya Lin', 'Unit 7-B "Sparky"'],
        action: 'Maya unlocks the subterranean capsule, gazing in pure wonder.',
        dialogue: [
          {
            id: 'dlg-2-1',
            character: 'Maya Lin',
            text: 'Holy sparks! You aren’t an ordinary machine... you\'re a prototype relic!',
            bubbleType: 'speech',
          },
        ],
        narration: 'Deep inside the chamber, cold sleep kept a sentinel alive.',
        image_prompt: 'Modern comic book style: Dramatic low-angle shot, steam billowing from open underground hatch. Maya Lin gasps in awe as a dormant brass robot with glowing circular chest plate sits inside.',
        sound_effect: 'HISSSS!',
        camera_angle: 'Low Angle',
        theme_color: '#06B6D4',
      },
      {
        panel_number: 3,
        scene_description: 'Close-up of Maya\'s gloved fingers connecting an auxiliary copper jumper cable to Sparky\'s chest socket. Brilliant arcs of sapphire lightning crackle into life.',
        characters: ['Maya Lin'],
        action: 'Maya bridges the power circuit with her hand-cranked dynamo.',
        dialogue: [
          {
            id: 'dlg-3-1',
            character: 'Maya Lin',
            text: 'Just a slight pulse... please don\'t blow up in my face!',
            bubbleType: 'whisper',
          },
        ],
        narration: 'A spark of current, a century of waiting.',
        image_prompt: 'Modern comic book style: Close-up on mechanical chest core. Brilliant cyan electrical arcs spark between copper jumper cables and glowing crystal generator.',
        sound_effect: 'BZZZZT!',
        camera_angle: 'Close-up',
        theme_color: '#3B82F6',
      },
      {
        panel_number: 4,
        scene_description: 'Wide kinetic action shot! The robot\'s cyan eye-lens snaps open with blazing intensity. Steam valves burst open as its brass arm shoots forward, catching a falling overhead pipe before it hits Maya.',
        characters: ['Maya Lin', 'Unit 7-B "Sparky"'],
        action: 'Sparky reboots instantly and protects Maya from collapsing workshop scaffolding.',
        dialogue: [
          {
            id: 'dlg-4-1',
            character: 'Unit 7-B "Sparky"',
            text: 'THREAT DETECTED. PROTECTIVE DIRECTIVE: ONLINE.',
            bubbleType: 'shout',
          },
          {
            id: 'dlg-4-2',
            character: 'Maya Lin',
            text: 'WHOA! Reflexes on point!',
            bubbleType: 'speech',
          },
        ],
        narration: 'Built in the Golden Age of steel, calibrated for loyalty.',
        image_prompt: 'Modern comic book style: High action medium shot. Brass automaton catches falling heavy iron beam above teen girl inventor with sparks flying, dramatic speed lines.',
        sound_effect: 'CLANG!!',
        camera_angle: 'Dramatic Dutch Angle',
        theme_color: '#EF4444',
      },
      {
        panel_number: 5,
        scene_description: 'Tense over-the-shoulder shot from the shadows outside the workshop window. Baron Vance in his dark trench coat watches the glowing light from the alleyway, clutching his communicator.',
        characters: ['Baron Vance'],
        action: 'Baron Vance detects the unexpected energy signature spiking on his scanner.',
        dialogue: [
          {
            id: 'dlg-5-1',
            character: 'Baron Vance',
            text: 'The frequency matched Walter\'s energy core. Send the extraction squad immediately.',
            bubbleType: 'radio',
          },
        ],
        narration: 'In the smog-choked streets of New Nova, the hunters were already listening.',
        image_prompt: 'Modern comic book style: Noir alleyway, silhouette of sinister aristocrat holding glowing scanner in rain, looking up at glowing second-story attic window.',
        sound_effect: 'BEEP-BEEP',
        camera_angle: 'Over-the-Shoulder',
        theme_color: '#7C3AED',
      },
      {
        panel_number: 6,
        scene_description: 'Epic double-panel finale! Maya stands shoulder-to-shoulder with Sparky as the automaton casts a radiant 3D holographic star-chart across the workshop ceiling. They grin at each other with determined defiance.',
        characters: ['Maya Lin', 'Unit 7-B "Sparky"'],
        action: 'Maya pulls down her goggles and picks up her wrench. The adventure begins.',
        dialogue: [
          {
            id: 'dlg-6-1',
            character: 'Unit 7-B "Sparky"',
            text: 'Grandfather Lin left coordinates beyond the sector shield. Shall we proceed, Commander Maya?',
            bubbleType: 'speech',
          },
          {
            id: 'dlg-6-2',
            character: 'Maya Lin',
            text: 'You bet we will. Let\'s go make history!',
            bubbleType: 'speech',
          },
        ],
        narration: 'Two unlikely outcasts, one forgotten engine, and a galaxy waiting to be fixed.',
        image_prompt: 'Modern comic book style: Majestic cinematic wide angle. Teen girl inventor and brass robot silhouetted before glowing celestial hologram, tools drawn, confident grins.',
        sound_effect: 'WHOOSH!',
        camera_angle: 'Wide Angle',
        theme_color: '#10B981',
      },
    ],
  },
  {
    id: 'comic-cyber-samurai',
    title: 'Neon Ronin: Sector 9',
    genre: 'Cyberpunk',
    tone: 'Dark',
    targetAudience: 'Young Adults',
    artStyle: 'Manga / Anime Noir',
    summary: 'In the rain-drenched neon alleys of Neo-Kyoto, an exiled cyborg ronin defends an innocent memory-merchant from corporate cyber-assassins.',
    issueNumber: 1,
    author: 'ComicCraft AI Studio',
    createdAt: '2026-09-27T18:00:00.000Z',
    updatedAt: '2026-09-27T18:45:00.000Z',
    layout: 'dynamic-action',
    characters: [
      {
        id: 'char-jin',
        name: 'Jin Kuro',
        role: 'Protagonist',
        appearance: 'Cybernetic ronin with a worn synthetic straw hat, high-collar cyber-trench, glowing katana blade, and scarred robotic arm.',
        personality: 'Quiet, disciplined, haunted by his fallen clan, protector of the down-trodden.',
        abilities: 'Hyper-reflex overclocking, thermal plasma blade, bullet reflection.',
        relationships: 'Former bodyguard to the Kuroda Syndicate.',
        avatarColor: '#06B6D4',
      },
      {
        id: 'char-yuki',
        name: 'Yuki Lin',
        role: 'Sidekick',
        appearance: 'Street-smart memory courier with holographic goggles, oversized yellow puff jacket, and roller-blades.',
        personality: 'Fast-talking, brave, loyal, carries illegal encryption datachips.',
        abilities: 'Hacking cyber-locks, agility, signal jamming.',
        relationships: 'Saved by Jin in the market square.',
        avatarColor: '#F59E0B',
      }
    ],
    panels: [
      {
        panel_number: 1,
        scene_description: 'Heavy neon rain falling in a claustrophobic alleyway. Holographic billboards reflect in puddles of oily water. Jin stands under a neon awning, water trickling from his hat rim.',
        characters: ['Jin Kuro'],
        action: 'Jin watches shadows gathering at the alley entrance.',
        dialogue: [
          {
            id: 'dlg-c1-1',
            character: 'Jin Kuro',
            text: 'Rain always washes away the evidence, but never the debt.',
            bubbleType: 'thought',
          }
        ],
        narration: 'Neo-Kyoto, Sector 9. Midnight.',
        image_prompt: 'Cyberpunk manga noir style: Heavy rain falling on neon-lit street, cyberpunk samurai silhouette under flickering neon sign, puddles of electric pink and cyan reflection.',
        sound_effect: 'PITTER-PATTER',
        camera_angle: 'Medium Shot',
        theme_color: '#06B6D4',
      },
      {
        panel_number: 2,
        scene_description: 'Yuki sprints around the corner, clutching a pulsing hexagonal datachip, pursued by red-laser-sighted drone pods.',
        characters: ['Yuki Lin'],
        action: 'Yuki dives behind Jin\'s protective stance.',
        dialogue: [
          {
            id: 'dlg-c1-2',
            character: 'Yuki Lin',
            text: 'Hey Ronin! Mind giving a girl a hand?! They want the memory chip!',
            bubbleType: 'shout',
          }
        ],
        narration: 'Some deliveries cost more than credits.',
        image_prompt: 'Cyberpunk manga noir style: Young courier girl sliding through wet alley clutching glowing cyber chip while red laser drone beams target her.',
        sound_effect: 'SKRRRT!',
        camera_angle: 'Low Angle',
        theme_color: '#EC4899',
      },
      {
        panel_number: 3,
        scene_description: 'Explosive sword draw! Jin draws his plasma katana in a microsecond flash of magenta light, slicing three airborne hunter drones clean in two.',
        characters: ['Jin Kuro'],
        action: 'Jin executes an overclocked blade strike with speed lines.',
        dialogue: [
          {
            id: 'dlg-c1-3',
            character: 'Jin Kuro',
            text: 'Step behind me.',
            bubbleType: 'speech',
          }
        ],
        narration: 'One heartbeat. Three cuts.',
        image_prompt: 'Cyberpunk manga noir style: Dramatic manga action slash, katana glowing with intense electric magenta blade splitting killer drones into sparking halves.',
        sound_effect: 'SHIIING!!',
        camera_angle: 'Dramatic Dutch Angle',
        theme_color: '#EF4444',
      },
      {
        panel_number: 4,
        scene_description: 'Jin sheathes the blade with a soft click. The smoke clears, and Yuki looks up with a grin, offering him half an energy drink.',
        characters: ['Jin Kuro', 'Yuki Lin'],
        action: 'An unexpected partnership is formed beneath the rainy neon glow.',
        dialogue: [
          {
            id: 'dlg-c1-4',
            character: 'Yuki Lin',
            text: 'Okay... you definitely just earned yourself a loyal customer.',
            bubbleType: 'speech',
          },
          {
            id: 'dlg-c1-5',
            character: 'Jin Kuro',
            text: 'Keep moving. Their reinforcement drones will arrive in ninety seconds.',
            bubbleType: 'speech',
          }
        ],
        narration: 'In the dark sectors, honor is the rarest currency of all.',
        image_prompt: 'Cyberpunk manga noir style: Jin sheathing plasma katana as smoke drifts away in rain, smiling tech girl standing beside him in neon alley.',
        sound_effect: 'CLIK',
        camera_angle: 'Wide Angle',
        theme_color: '#8B5CF6',
      }
    ]
  },
  {
    id: 'comic-super-paws',
    title: 'Captain Whiskers & The Laser Menace',
    genre: 'Comedy',
    tone: 'Funny',
    targetAudience: 'Kids (All Ages)',
    artStyle: 'Saturday Morning Cartoon',
    summary: 'A chubby ginger cat accidentally drinks an experimental super-serum from his scientist owner, granting him telekinetic powers to finally defeat the dreaded Red Dot.',
    issueNumber: 1,
    author: 'ComicCraft AI Studio',
    createdAt: '2026-09-26T12:00:00.000Z',
    updatedAt: '2026-09-26T12:20:00.000Z',
    layout: 'classic-grid',
    characters: [
      {
        id: 'char-whiskers',
        name: 'Captain Whiskers',
        role: 'Protagonist',
        appearance: 'Chubby orange tabby cat wearing a tiny red superhero cape and a determined squint.',
        personality: 'Gluttonous, dramatic, fiercely determined to conquer the laser pointer, loves tuna.',
        abilities: 'Telekinesis, super gravity pounce, supersonic purr.',
        relationships: 'Pet to Professor Higgins.',
        avatarColor: '#F97316',
      },
      {
        id: 'char-prof',
        name: 'Professor Higgins',
        role: 'Supporting',
        appearance: 'Scatterbrained professor with wild white hair, lab coat, and magnifying spectacles.',
        personality: 'Eccentric, oblivious, loves his cat dearly.',
        abilities: 'Inventing wild serums and laser gadgets.',
        relationships: 'Owner of Captain Whiskers.',
        avatarColor: '#3B82F6',
      }
    ],
    panels: [
      {
        panel_number: 1,
        scene_description: 'Bright colorful cartoon laboratory. Professor Higgins accidentally leaves a saucer of glowing green "Super-Formula Z" on the kitchen counter.',
        characters: ['Professor Higgins', 'Captain Whiskers'],
        action: 'Whiskers sneaks onto the counter and licks the saucer clean.',
        dialogue: [
          {
            id: 'dlg-p1',
            character: 'Captain Whiskers',
            text: 'Mmm, smells like minty tuna mousse with a kick of radioactive glow!',
            bubbleType: 'thought',
          }
        ],
        narration: 'A quiet morning in Suburbia... until breakfast got weird.',
        image_prompt: 'Saturday morning cartoon style: Chubby ginger cat licking glowing green liquid from a beaker on a messy science lab counter.',
        sound_effect: 'SLURRP!',
        camera_angle: 'Medium Shot',
        theme_color: '#10B981',
      },
      {
        panel_number: 2,
        scene_description: 'Whiskers begins floating four inches above the floor! His paws glow with golden sparkles, and canned cat food levitates in a circle around him.',
        characters: ['Captain Whiskers'],
        action: 'Whiskers realizes he now controls gravity with his paws.',
        dialogue: [
          {
            id: 'dlg-p2',
            character: 'Captain Whiskers',
            text: 'I HAVE BECOME UNTETHERED BY MORTAL GRAVITY! ALL HAIL THE CAN OPENER OVERLORD!',
            bubbleType: 'shout',
          }
        ],
        narration: 'Unlimited cosmic power. Zero cat-tree restrictions.',
        image_prompt: 'Saturday morning cartoon style: Chubby orange cat floating in the air with glowing cosmic paws, surrounded by hovering floating cans of tuna.',
        sound_effect: 'POOF!',
        camera_angle: 'Low Angle',
        theme_color: '#F59E0B',
      },
      {
        panel_number: 3,
        scene_description: 'Suddenly, a mysterious red laser dot dances across the living room carpet. Whiskers narrows his eyes in intense heroic resolve.',
        characters: ['Captain Whiskers'],
        action: 'Whiskers prepares the ultimate sonic pounce on his mortal nemesis.',
        dialogue: [
          {
            id: 'dlg-p3',
            character: 'Captain Whiskers',
            text: 'You think you can evade me, Red Dot? Today, destiny catches you!',
            bubbleType: 'speech',
          }
        ],
        narration: 'The eternal grudge match of feline history had arrived.',
        image_prompt: 'Saturday morning cartoon style: Extreme dramatic close-up of cat eyes with reflection of glowing red laser dot, heroic cape fluttering.',
        sound_effect: 'WIGGLE-WIGGLE',
        camera_angle: 'Close-up',
        theme_color: '#EF4444',
      },
      {
        panel_number: 4,
        scene_description: 'Epic cartoon smash! Whiskers lands paws-first right on the red dot with a comic explosion starburst. Professor Higgins walks in with his laser pointer, staring in utter disbelief.',
        characters: ['Captain Whiskers', 'Professor Higgins'],
        action: 'Whiskers lifts his paw, proud of saving the universe from the red menace.',
        dialogue: [
          {
            id: 'dlg-p4',
            character: 'Captain Whiskers',
            text: 'Captured. You may reward your savior with salmon pate now, human.',
            bubbleType: 'thought',
          },
          {
            id: 'dlg-p5',
            character: 'Professor Higgins',
            text: 'Did my cat just bend the laws of quantum physics to catch a laser beam?!',
            bubbleType: 'speech',
          }
        ],
        narration: 'The city was safe. The nap could commence.',
        image_prompt: 'Saturday morning cartoon style: Funny triumphant cat sitting on carpet with tiny superhero mask, stunned professor with laser pointer in doorway.',
        sound_effect: 'KAPOW!',
        camera_angle: 'Wide Angle',
        theme_color: '#6366F1',
      }
    ]
  }
];

export const GENRES = [
  'Sci-Fi',
  'Superhero',
  'Fantasy',
  'Mystery',
  'Adventure',
  'Comedy',
  'Horror',
  'Cyberpunk',
  'Romance',
  'Slice of Life'
];

export const TONES = [
  'Inspirational',
  'Funny',
  'Action-Packed',
  'Serious',
  'Emotional',
  'Dark & Gritty',
  'Whimsical'
];

export const ART_STYLES = [
  {
    id: 'Modern Superhero Comic',
    name: 'Modern Superhero Comic',
    desc: 'Vibrant colors, bold dynamic inks, cinematic lighting (Marvel / DC style)',
    color: '#3B82F6',
    previewBadge: 'MARVEL/DC VIBES'
  },
  {
    id: 'Vintage Pop-Art',
    name: 'Vintage Pop-Art',
    desc: 'Roy Lichtenstein Ben-Day halftone dots, bold primary colors & thick lines',
    color: '#EF4444',
    previewBadge: 'RETRO 60s'
  },
  {
    id: 'Manga / Anime Noir',
    name: 'Manga / Anime Noir',
    desc: 'Intense speed lines, dramatic screentones, expressive character eyes',
    color: '#8B5CF6',
    previewBadge: 'SHONEN & NOIR'
  },
  {
    id: 'Dark Graphic Novel',
    name: 'Dark Graphic Novel',
    desc: 'High-contrast noir, deep stark shadows with selective striking colors (Sin City)',
    color: '#1E293B',
    previewBadge: 'FRANK MILLER'
  },
  {
    id: 'Saturday Morning Cartoon',
    name: 'Saturday Morning Cartoon',
    desc: 'Playful rounded curves, cheerful bright palette, slapstick expressions',
    color: '#F59E0B',
    previewBadge: 'ANIMATED FUN'
  },
  {
    id: 'Cyberpunk Synthwave',
    name: 'Cyberpunk Synthwave',
    desc: 'Neon magenta and cyan, holographic glows, futuristic rain aesthetics',
    color: '#06B6D4',
    previewBadge: 'NEON MATRIX'
  },
  {
    id: 'Watercolor Fantasy',
    name: 'Watercolor Fantasy',
    desc: 'Soft ethereal washes, dreamy lighting, fairy-tale storybook aesthetic',
    color: '#10B981',
    previewBadge: 'STUDIO GHIBLI'
  }
];

export const INSPIRATION_PROMPTS = [
  'A young inventor discovers a robot buried beneath her grandfather\'s workshop.',
  'A pizza delivery boy in year 3042 accidentally delivers to an alien warlord who falls in love with stuffed crust.',
  'A museum night-guard realizes the ancient superhero statues come alive after midnight to fight crime.',
  'A rookie mage whose spells only work when rhyming accidentally turns the kingdom\'s royal dragon into a golden retriever.',
  'Two rival detectives in a floating steampunk city must team up to solve the disappearance of gravity.',
  'A detective discovers that every crime in the city was accurately predicted in a vintage comic book series from 1952.',
  'A stray cat wearing a tiny cyber-collar helps an amnesiac hacker remember their lost identity.'
];
