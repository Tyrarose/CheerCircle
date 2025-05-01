import { QuizPartConfig } from '../types/quiz';

export const Part5Config: QuizPartConfig = {
  id: 5,
  partName: "Part 05",
  partId: "part5",
  title: "Part 05. What If",
  totalSteps: 6,
  requiredFields: [
    "clothing",
    // "door",
  ],
  steps: [
    {
      key: "clothing",
      type: "CardAndChips",
      bgColor: "bg-green-seven",
      question: "If you were clothing, what would you be?",
      options: [
        { color: "bg-orange-five", label: "Hoodie" },
        { color: "bg-yellow-five", label: "Sunglasses" },
        { color: "bg-red-five", label: "Sneakers" },
        { color: "bg-pink", label: "Fancy dress" },
        { color: "bg-blue-five", label: "Comfy pajamas" },
      ],
      isRequired: true,
    },
    {
      key: "door",
      type: "CardAndChips",
      bgColor: "bg-yellow-seven",
      question: "If you were a door, what kind?",
      options: [
        { color: "bg-green-five", label: "A grand, ornate castle door" },
        { color: "bg-yellow-five", label: "A simple, sturdy wooden door" },
        { color: "bg-red-five", label: " A sleek, modern glass door" },
        { color: "bg-blue-five", label: "A mysterious, hidden trapdoor" },
        { color: "bg-violet-five", label: "A brightly colored front door" },
      ],
      isRequired: true,
    },
    {
      key: "divider",
      type: "Divider",
      question: "",
      isRequired: false,
    },
    {
      key: "talkToAnimal",
      type: "QandAlong",
      question: "Talk to any animal for a day—which one? What would you ask?",
      followUpQuestion: "Type here...",
      isRequired: false,
    },
    {
        key: "swapLife",
        type: "QandAlong",
        question: "Swap lives with someone for a day? Who and why?",
        followUpQuestion: "Type here...",
        isRequired: false,
      },
  ],
};