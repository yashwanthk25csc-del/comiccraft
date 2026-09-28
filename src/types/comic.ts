export type BubbleType = 'speech' | 'thought' | 'shout' | 'whisper' | 'radio';

export type CameraAngle =
  | 'Close-up'
  | 'Medium Shot'
  | 'Wide Angle'
  | 'Bird\'s Eye'
  | 'Low Angle'
  | 'Dramatic Dutch Angle'
  | 'Over-the-Shoulder';

export interface Dialogue {
  id: string;
  character: string;
  text: string;
  bubbleType: BubbleType;
  position?: { x: number; y: number };
}

export interface Character {
  id: string;
  name: string;
  role: 'Protagonist' | 'Antagonist' | 'Sidekick' | 'Mentor' | 'Supporting' | 'Extra';
  appearance: string;
  personality: string;
  abilities?: string;
  relationships?: string;
  avatarColor: string;
  avatarIcon?: string;
}

export interface ComicPanel {
  panel_number: number;
  scene_description: string;
  characters: string[];
  action: string;
  dialogue: Dialogue[];
  narration: string;
  image_prompt: string;
  sound_effect?: string;
  camera_angle: CameraAngle;
  custom_image?: string;
  theme_color?: string;
}

export type ComicLayout = 'classic-grid' | 'dynamic-action' | 'vertical-strip' | 'cinematic';

export interface ComicStory {
  id: string;
  title: string;
  genre: string;
  tone: string;
  targetAudience: string;
  artStyle: string;
  summary: string;
  characters: Character[];
  panels: ComicPanel[];
  createdAt: string;
  updatedAt: string;
  issueNumber: number;
  layout: ComicLayout;
  author?: string;
}

export interface GenerationRequest {
  prompt: string;
  genre: string;
  tone: string;
  panelCount: number;
  targetAudience: string;
  artStyle: string;
  characters?: Array<{
    name: string;
    role?: string;
    appearance?: string;
    personality?: string;
    abilities?: string;
  }>;
}
