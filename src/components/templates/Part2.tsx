// Part2.tsx
"use client";

import React from "react";
import ProgressBar from "@/components/molecules/ProgressBar";
import Divider from "@/components/atoms/Divider";
import Button from "@/components/atoms/Button";
import CardTextInput from "@/components/organisms/CardTextInput";
import CardAndChips from "@/components/organisms/CardAndChips";
import QandAlong from "@/components/molecules/QandA-long";
import { useFormContext } from "@/context/FormContext";

const Part2 = ({ onNext, onPrevious }: { onNext: () => void; onPrevious: () => void; }) => {
  const { updateField, getField } = useFormContext();
  
  // Handle input changes for text inputs
  const handleInputChange = (key: string, value: string) => {
    updateField("part2", key, value);
  };

  // Check if all required fields are filled
  const isNextEnabled = [
    "lazyDayActivity",
    "faveWeather",
    "currentObsession",
    "childhoodMemory",
  ].every((key) => getField("part2", key).trim() !== "");

  return (
    <div className="max-w-screen-md mx-auto space-y-6">
      <div className="w-full">
        <ProgressBar totalSteps={6} currentStep={2} />
      </div>

      <div className="w-full text-center">
        <h1 className="text-2xl font-bold">Part 02. Faves</h1>
      </div>

      <div className="w-full space-y-6">
        {/* Favorite lazy day activity */}
        <CardTextInput
          bgColor="bg-red-seven"
          question="How do you chill on lazy days?"
          followUpQuestion="What's your comfort food that day?"
          value={getField("part2", "lazyDayActivity")}
          onChange={(value) => handleInputChange("lazyDayActivity", value)}
        />

        {/* Favorite weather */}
        <CardAndChips
          bgColor="bg-blue-seven"
          question="Fave weather?"
          followUpQuestion=""
          chips={[
            { color: "bg-yellow-five", label: "Sunny" },
            { color: "bg-black-five", label: "Rainy" },
            { color: "bg-white", label: "Cloudy" },
            { color: "bg-blue-five", label: "Snowy" },
            { color: "bg-green-five", label: "Breezy" },
          ]}
          selectedChip={getField("part2", "faveWeather")}
          onChipSelect={(value) => handleInputChange("faveWeather", value)}
        />

        {/* Current obsession */}
        <CardTextInput
          bgColor="bg-green-seven"
          question="Current obsession"
          followUpQuestion="Could be a song, TV show, or book?"
          value={getField("part2", "currentObsession")}
          onChange={(value) => handleInputChange("currentObsession", value)}
        />

        {/* Favorite childhood memory/game */}
        <CardTextInput
          bgColor="bg-blue-seven"
          question="Fave childhood memory/game?"
          followUpQuestion=""
          value={getField("part2", "childhoodMemory")}
          onChange={(value) => handleInputChange("childhoodMemory", value)}
        />

        <Divider/>

        <QandAlong
          labelText="Most comforting thing someone's done for you?"
          inputId="mostComforting"
          inputPlaceholder="Share your experience"
          value={getField("part2", "mostComforting")}
          onChange={(e) => handleInputChange("mostComforting", e.target.value)}
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

export default Part2;