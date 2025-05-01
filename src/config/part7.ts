import { QuizPartConfig } from '../types/quiz';

export const Part7Config: QuizPartConfig = {
  id: 7,
  partName: "Part 07",
  partId: "part7",
  title: "Part 07. What If",
  totalSteps: 7,
  requiredFields: [
  ],
  steps: [
    {
      key: "skill",
      type: "CardTextInput",
      bgColor: "bg-red-seven",
      question: "Master any skill instantly—what's it gonna be?",
      followUpQuestion: "",
      isRequired: false,
    },
    {
        key: "wantToTry",
        type: "CardTextInput",
        bgColor: "bg-green-seven",
        question: "Always wanted to try but haven't—why?",
        followUpQuestion: "",
        isRequired: false,
    },
    {
        key: "bucketList",
        type: "CardAndChips",
        bgColor: "bg-blue-seven",
        question: "What's a bucket list item you're excited to check off soon—and does it involve a dream destination?",
        followUpQuestion: "To where?",
        options: [
            { color: "bg-green-five", label: "A quiet beach" },
            { color: "bg-yellow-five", label: "Bustling city adventure" },
            { color: "bg-red-five", label: "Historical landmarks" },
            { color: "bg-blue-five", label: "Off-the-grid wilderness" },
        ], 
        isRequired: false,
    },
    {
        key: "buyDreamHome",
        type: "CardTextInput",
        bgColor: "bg-yellow-seven",
        question: "First thing you'd buy for your dream home?",
        followUpQuestion: "",
        isRequired: false,
    },
    {
        key: "ChildhoodActivity",
        type: "CardTextInput",
        bgColor: "bg-red-seven",
        question: "Childhood activity you stopped but wanna try again?",
        followUpQuestion: "",
        isRequired: false,
    },
    {
        key: "exploreGoal",
        type: "CardTextInput",
        bgColor: "bg-green-seven",
        question: "Small goal/hobby you'd love to explore?",
        followUpQuestion: "",
        isRequired: false,
    },
  ],
};