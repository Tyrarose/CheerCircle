export type ComponentType = 
  | "QandAshort" 
  | "QandAlong" 
  | "TaskPicture" 
  | "DatePicker" 
  | "QuestionAndChips" 
  | "ExpandableQA" 
  | "CardTextInput" 
  | "CardAndChips" 
  | "SwipeableCardCarousel"
  | "Divider";

export interface ChipOption {
  label: string;
  color: string;
}

export interface QuizStep {
  key: string;
  type: ComponentType;
  question: string;
  isRequired: boolean;
  inputPlaceholder?: string;
  followUpQuestion?: string;
  bgColor?: string;
  options?: ChipOption[];
  defaultImage?: string;
}

export interface QuizPartConfig {
  id: number;
  partName: string;
  partId: string;
  title: string;
  totalSteps: number;
  defaultImages?: Record<string, string>;
  requiredFields: string[];
  steps: QuizStep[];
  bonusSteps?: QuizStep[];
}