// Part5.tsx
"use client";

import React from "react";
import QuizTemplate from "@/components/templates/QuizTemplate";
import { Part5Config } from "@/config/part5";

interface Part5Props {
  onNext: () => void;
  onPrevious: () => void;
}

const Part5 = ({ onNext, onPrevious }: Part5Props) => {
  return (
    <QuizTemplate 
      config={Part5Config}
      onNext={onNext}
      onPrevious={onPrevious}
    />
  );
};

export default Part5;