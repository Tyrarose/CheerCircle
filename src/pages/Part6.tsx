// Part6.tsx
"use client";

import React from "react";
import QuizTemplate from "@/components/templates/QuizTemplate";
import { Part6Config } from "@/config/part6";

interface Part6Props {
  onNext: () => void;
  onPrevious: () => void;
}

const Part6 = ({ onNext, onPrevious }: Part6Props) => {
  return (
    <QuizTemplate 
      config={Part6Config}
      onNext={onNext}
      onPrevious={onPrevious}
    />
  );
};

export default Part6;