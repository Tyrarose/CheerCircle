"use client";

import React, { useEffect } from "react";
import ProgressBar from "@/components/molecules/ProgressBar";
import Divider from "@/components/atoms/Divider";
import Button from "@/components/atoms/Button";
import CardAndChips from "@/components/organisms/CardAndChips";
import QandAlong from "@/components/molecules/QandA-long";
import { useFormContext } from '../../context/FormContext';

const Part5 = ({ onNext, onPrevious }: { onNext: () => void; onPrevious: () => void }) => {
  const { updateField, getField } = useFormContext();

  const handleChipSelect = (key: string, value: string) => {
    updateField('part5', key, value);
  };

  const handleExpandableQAChange = (key: string, value: string) => {
    updateField('part5', key, value);
  };

  const isNextEnabled = [
    getField('part5', 'clothing'),
    getField('part5', 'door'),
  ].every((value) => value?.trim() !== "");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="max-w-screen-md mx-auto space-y-6">
      <div className="w-full">
        <ProgressBar totalSteps={7} currentStep={5} />
      </div>

      <div className="w-full text-center">
        <h1 className="text-2xl font-bold">Part 05: "What If"</h1>
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
          text="Select Bonus Questions (Skip if you want)"
        />
        <QandAlong
          labelText="Talk to any animal for a day—which one? What would you ask?"
          inputId="talkToAnimal"
          inputPlaceholder=""
          value={getField('part5', 'talkToAnimal')}
          onChange={(e) => handleExpandableQAChange("talkToAnimal", e.target.value)}
        />
        <QandAlong
          labelText="Swap lives with someone for a day? Who and why?"
          inputId="swapLife"
          inputPlaceholder=""
          value={getField('part5', 'swapLife')}
          onChange={(e) => handleExpandableQAChange("swapLife", e.target.value)}
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

export default Part5;