import React, { useState } from "react";
import ProgressBar from "@/components/molecules/ProgressBar";
import Divider from "@/components/atoms/Divider";
import Button from "@/components/atoms/Button";
import CardTextInput from "@/components/organisms/CardTextInput";
import CardAndChips from "@/components/organisms/CardAndChips";
import QandAlong from "@/components/molecules/QandA-long";

const Part2 = ({ onNext, onPrev }: { onNext: () => void; onPrev: () => void; }) => {
  // Initial answers state
  const [answers, setAnswers] = useState({
    lazyDayActivity: "",
    faveWeather: "",
    currentObsession: "",
    childhoodMemory: "",
    mostComforting: "",
  });

  // Generic Input handler
  const handleInputChange = (key: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  };

  // Generic Chip selection handler
  const handleChipSelect = (key: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  };

  // Optional expandable question handler
  const handleExpandableQAChange = (key: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  };

  // Reusable save method to export data as JSON
  const saveFormData = () => {
    const jsonString = JSON.stringify(answers, null, 2);
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "part2-answers.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Check if all required fields are filled
  const isNextEnabled = [
    answers.lazyDayActivity,
    answers.faveWeather,
    answers.currentObsession,
    answers.childhoodMemory,
  ].every((value) => value.trim() !== "");


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
          followUpQuestion="What’s your comfort food that day?"
          value={answers.lazyDayActivity}
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
          onChipSelect={(value) => handleChipSelect("faveWeather", value)}
        />

        {/* Current obsession */}
        <CardTextInput
          bgColor="bg-green-seven"
          question="Current obsession"
          followUpQuestion="Could be a song, TV show, or book?"
          value={answers.currentObsession}
          onChange={(value) => handleInputChange("currentObsession", value)}
        />

        {/* Favorite childhood memory/game */}
        <CardTextInput
          bgColor="bg-blue-seven"
          question="Fave childhood memory/game?"
          followUpQuestion=""
          value={answers.childhoodMemory}
          onChange={(value) => handleInputChange("childhoodMemory", value)}
        />

        {/* Optional most comforting */}
        <Divider text="Bonus Question (Skip if you want)" />
        <QandAlong
          labelText="Most comforting thing someone’s done for you?"
          inputId="mostComforting"
          inputPlaceholder="Joe Stone Doctor"
          value={answers.mostComforting || ""}
          onChange={(e) => handleExpandableQAChange("mostComforting", e.target.value)}
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

export default Part2;
