import React from "react";

interface LabelProps {
  text: React.ReactNode;
  isRequired?: boolean;
  font?: string;
}

const Label = ({ text, font, isRequired = false }: LabelProps) => {
  return (
    <label className={`block mb-1 ${font ? font : "text-black-five text-sm font-semibold"}`}>
      {text}
      {isRequired && <span className="text-red-500 ml-1">*</span>}
    </label>
  );
};

export default Label;
