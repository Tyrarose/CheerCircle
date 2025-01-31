import { FC } from "react";

interface ChipProps {
  label: string;
  color: string;
  isSelected?: boolean;
  onClick?: () => void;
  opacity?: number;
}

const Chip: FC<ChipProps> = ({ label, color, isSelected, onClick, opacity = 1 }) => {
  const baseColorClass = color;
  const textColor = ["bg-red-five", "bg-pink", "bg-violet-five", "bg-black-five", "bg-blue-five"].includes(color)
    ? "text-white"
    : "text-black-five";

  return (
    <button
      onClick={onClick}
      className={`
        px-8 py-3 
        rounded-full 
        text-sm 
        font-medium 
        ${baseColorClass} 
        ${textColor}
      `}
      style={{
        opacity,
        boxShadow: isSelected ? "0 0 8px 2px rgba(0, 0, 0, 0.2)" : "none",
        transition: "all 0.2s ease",
      }}
    >
      {label}
    </button>
  );
};

export default Chip;