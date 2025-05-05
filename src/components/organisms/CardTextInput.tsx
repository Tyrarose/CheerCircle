"use client";

import { FC } from "react";
import Card from "@/components/molecules/quiz/Card";
import TextInput from "@/components/atoms/TextInput";

interface CardTextInputProps {
  bgColor: string;
  question: string;
  followUpQuestion: string;
  value: string;
  onChange?: (value: string) => void;
}

const CardTextInput: FC<CardTextInputProps> = ({
  bgColor,
  question,
  followUpQuestion,
  value,
  onChange,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (onChange) {
      onChange(e.target.value);
    }
  };

  return (
    <Card bgColor={bgColor}>
      <div className="flex flex-col justify-between h-full">
        {/* Question and Follow-up at the top */}
        <div className="flex flex-col items-center mb-6">
          <h2 className="text-lg font-semibold text-black-five text-center">
            {question}
          </h2>
          <p className="text-sm text-black-five text-center">{followUpQuestion}</p>
        </div>

        {/* TextInput using remaining space */}
        <div className="flex-grow p-4 flex flex-col">
          <TextInput
            value={value}
            onChange={handleChange}
            placeholder="Your answer..."
            className="flex-grow" // Ensure TextInput takes full height
          />
        </div>
      </div>
    </Card>
  );
};

export default CardTextInput;