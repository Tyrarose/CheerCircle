"use client";

import React, { useEffect } from "react";
import ProgressBar from "@/components/molecules/ProgressBar";
import Divider from "@/components/atoms/Divider";
import Button from "@/components/atoms/Button";
import CardTextInput from "@/components/organisms/CardTextInput";
import { useFormContext } from '../../context/FormContext';

const Part3 = ({ onNext, onPrevious }: { onNext: () => void; onPrevious: () => void }) => {
  const { formData, updateField, getField } = useFormContext();

  const requiredFields = ["animals", "emoji", "neverForget"];
  const bonusFields = ["dessert", "adventure", "song"];
  const [selectedBonus, setSelectedBonus] = React.useState<string | null>(null);

  const isNextEnabled = requiredFields.every((field) => 
    getField('part3', field)?.trim() !== '');

  const handleAnswerChange = (key: string, value: string) => {
    updateField('part3', key, value);
  };

  const handleBonusSelection = (key: string) => {
    if (selectedBonus === key) {
      setSelectedBonus(null);
      updateField('part3', key, "");
    } else {
      setSelectedBonus(key);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="max-w-screen-md mx-auto space-y-6">
      <div className="w-full">
        <ProgressBar totalSteps={7} currentStep={3} />
      </div>

      <div className="w-full text-center">
        <h1 className="text-2xl font-bold">Part 03: Vibes</h1>
      </div>

      <div className="w-full space-y-6">
        {/* Required Questions */}
        {requiredFields.map((key) => (
          <CardTextInput
            key={key}
            bgColor={
              key === "animals" ? "bg-blue-seven" 
              : key === "emoji" ? "bg-red-seven" 
              : "bg-yellow-seven"
            }
            question={
              key === "animals" ? "If we were animals, what would we be?" 
              : key === "emoji" ? "One emoji or word that describes me?" 
              : "Something I did that you'd #NeverForget?"
            }
            followUpQuestion={
              key === "animals" ? "Who would be the predator? We're both prey?" 
              : key === "neverForget" ? "and why?" 
              : ""
            }
            value={getField('part3', key)}
            onChange={(value) => handleAnswerChange(key, value)}
          />
        ))}

        <Divider text="PICK ONE Bonus Question (Skip if you want)" />

        {/* Bonus Questions */}
        {bonusFields.map((bonusKey) => (
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
              value={getField('part3', bonusKey)}
              onChange={(value) => handleAnswerChange(bonusKey, value)}
            />
          </div>
        ))}
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

export default Part3;