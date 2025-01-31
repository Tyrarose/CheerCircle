import { FC, useState } from "react";
import TextInput from "@/components/atoms/TextInput";

interface ExpandableQAProps {
  question: string;
  onChange: (value: string) => void; // Added onChange prop
}

const ExpandableQA: FC<ExpandableQAProps> = ({ question, onChange }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [answer, setAnswer] = useState("");

  const handleExpandToggle = () => {
    setIsExpanded((prev) => !prev);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setAnswer(value);
    onChange(value);
  };

  return (
    <div
      className={`p-3 w-full ${isExpanded ? "" : "rounded-[12px] border border-black-five"}`}
    >
      <div
        onClick={handleExpandToggle}
        className="cursor-pointer text-center flex items-center justify-center"
      >
        <span>{question}</span>
        <i
          className={`ml-2 fas ${isExpanded ? "fa-chevron-up" : "fa-chevron-down"}`}
        ></i>
      </div>
      {isExpanded && (
        <div className="mt-4">
          <TextInput
            value={answer}
            onChange={handleInputChange}
            placeholder="Your answer..."
            className="w-full p-3 border border-black-five text-black-five placeholder-black-five rounded-[12px] focus:outline-none focus:ring-1 focus:ring-black-five resize-none bg-transparent"
          />
        </div>
      )}
    </div>
  );
};

export default ExpandableQA;
