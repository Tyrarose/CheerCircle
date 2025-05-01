import { QuizPartConfig } from '../types/quiz';

export const Part3Config: QuizPartConfig = {
  id: 3,
  partName: "Part 03",
  partId: "part3",
  title: "Part 03. Vibes",
  totalSteps: 7,
  requiredFields: [
    "animals", 
    // "emoji", 
    // "neverForget"
  ],
  steps: [
    {
      key: "animals",
      type: "CardTextInput",
      bgColor: "bg-blue-seven",
      question: "If we were animals, what would we be?",
      followUpQuestion: "Who would be the predator? We're both prey?",
      isRequired: true,
    },
    {
      key: "emoji",
      type: "CardTextInput",
      bgColor: "bg-red-seven",
      question: "One emoji or word that describes me?",
      followUpQuestion: "",
      isRequired: true,
    },
    {
      key: "neverForget",
      type: "CardTextInput",
      bgColor: "bg-yellow-seven",
      question: "Something I did that you'd #NeverForget?",
      followUpQuestion: "and why?",
      isRequired: true,
    },
  ],
  bonusSteps: [
    {
      key: "dessert",
      type: "CardTextInput",
      bgColor: "bg-green-seven",
      question: "If I were a dessert, what would I be?",
      followUpQuestion: "Sweet or spicy?",
      isRequired: false,
    },
    {
      key: "adventure",
      type: "CardTextInput",
      bgColor: "bg-red-seven",
      question: "Dream adventure with me?",
      followUpQuestion: "Where would we go first?",
      isRequired: false,
    },
    {
      key: "song",
      type: "CardTextInput",
      bgColor: "bg-yellow-seven",
      question: "A song that reminds you of us?",
      followUpQuestion: "Why?",
      isRequired: false,
    },
  ],
};