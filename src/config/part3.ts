import { QuizPartConfig } from '../types/quiz';

export const Part3Config: QuizPartConfig = {
  id: 3,
  partName: "Part 03",
  partId: "part3",
  title: "Part 03. Vibes",
  totalSteps: 7,
  requiredFields: [
    "emoji", 
    "neverForget"
  ],
  steps: [
    {
      key: "neverForget",
      type: "CardTextInput",
      bgColor: "bg-green-seven",
      question: "Something I did that you'd #NeverForget?",
      followUpQuestion: "and why?",
      isRequired: true,
    },
    {
      key: "advice",
      type: "CardTextInput",
      bgColor: "bg-red-seven",
      question: "What do you want to say your younger self?",
      followUpQuestion: "and why?",
      isRequired: true,
    },
    {
      key: "seenOrUnderstood",
      type: "CardTextInput",
      bgColor: "bg-yellow-seven",
      question: "What makes you feel deeply seen or understood?",
      followUpQuestion: "and why?",
      isRequired: true,
    },
  ],
  bonusSteps: [
    {
      key: "dessert",
      type: "CardTextInput",
      bgColor: "bg-green-seven",
      question: "If we were animals, what would we be?",
      followUpQuestion: "Who would be the predator? We're both prey? We're both cats!",
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
      bgColor: "bg-blue-seven",
      question: "A song that reminds you of us?",
      followUpQuestion: "Why?",
      isRequired: false,
    },
  ],
};