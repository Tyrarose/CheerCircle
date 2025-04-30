"use client";

import React, { useEffect } from "react";
import ProgressBar from "@/components/molecules/ProgressBar";
import Button from "@/components/atoms/Button";
import CardAndChips from "@/components/organisms/CardAndChips";
import CardTextInput from "@/components/organisms/CardTextInput";
import { useFormContext } from '../../context/FormContext';

const Part7 = ({ onNext, onPrevious }: { onNext: () => void; onPrevious: () => void }) => {
  const { updateField, getField, submitAllData } = useFormContext();

  const handleAnswerChange = (key: string, value: string) => {
    updateField('part7', key, value);
  };

  const handleChipSelect = (key: string, value: string) => {
    updateField('part7', key, value.trim());
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="max-w-screen-md mx-auto space-y-6">
      <div className="w-full">
        <ProgressBar totalSteps={7} currentStep={7} />
      </div>

      <div className="w-full text-center">
        <h1 className="text-2xl font-bold">Part 07: Dig deeper? (skippable)</h1>
      </div>

      <div className="w-full space-y-6">
        <CardTextInput
          bgColor="bg-red-seven"
          question="Master any skill instantly—what's it gonna be?"
          followUpQuestion=""
          value={getField('part7', 'skill')}
          onChange={(value) => handleAnswerChange("skill", value)}
        />
        <CardTextInput
          bgColor="bg-green-seven"
          question="Always wanted to try but haven't—why?"
          followUpQuestion=""
          value={getField('part7', 'wantToTry')}
          onChange={(value) => handleAnswerChange("wantToTry", value)}
        />
        <CardAndChips
          bgColor="bg-blue-seven"
          question="What's a bucket list item you're excited to check off soon—and does it involve a dream destination?"
          followUpQuestion="To where?"
          chips={[
            { color: "bg-green-five", label: "A quiet beach" },
            { color: "bg-yellow-five", label: "Bustling city adventure" },
            { color: "bg-red-five", label: "Historical landmarks" },
            { color: "bg-blue-five", label: "Off-the-grid wilderness" },
          ]}
          onChipSelect={(value) => handleChipSelect("bucketList", value)}
        />
        <CardTextInput
          bgColor="bg-yellow-seven"
          question="First thing you'd buy for your dream home?"
          followUpQuestion=""
          value={getField('part7', 'buyDreamHome')}
          onChange={(value) => handleAnswerChange("buyDreamHome", value)}
        />
        <CardTextInput
          bgColor="bg-red-seven"
          question="Childhood activity you stopped but wanna try again?"
          followUpQuestion=""
          value={getField('part7', 'ChildhoodActivity')}
          onChange={(value) => handleAnswerChange("ChildhoodActivity", value)}
        />
        <CardTextInput
          bgColor="bg-green-seven"
          question="Small goal/hobby you'd love to explore?"
          followUpQuestion=""
          value={getField('part7', 'exploreGoal')}
          onChange={(value) => handleAnswerChange("exploreGoal", value)}
        />
      </div>

      {/* Sticky Next Button */}
      <div className="fixed bottom-0 left-0 w-full bg-yellow-eight shadow-lg p-4 flex justify-center">
        <Button onClick={onPrevious}>
          Previous
        </Button>
        <Button onClick={() => {
          submitAllData();
          onNext();
        }}>
          SUBMIT ANSWERS !!!
        </Button>
      </div>
    </div>
  );
};

export default Part7;