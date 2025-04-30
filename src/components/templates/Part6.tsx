"use client";

import React, { useEffect } from "react";
import ProgressBar from "@/components/molecules/ProgressBar";
import Button from "@/components/atoms/Button";
import CardAndChips from "@/components/organisms/CardAndChips";
import ExpandableQA from "@/components/molecules/ExpandableQA";
import { useFormContext } from '../../context/FormContext';

const Part6 = ({ onNext, onPrevious }: { onNext: () => void; onPrevious: () => void }) => {
  const { updateField, getField } = useFormContext();

  const handleChipSelect = (key: string, value: string) => {
    updateField('part6', key, value);
  };

  const isNextEnabled = [
    getField('part6', 'riseOrSet'),
    getField('part6', 'dogOrCat'),
    getField('part6', 'flavors'),
    getField('part6', 'hobby'),
  ].every((value) => value?.trim() !== "");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="max-w-screen-md mx-auto space-y-6">
      <div className="w-full">
        <ProgressBar totalSteps={7} currentStep={6} />
      </div>

      <div className="w-full text-center">
        <h1 className="text-2xl font-bold">Part 06: Choices</h1>
      </div>

      <div className="w-full space-y-6">
        <CardAndChips
          bgColor="bg-yellow-seven"
          question="Would you choose...?"
          followUpQuestion=""
          chips={[
              { color: "bg-yellow-five", label: "Sunrise in the mountains" },
              { color: "bg-orange-five", label: "Sunset over the ocean" },
            ]}
          onChipSelect={(value) => handleChipSelect("riseOrSet", value)}
          
        />
        <ExpandableQA 
          question="Mind explaining why did you choose your previous answer?" 
          onChange={(value) => updateField('part6', 'riseOrSetWhy', value)} 
        />
        <CardAndChips
          bgColor="bg-yellow-seven"
          question="Would you choose...?"
          followUpQuestion=""
          chips={[
              { color: "bg-green-five", label: "Dog" },
              { color: "bg-yellow-five", label: "Cat" },
              { color: "bg-red-five", label: "Both!" },
            ]}
          onChipSelect={(value) => handleChipSelect("dogOrCat", value)}
        />
        <ExpandableQA 
          question="Mind explaining why did you choose your previous answer?"
          onChange={(value) => updateField('part6', 'dogOrCatWhy', value)} 
        />
        <CardAndChips
          bgColor="bg-yellow-seven"
          question="Would you choose...?"
          followUpQuestion=""
          chips={[
              { color: "bg-green-five", label: "Sweet" },
              { color: "bg-yellow-five", label: "Salty" },
              { color: "bg-red-five", label: "Spicy" },
              { color: "bg-blue-five", label: "Sour" },
            ]}
          onChipSelect={(value) => handleChipSelect("flavors", value)}
        />
        <CardAndChips
          bgColor="bg-yellow-seven"
          question="Would you choose...?"
          followUpQuestion=""
          chips={[
              { color: "bg-pink", label: "Books" },
              { color: "bg-yellow-five", label: "Movies" },
              { color: "bg-black-five", label: "Music" },
              { color: "bg-violet-five", label: "Instruments" },
            ]}
          onChipSelect={(value) => handleChipSelect("hobby", value)}
        />
      </div>

      {/* Sticky Next Button */}
      <div className="fixed bottom-0 left-0 w-full bg-yellow-eight shadow-lg p-4 flex justify-center">
        <Button onClick={onPrevious}>
          Previous
        </Button>
        <Button onClick={onNext} disabled={!isNextEnabled}>
          Next
        </Button>
      </div>
    </div>
  );
};

export default Part6;