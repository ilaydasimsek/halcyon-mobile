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
  id: string;
  name: string;
  description: string;
};

export type YogaCategory = {
  id: string;
  name: string;
  description: string;
};

export type YogaPose = {
  id: string;
  name: string;
  sanskritName: string;
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
  id: string;
  title: string;
  description: string;
  benefitsDescription: string;
  coverImageUrl: string;
  duration: number;
  createdBy: string;
  createdAt: Date;
  yogaPoses: YogaPose[];
  muscleGroupsDistribution: MuscleGroupsDistributionItem[];
};

export type YogaChallenge = {
  id: string;
  title: string;
  description: string;
  benefitsDescription: string;
  coverImageUrl: string;
  createdBy: string;
  createdAt: Date;
  practices: YogaPractice[];
};

export type MuscleGroupsDistributionItem = {
  name: string;
  count: number;
  id: string;
};
