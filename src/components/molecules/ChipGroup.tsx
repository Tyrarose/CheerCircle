import { FC } from "react";
import Chip from "@/components/atoms/Chip";

interface ChipGroupProps {
  chips: { label: string; color: string }[];
  selectedChip: string | null;
  onChipSelect: (label: string) => void;
}

const ChipGroup: FC<ChipGroupProps> = ({ chips, selectedChip, onChipSelect }) => {
  return (
    <div className="flex flex-wrap justify-center gap-4 p-4">
      {chips.map((chip, index) => (
        <Chip
          key={index}
          label={chip.label}
          color={chip.color}
          isSelected={selectedChip === chip.label}
          onClick={() => onChipSelect(chip.label)}
          opacity={selectedChip ? (selectedChip === chip.label ? 1 : 0.5) : 1}
        />
      ))}
    </div>
  );
};

export default ChipGroup;