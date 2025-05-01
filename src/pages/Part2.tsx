// Part2.tsx
"use client";

import React from "react";
import QuizTemplate from "@/components/templates/QuizTemplate";
import { Part2Config } from "@/config/part2";

interface Part2Props {
  onNext: () => void;
  onPrevious: () => void;
}

const Part2 = ({ onNext, onPrevious }: Part2Props) => {
  return (
    <QuizTemplate 
      config={Part2Config}
      onNext={onNext}
      onPrevious={onPrevious}
    />
  );
};

export default Part2;