import React from "react";

interface LabelProps {
  text: React.ReactNode;
  isRequired?: boolean;
}

const Label = ({ text, isRequired = false }: LabelProps) => {
  return (
    <label className="block text-sm font-semibold text-black-five mb-1">
      {text}
      {isRequired && <span className="text-red-500 ml-1">*</span>}
    </label>
  );
};

export default Label;
