import { QuizPartConfig } from '../types/quiz';

export const Part2Config: QuizPartConfig = {
  id: 2,
  partName: "Part 02",
  partId: "part2",
  title: "Part 02. Faves",
  totalSteps: 6,
  requiredFields: [
    // "lazyDayActivity",
    "faveWeather",
    // "currentObsession",
    // "childhoodMemory",
  ],
  steps: [
    {
      key: "lazyDayActivity",
      type: "CardTextInput",
      bgColor: "bg-red-seven",
      question: "How do you chill on lazy days?",
      followUpQuestion: "What's your comfort food that day?",
      isRequired: true,
    },
    {
      key: "faveWeather",
      type: "CardAndChips",
      bgColor: "bg-blue-seven",
      question: "Fave weather?",
      followUpQuestion: "",
      options: [
        { color: "bg-yellow-five", label: "Sunny" },
        { color: "bg-black-five", label: "Rainy" },
        { color: "bg-white", label: "Cloudy" },
        { color: "bg-blue-five", label: "Snowy" },
        { color: "bg-green-five", label: "Breezy" },
      ],
      isRequired: true,
    },
    {
      key: "currentObsession",
      type: "CardTextInput",
      bgColor: "bg-green-seven",
      question: "Current obsession",
      followUpQuestion: "Could be a song, TV show, or book?",
      isRequired: true,
    },
    {
      key: "childhoodMemory",
      type: "CardTextInput",
      bgColor: "bg-yellow-seven",
      question: "Fave childhood memory/game?",
      followUpQuestion: "",
      isRequired: true,
    },
    {
      key: "divider",
      type: "Divider",
      question: "",
      isRequired: false,
    },
    {
      key: "mostComforting",
      type: "QandAlong",
      question: "Most comforting thing someone's done for you?",
      inputPlaceholder: "Share your experience",
      isRequired: false,
    },
  ],
};