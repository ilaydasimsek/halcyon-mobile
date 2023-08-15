export type Chakra =
  | 'Muladhara'
  | 'Svadhishthana'
  | 'Manipura'
  | 'Anahata'
  | 'Vishuddha'
  | 'Ajna'
  | 'Sahasrara';

export type MuscleGroup = {
  name: string;
};

export type YogaStyle = {
  name: string;
  description: string;
};

export type YogaCategory = {
  name: string;
  description: string;
};

export type YogaPose = {
  name: string;
  sanskrit_name: string;
  description: string;
  difficulty: number;
  muscle_groups: MuscleGroup[];
  chakras: Chakra[];
  styles: YogaStyle[];
  categories: YogaCategory[];
  audio_url: string;
  image_url: string;
};

export type YogaPractice = {
  title: string;
  description: string;
  benefits_description: string;
  cover_image_url: string;
  created_by: string;
  created_at: Date;
  yoga_poses: YogaPose[];
};

export type YogaChallenge = {
  title: string;
  description: string;
  benefits_description: string;
  cover_image_url: string;
  created_by: string;
  created_at: Date;
  practices: YogaPractice[];
};
