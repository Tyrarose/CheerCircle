"use client";

import React, { useState } from "react";

import ProgressBar from "@/components/molecules/ProgressBar";
import Button from "@/components/atoms/Button";
import CardAndChips from "@/components/organisms/CardAndChips";
import CardTextInput from "@/components/organisms/CardTextInput";

const Part7 = ({ onNext, onPrev }: { onNext: () => void; onPrev: () => void; }) => {
  const [answers, setAnswers] = useState<{ [key: string]: string }>({
    skill: "",
    wantToTry: "",
    bucketList: "",
    buyDreamHome: "",
    ChildhoodActivity: "",
    exploreGoal: "",
  });

  const handleAnswerChange = (key: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  };

  const handleChipSelect = (key: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [key]: value.trim() }));
  };

  // Reusable save method to export data as JSON
  const saveFormData = () => {
    const jsonString = JSON.stringify(answers, null, 2);
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "part7-answers.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Handle Submit button click
  const handleSubmit = async () => {
    saveFormData();
    // Show a confirmation message or redirect if needed
    alert("Your answers have been saved!");
  };

  const isPrevEnabled = false;

  const handlePrev = async () => {
    onPrev();
  };

  return (
    <div className="max-w-screen-md mx-auto space-y-6">
      <div className="w-full">
        <ProgressBar totalSteps={6} currentStep={6} />
      </div>

      <div className="w-full text-center">
        <h1 className="text-2xl font-bold">Part 07: Dig deeper? (skippable)</h1>
      </div>

      <div className="w-full space-y-6">
        <CardTextInput
          bgColor="bg-red-seven"
          question="Master any skill instantly—what’s it gonna be?"
          followUpQuestion=""
          value={answers.skill}
          onChange={(value) => handleAnswerChange("skill", value)}
        />
        <CardTextInput
          bgColor="bg-green-seven"
          question="Always wanted to try but haven’t—why?"
          followUpQuestion=""
          value={answers.wantToTry}
          onChange={(value) => handleAnswerChange("wantToTry", value)}
        />
        <CardAndChips
          bgColor="bg-blue-seven"
          question="What’s a bucket list item you’re excited to check off soon—and does it involve a dream destination?"
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
          question="First thing you’d buy for your dream home?"
          followUpQuestion=""
          value={answers.buyDreamHome}
          onChange={(value) => handleAnswerChange("buyDreamHome", value)}
        />
        <CardTextInput
          bgColor="bg-red-seven"
          question="Childhood activity you stopped but wanna try again?"
          followUpQuestion=""
          value={answers.ChildhoodActivity}
          onChange={(value) => handleAnswerChange("ChildhoodActivity", value)}
        />
        <CardTextInput
          bgColor="bg-green-seven"
          question="Small goal/hobby you’d love to explore?"
          followUpQuestion=""
          value={answers.exploreGoal}
          onChange={(value) => handleAnswerChange("exploreGoal", value)}
        />
      </div>

      {/* Sticky Next Button */}
      <div className="fixed bottom-0 left-0 w-full bg-yellow-eight shadow-lg p-4 flex justify-center">
        <Button onClick={handlePrev} disabled={isPrevEnabled}>
          Previous
        </Button>
        <Button onClick={handleSubmit} disabled={false}>
          SUBMIT ANSWER !!!
        </Button>
      </div>
    </div>
  );
};

export default Part7;
