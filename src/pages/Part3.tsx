// Part3.tsx
"use client";

import React from "react";
import QuizTemplate from "@/components/templates/QuizTemplate";
import { Part3Config } from "@/config/part3";

interface Part3Props {
  onNext: () => void;
  onPrevious: () => void;
}

const Part3 = ({ onNext, onPrevious }: Part3Props) => {
  return (
    <QuizTemplate 
      config={Part3Config}
      onNext={onNext}
      onPrevious={onPrevious}
    />
  );
};

export default Part3;