import { FC } from "react";
import ChipGroup from "@/components/molecules/ChipGroup";

interface QuestionAndChipsProps {
  labelText: React.ReactNode;
  chips: { label: string; color: string }[];
  onChipSelect: (value: string) => void;
  selectedChip: string | null;
}

const QuestionAndChips: FC<QuestionAndChipsProps> = ({
  labelText,
  chips = [],
  onChipSelect,
  selectedChip,
}) => {
  const handleChipSelect = (label: string) => {
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
