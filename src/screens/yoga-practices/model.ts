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
  muscleGroups: MuscleGroup[];
  chakras: Chakra[];
  styles: YogaStyle[];
  categories: YogaCategory[];
  audioUrl: string;
  imageUrl: string;
};

export type YogaPractice = {
  title: string;
  description: string;
  benefitsDescription: string;
  coverImageUrl: string;
  createdBy: string;
  createdAt: Date;
  yogaPoses: YogaPose[];
};

export type YogaChallenge = {
  title: string;
  description: string;
  benefitsDescription: string;
  coverImageUrl: string;
  createdBy: string;
  createdAt: Date;
  practices: YogaPractice[];
};
