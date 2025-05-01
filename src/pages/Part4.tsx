// Part5.tsx
"use client";

import React from "react";
import QuizTemplate from "@/components/templates/QuizTemplate";
import { Part4Config } from "@/config/part4";

interface Part4Props {
  onNext: () => void;
  onPrevious: () => void;
}

const Part4 = ({ onNext, onPrevious }: Part4Props) => {
  return (
    <QuizTemplate 
      config={Part4Config}
      onNext={onNext}
      onPrevious={onPrevious}
    />
  );
};

export default Part4;