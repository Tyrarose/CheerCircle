"use client";

import React, { useState, useEffect } from "react";
import ProgressBar from "@/components/molecules/ProgressBar";
import Divider from "@/components/atoms/Divider";
import Button from "@/components/atoms/Button";
import CardTextInput from "@/components/organisms/CardTextInput";

const Part3 = ({ onNext, onPrev }: { onNext: () => void; onPrev: () => void; }) => {
  const [answers, setAnswers] = useState<{ [key: string]: string }>({
    animals: "",
    emoji: "",
    neverForget: "",
  });

  const [bonusAnswers, setBonusAnswers] = useState<{ [key: string]: string }>({
    dessert: "",
    adventure: "",
    song: "",
  });

  const [selectedBonus, setSelectedBonus] = useState<string | null>(null);

  const requiredFields = ["animals", "emoji", "neverForget"];

  const isNextEnabled = requiredFields.every((key) => answers[key]?.trim() !== "");

  const handleAnswerChange = (key: string, value: string, isBonus: boolean = false) => {
    if (isBonus) {
      setBonusAnswers((prev) => ({ ...prev, [key]: value }));
    } else {
      setAnswers((prev) => ({ ...prev, [key]: value }));
    }
  };

  const handleBonusSelection = (key: string) => {
    if (selectedBonus === key) {
      setSelectedBonus(null);
      setBonusAnswers((prev) => ({ ...prev, [key]: "" }));
    } else {
      setSelectedBonus(key);
    }
  };

  const saveFormData = () => {
    const formData = { ...answers };

    if (selectedBonus) {
      formData[selectedBonus] = bonusAnswers[selectedBonus];
    }

    const jsonString = JSON.stringify(formData, null, 2);
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "part3-answers.json";
    document.body.appendChild(a);
    a.click();

    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleNext = async () => {
    await saveFormData();
    onNext();
  };

  const isPrevEnabled = false;

  const handlePrev = async () => {
    onPrev();
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="max-w-screen-md mx-auto space-y-6">
      <div className="w-full">
        <ProgressBar totalSteps={6} currentStep={3} />
      </div>

      <div className="w-full text-center">
        <h1 className="text-2xl font-bold">Part 03: Vibes</h1>
      </div>

      <div className="w-full space-y-6">
        {/* Required Questions */}
        {["animals", "emoji", "neverForget"].map((key) => (
          <CardTextInput
            key={key}
            bgColor={key === "animals" ? "bg-blue-seven" : key === "emoji" ? "bg-red-seven" : "bg-yellow-seven"}
            question={key === "animals" ? "If we were animals, what would we be?" : key === "emoji" ? "One emoji or word that describes me?" : "Something I did that you’d #NeverForget?"}
            followUpQuestion={key === "animals" ? "Who would be the predator? We’re both prey?" : key === "neverForget" ? "and why?" : ""}
            value={answers[key]}
            onChange={(value) => handleAnswerChange(key, value)}
          />
        ))}

        <Divider text="PICK ONE Bonus Question (Skip if you want)" />

        {/* Bonus Questions */}
        {["dessert", "adventure", "song"].map((bonusKey) => (
          <div
            key={bonusKey}
            className={`transition-opacity duration-300 ${selectedBonus && selectedBonus !== bonusKey ? "opacity-50" : ""}`}
            onClick={() => handleBonusSelection(bonusKey)}
          >
            <CardTextInput
              bgColor={`bg-${bonusKey === "dessert" ? "green" : bonusKey === "adventure" ? "red" : "yellow"}-seven`}
              question={
                bonusKey === "dessert"
                  ? "If I were a dessert, what would I be?"
                  : bonusKey === "adventure"
                  ? "Dream adventure with me?"
                  : "A song that reminds you of us?"
              }
              followUpQuestion={
                bonusKey === "dessert"
                  ? "Sweet or spicy?"
                  : bonusKey === "adventure"
                  ? "Where would we go first?"
                  : "Why?"
              }
              value={bonusAnswers[bonusKey]}
              onChange={(value) => handleAnswerChange(bonusKey, value, true)}
            />
          </div>
        ))}
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

export default Part3;
