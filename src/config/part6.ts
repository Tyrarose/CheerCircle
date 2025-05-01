import { QuizPartConfig } from '../types/quiz';

export const Part6Config: QuizPartConfig = {
  id: 6,
  partName: "Part 06",
  partId: "part6",
  title: "Part 06. What If",
  totalSteps: 6,
  requiredFields: [
    "riseOrSet",
    // "dogOrCat",
    // "flavors",
    // "hobby",
  ],
  steps: [
    {
      key: "riseOrSet",
      type: "CardAndChips",
      bgColor: "bg-yellow-seven",
      question: "Would you choose...?",
      followUpQuestion: "",
      options: [
        { color: "bg-yellow-five", label: "Sunrise in the mountains" },
        { color: "bg-orange-five", label: "Sunset over the ocean" },
      ],
      isRequired: true,
    },
    {
      key: "riseOrSetWhy",
      type: "ExpandableQA",
      question: "Mind explaining why did you choose your previous answer?",
      isRequired: true,
    },
    {
        key: "dogOrCat",
        type: "CardAndChips",
        bgColor: "bg-yellow-seven",
        question: "Would you choose...?",
        followUpQuestion: "",
        options: [
            { color: "bg-blue-five", label: "Dog" },
			{ color: "bg-red-five", label: "Cat" },
			{ color: "bg-violet-five", label: "Both!" },
        ],
        isRequired: true,
    },
    {
        key: "dogOrCatWhy",
        type: "ExpandableQA",
        question: "Mind explaining why did you choose your previous answer?",
        isRequired: true,
    },
    {
        key: "flavors",
        type: "CardAndChips",
        bgColor: "bg-yellow-seven",
        question: "Would you choose...?",
        followUpQuestion: "",
        options: [
            { color: "bg-yellow-five", label: "Sweet" },
			{ color: "bg-blue-five", label: "Salty" },
			{ color: "bg-red-five", label: "Spicy" },
			{ color: "bg-green-five", label: "Sour" },
        ],
        isRequired: true,
    },
    {
        key: "hobby",
        type: "CardAndChips",
        bgColor: "bg-yellow-seven",
        question: "Would you choose...?",
        followUpQuestion: "",
        options: [
            { color: "bg-pink", label: "Books" },
			{ color: "bg-yellow-five", label: "Movies" },
			{ color: "bg-black-five", label: "Music" },
			{ color: "bg-violet-five", label: "Instruments" },
        ],
        isRequired: true,
    },
  ],
};