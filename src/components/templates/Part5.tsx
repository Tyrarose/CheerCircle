"use client";

import React, { useState } from "react";

import ProgressBar from "@/components/molecules/ProgressBar";
import Divider from "@/components/atoms/Divider";
import Button from "@/components/atoms/Button";
import CardAndChips from "@/components/organisms/CardAndChips";
import QandAlong from "@/components/molecules/QandA-long";

const Part5 = ({ onNext, onPrev }: { onNext: () => void; onPrev: () => void; }) => {

  const [answers, setAnswers] = useState({
    clothing: "",
    door: "",
    talkToAnimal: "",
    swapLife: "",
  });

  const handleChipSelect = (key: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  };

  const handleExpandableQAChange = (key: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  };

  const isNextEnabled = [
    answers.clothing,
    answers.door,
  ].every((value) => value.trim() !== "");

  // Save form data function
  const saveFormData = async (formData: { [key: string]: any }) => {
    localStorage.setItem("part2-answers", JSON.stringify(formData));
  };
  // Handle Next button click
  const handleNext = async () => {
    await saveFormData(answers);
    onNext();
  };

  const isPrevEnabled = false;

  const handlePrev = async () => {
    await saveFormData(answers);
    onPrev();
  };

  return (
    <div className="max-w-screen-md mx-auto space-y-6">
      <div className="w-full">
        <ProgressBar totalSteps={6} currentStep={5} />
      </div>

      <div className="w-full text-center">
        <h1 className="text-2xl font-bold">Part 05: “What If”</h1>
      </div>

      <div className="w-full space-y-6">
        <CardAndChips
          bgColor="bg-yellow-seven"
          question="If you were clothing, what would you be?"
          followUpQuestion=""
          chips={[
              { color: "bg-orange-five", label: "Hoodie" },
              { color: "bg-yellow-five", label: "Sunglasses" },
              { color: "bg-red-five", label: "Sneakers" },
              { color: "bg-pink", label: "Fancy dress" },
              { color: "bg-blue-five", label: "Comfy pajamas" },
            ]}
          onChipSelect={(value) => handleChipSelect("clothing", value)}
        />
        <CardAndChips
          bgColor="bg-yellow-seven"
          question="If you were a door, what kind?"
          followUpQuestion="why?"
          chips={[
              { color: "bg-green-five", label: "A grand, ornate castle door" },
              { color: "bg-yellow-five", label: "A simple, sturdy wooden door" },
              { color: "bg-red-five", label: " A sleek, modern glass door" },
              { color: "bg-blue-five", label: "A mysterious, hidden trapdoor" },
              { color: "bg-violet-five", label: "A brightly colored front door" },
            ]}
          onChipSelect={(value) => handleChipSelect("door", value)}
        />
        <Divider
          text="Select Bonus Questionn (Skip if you want)"
        />
        <QandAlong
          labelText="Talk to any animal for a day—which one? What would you ask?"
          inputId=""
          inputPlaceholder=""
          value={answers.talkToAnimal || ""}
          onChange={(e) => handleExpandableQAChange("talkToAnimal", e.target.value)}
        />
        <QandAlong
          labelText="Swap lives with someone for a day? Who and why?"
          inputId=""
          inputPlaceholder=""
          value={answers.swapLife || ""}
          onChange={(e) => handleExpandableQAChange("swapLife", e.target.value)}
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

export default Part5;