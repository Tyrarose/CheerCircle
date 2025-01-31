"use client";

import React, { useState } from "react";

import ProgressBar from "@/components/molecules/ProgressBar";
import Button from "@/components/atoms/Button";
import CardAndChips from "@/components/organisms/CardAndChips";
import ExpandableQA from "@/components/molecules/ExpandableQA";


const Part6 = ({ onNext, onPrev }: { onNext: () => void; onPrev: () => void; }) => {

  const [answers, setAnswers] = useState({
    riseOrSet: "",
    riseOrSetWhy: "",
    dogOrCat: "",
    dogOrCatWhy: "",
    flavors: "",
    hobby: "",
    });

  const handleChipSelect = (key: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  };

  const isNextEnabled = [
    answers.riseOrSet,
    answers.dogOrCat,
    answers.flavors,
    answers.hobby,
  ].every((value) => value.trim() !== "");

  // Reusable save method to export data as JSON
  const saveFormData = () => {
    const jsonString = JSON.stringify(answers, null, 2);
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "part6-answers.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Handle Next button click
  const handleNext = async () => {
    saveFormData();
    onNext();
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
          question={"Mind explaning why did you choose your previous answer?"} 
          onChange={(value) => setAnswers((prev) => ({ ...prev, riseOrSetWhy: value }))} 

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
          question={"Mind explaning why did you choose your previous answer?"}
          onChange={(value) => setAnswers((prev) => ({ ...prev, dogOrCatWhy: value }))} 
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

export default Part6;