"use client";

import { FC, useState } from "react";
import Card from "@/components/molecules/Card";
import ChipGroup from "@/components/molecules/ChipGroup";

interface CardAndChipsProps {
  bgColor: string;
  question: string;
  followUpQuestion: string;
  chips: { label: string; color: string }[];
  onChipSelect: (value: string) => void;
}

const CardAndChips: FC<CardAndChipsProps> = ({ 
  bgColor, 
  question, 
  followUpQuestion, 
  chips, 
  onChipSelect 
}) => {
  const [selectedChip, setSelectedChip] = useState<string | null>(null);

  const handleChipSelect = (label: string) => {
    setSelectedChip(label);
    onChipSelect(label);
  };

  return (
    <Card bgColor={bgColor}>
      <div className="flex flex-col justify-between h-full">
        {/* Question and Follow-up at the top */}
        <div className="flex flex-col items-center mb-6">
          <h2 className="text-lg font-semibold text-black-five text-center">{question}</h2>
          <p className="text-sm text-black-five text-center">{followUpQuestion}</p>
        </div>

        {/* ChipGroup centered in the remaining space */}
        <div className="flex flex-grow justify-center items-center">
          <ChipGroup 
            chips={chips} 
            selectedChip={selectedChip} 
            onChipSelect={handleChipSelect} 
          />
        </div>
      </div>
    </Card>
  );
};

export default CardAndChips;