import { FC, useState } from "react";
import ChipGroup from "@/components/molecules/ChipGroup";

interface QuestionAndChipsProps {
  labelText: React.ReactNode;
  chips: { label: string; color: string }[]; // Expect chips to always be an array
  onChipSelect: (value: string) => void;
}

const QuestionAndChips: FC<QuestionAndChipsProps> = ({ labelText, chips = [], onChipSelect }) => { // Default to an empty array if chips is undefined
  const [selectedChip, setSelectedChip] = useState<string | null>(null);

  const handleChipSelect = (label: string) => {
    setSelectedChip(label);
    onChipSelect(label);
  };

  return (
    <div className="flex flex-col items-left justify-center">
      <h2 className="block text-sm font-semibold text-black-five mb-1">{labelText}</h2>
      <ChipGroup 
        chips={chips} 
        onChipSelect={handleChipSelect} 
        selectedChip={selectedChip} 
      />
    </div>
  );
};


export default QuestionAndChips;
