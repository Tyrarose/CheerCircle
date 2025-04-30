"use client";

import React, { useEffect } from "react";
import ProgressBar from "@/components/molecules/ProgressBar";
import Divider from "@/components/atoms/Divider";
import Button from "@/components/atoms/Button";
import CardAndChips from "@/components/organisms/CardAndChips";
import CardTextInput from "@/components/organisms/CardTextInput";
import QandAlong from "@/components/molecules/QandA-long";
import { useFormContext } from '../../context/FormContext';

const Part4 = ({ onNext, onPrevious }: { onNext: () => void; onPrevious: () => void }) => {
  const { updateField, getField } = useFormContext();

  // Required questions list
  const requiredFields = ["superpower", "season", "era", "googled", "million"];

  // Check if all required questions are answered
  const isNextEnabled = requiredFields.every((key) => 
    getField('part4', key)?.trim() !== '');

  // Handle answer change for text inputs
  const handleAnswerChange = (key: string, value: string) => {
    updateField('part4', key, value);
  };

  // Handle chip selection
  const handleChipSelect = (key: string, value: string) => {
    updateField('part4', key, value.trim());
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="max-w-screen-md mx-auto space-y-6">
      <div className="w-full">
        <ProgressBar totalSteps={7} currentStep={4} />
      </div>

      <div className="w-full text-center">
        <h1 className="text-2xl font-bold">Part 04: Whimsy</h1>
      </div>

      <div className="w-full space-y-6">
        <CardAndChips
          bgColor="bg-yellow-seven"
          question="If you were a season, which one?"
          followUpQuestion=""
          chips={[
            { color: "bg-orange-five", label: "Spring" },
            { color: "bg-yellow-five", label: "Summer" },
            { color: "bg-white", label: "Autumn" },
            { color: "bg-blue-five", label: "Winter" },
          ]}
          onChipSelect={(value) => handleChipSelect("season", value)}
        />
        <CardTextInput
          bgColor="bg-blue-seven"
          question="Dream superpower?"
          followUpQuestion=""
          value={getField('part4', 'superpower')}
          onChange={(value) => handleAnswerChange("superpower", value)}
        />
        <CardAndChips
          bgColor="bg-yellow-seven"
          question="Live in any era?"
          followUpQuestion="(hmm what would you do there)"
          chips={[
            { color: "bg-green-five", label: "Ancient Times" },
            { color: "bg-yellow-five", label: "The 1800s" },
            { color: "bg-red-five", label: "The Roaring '20s" },
            { color: "bg-blue-five", label: "The '80s" },
            { color: "bg-violet-five", label: "The Future" },
          ]}
          onChipSelect={(value) => handleChipSelect("era", value)}
        />
        <CardTextInput
          bgColor="bg-blue-seven"
          question="What's the last thing you Googled?"
          followUpQuestion=""
          value={getField('part4', 'googled')}
          onChange={(value) => handleAnswerChange("googled", value)}
        />
        <CardAndChips
          bgColor="bg-yellow-seven"
          question="First thing you'd do with a million?"
          followUpQuestion=""
          chips={[
            { color: "bg-green-five", label: "Travel the world" },
            { color: "bg-yellow-five", label: "Start a business" },
            { color: "bg-red-five", label: "Help family and friends" },
            { color: "bg-blue-five", label: "Invest and save" },
          ]}
          onChipSelect={(value) => handleChipSelect("million", value)}
        />
        <Divider text="Follow up Question (Skip if you want)" />
        <QandAlong
          labelText="If money wasn't an issue, how would you spend your time?"
          inputId="moneyNotIssue"
          inputPlaceholder=""
          value={getField('part4', 'moneyNotIssue')}
          onChange={(e) => updateField('part4', 'moneyNotIssue', e.target.value)} 
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

export default Part4;