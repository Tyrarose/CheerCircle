"use client";

import React, { useState, useEffect } from "react";

import ProgressBar from "@/components/molecules/ProgressBar";
import Divider from "@/components/atoms/Divider";
import Button from "@/components/atoms/Button";
import CardAndChips from "@/components/organisms/CardAndChips";
import CardTextInput from "@/components/organisms/CardTextInput";
import QandAlong from "@/components/molecules/QandA-long";

const Part4 = ({ onNext, onPrev }: { onNext: () => void; onPrev: () => void; }) => {
  const [answers, setAnswers] = useState<{ [key: string]: string }>({
    superpower: "",
    season: "",
    era: "",
    googled: "",
    million: "",
    moneyNotIssue: "",
  });

  const [selectedBonus, setSelectedBonus] = useState<string | null>(null);
  const [bonusAnswers, setBonusAnswers] = useState<{ [key: string]: string }>({
    moneyNotIssue: "",
  });

  // Required questions list
  const requiredFields = ["superpower", "season", "era", "googled", "million"];

  // Check if all required questions are answered
  const isNextEnabled = requiredFields.every((key) => answers[key]?.trim() !== "");

  // Handle answer change for required questions
  const handleAnswerChange = (key: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  };

  // Handle answer change for bonus questions
  const handleBonusAnswerChange = (key: string, value: string) => {
    setBonusAnswers((prev) => ({ ...prev, [key]: value }));
  };

  // Handle chip selection for required questions
  const handleChipSelect = (key: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [key]: value.trim() }));
  };

  // Save form data function
  const saveFormData = async (formData: { [key: string]: any }) => {
    localStorage.setItem("part2-answers", JSON.stringify(formData));
  };

  const handleNext = async () => {
    await saveFormData(answers);
    onNext();
  };

  const isPrevEnabled = false;

  const handlePrev = async () => {
    await saveFormData(answers);
    onPrev();
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="max-w-screen-md mx-auto space-y-6">
      <div className="w-full">
        <ProgressBar totalSteps={6} currentStep={4} />
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
          value={answers.superpower}
          onChange={(value) => handleAnswerChange("superpower", value)}
        />
        <CardAndChips
          bgColor="bg-yellow-seven"
          question="Live in any era?"
          followUpQuestion="(hmm what would you do there)"
          chips={[
            { color: "bg-green-five", label: "Ancient Times" },
            { color: "bg-yellow-five", label: "The 1800s" },
            { color: "bg-red-five", label: "The Roaring ‘20s" },
            { color: "bg-blue-five", label: "The ‘80s" },
            { color: "bg-violet-five", label: "The Future" },
          ]}
          onChipSelect={(value) => handleChipSelect("era", value)}
        />
        <CardTextInput
          bgColor="bg-blue-seven"
          question="What’s the last thing you Googled?"
          followUpQuestion=""
          value={answers.googled}
          onChange={(value) => handleAnswerChange("googled", value)}
        />
        <CardAndChips
          bgColor="bg-yellow-seven"
          question="First thing you’d do with a million?"
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
          labelText="If money wasn’t an issue, how would you spend your time?"
          inputId=""
          inputPlaceholder=""
          value={answers.moneyNotIssue || ""}
          onChange={(e) => setAnswers((prev) => ({ ...prev, moneyNotIssue: e.target.value }))} 
        />
      </div>

      {/* Sticky Next Button */}
      <div className="fixed bottom-0 left-0 w-full bg-yellow-eight shadow-lg p-4 flex justify-center">
        <Button onClick={handlePrev} disabled={isPrevEnabled}>
          Previous
        </Button>
        <Button onClick={handleNext} disabled={!isNextEnabled}>
          Next
        </Button>
      </div>
    </div>
  );
};

export default Part4;
