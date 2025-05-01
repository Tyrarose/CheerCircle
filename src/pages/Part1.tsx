// Part1.tsx
"use client";

import React from "react";
import QuizTemplate from "@/components/templates/QuizTemplate";
import { Part1Config } from "@/config/part1";

interface Part1Props {
  onNext: () => void;
  onPrevious?: () => void;
  cacheImage?: (key: string, file: File) => void;
}

const Part1 = ({ onNext, cacheImage }: Part1Props) => {
  return (
    <QuizTemplate 
      config={Part1Config}
      onNext={onNext}
      cacheImage={cacheImage}
    />
  );
};

export default Part1;