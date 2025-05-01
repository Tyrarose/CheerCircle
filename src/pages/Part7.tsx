// Part7.tsx
"use client";

import React from "react";
import QuizTemplate from "@/components/templates/QuizTemplate";
import { Part7Config } from "@/config/part7";

interface Part7Props {
  onNext: () => void;
  onPrevious: () => void;
}

const Part7 = ({ onNext, onPrevious }: Part7Props) => {
  return (
    <QuizTemplate 
      config={Part7Config}
      onNext={onNext}
      onPrevious={onPrevious}
    />
  );
};

export default Part7;