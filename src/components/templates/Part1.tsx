// Part1.tsx

"use client";

import React, { useState, useEffect } from "react";
import ProgressBar from "@/components/molecules/ProgressBar";
import QandAshort from "@/components/molecules/QandA-short";
import TaskPicture from "@/components/molecules/TaskPicture";
import QuestionAndChips from "@/components/organisms/QuestionAndChips";
import Divider from "@/components/atoms/Divider";
import Button from "@/components/atoms/Button";
import QandAlong from "@/components/molecules/QandA-long";
import Label from "@/components/atoms/Label";
import { useFormContext } from "@/context/FormContext";

interface Part1Props {
  onNext: () => void;
  cacheImage: (key: string, file: File) => void;
}

const Part1 = ({ onNext, cacheImage }: Part1Props) => {
  const { updateField, getField, formData } = useFormContext();
  const [favoriteColor, setFavoriteColor] = useState<string>("");
  const [wordToDescribe, setWordToDescribe] = useState<string>("");

  const defaultImages = {
    funnyFace: "/images/part1/frame-1.png",
    bigSmile: "/images/part1/frame-2.png",
    bestLook: "/images/part1/frame-3.png",
  };

  const [imageUrls, setImageUrls] = useState<{
    funnyFace: string | null;
    bigSmile: string | null;
    bestLook: string | null;
  }>({
    funnyFace: null,
    bigSmile: null,
    bestLook: null,
  });

  // Load saved data on component mount
  useEffect(() => {
    // Load selected chips from form context
    const savedColor = getField("part1", "favoriteColor");
    const savedWord = getField("part1", "wordToDescribe");
    
    if (savedColor) setFavoriteColor(savedColor);
    if (savedWord) setWordToDescribe(savedWord);

    // Load images from localStorage
    const keys = ["funnyFace", "bigSmile", "bestLook"];
    const savedImages: {[key: string]: string | null} = {};
    
    keys.forEach(key => {
      const savedImage = localStorage.getItem(`part1_image_${key}`);
      if (savedImage && savedImage.trim() !== "") {
        savedImages[key] = savedImage;
      }
    });    
    
    if (Object.keys(savedImages).length > 0) {
      setImageUrls(prev => ({...prev, ...savedImages}));
    }
  }, [getField]);

  const handleInputChange = (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    updateField("part1", key, e.target.value);
  };

  const handleChipSelect = (key: string, value: string) => {
    updateField("part1", key, value);
  
    if (key === "favoriteColor") {
      setFavoriteColor(value);
    } else if (key === "wordToDescribe") {
      setWordToDescribe(value);
    }
  };  

  const handleImageChange = (key: string) => (file: File) => {
    const imageUrl = URL.createObjectURL(file);
    setImageUrls(prev => ({ ...prev, [key]: imageUrl }));
    cacheImage(key, file);
  };

  const getImageSource = (key: keyof typeof defaultImages) => {
    const cachedUrl = imageUrls[key];
    if (cachedUrl && cachedUrl.trim() !== "") return cachedUrl;
  
    const savedImage = localStorage.getItem(`part1_image_${key}`);
    if (savedImage && savedImage.trim() !== "") return savedImage;
  
    return defaultImages[key];
  };
  

  const isNextEnabled =
    getField("part1", "favoriteColor").trim() !== "" &&
    getField("part1", "wordToDescribe").trim() !== "" &&
    getField("part1", "fullname").trim() !== "" &&
    getField("part1", "birthday").trim() !== "";

  return (
    <div className="max-w-screen-md mx-auto space-y-6 pb-20">
      <ProgressBar totalSteps={6} currentStep={1} />
      <h1 className="text-2xl font-bold text-center">Part 01. Profile</h1>

      <div className="space-y-6">
        <TaskPicture
          labelText={<Label text="Make a funny face!" isRequired />}
          imageSrc={getImageSource("funnyFace")}
          altText="Funny face"
          imageKey="funnyFace"
          onImageChange={handleImageChange("funnyFace")}
        />
        <QandAshort
          labelText={<Label text="Full name?" isRequired />}
          inputId="fullname"
          inputPlaceholder="eg. Joe Stone Doctor"
          value={getField("part1", "fullname")}
          onChange={handleInputChange("fullname")}
        />
        <TaskPicture
          labelText={<Label text="Crack a big smile!" isRequired />}
          imageSrc={getImageSource("bigSmile")}
          altText="Big smile"
          imageKey="bigSmile"
          onImageChange={handleImageChange("bigSmile")}
        />
        <QandAshort
          labelText={<Label text="Birthday?" isRequired />}
          inputId="birthday"
          inputPlaceholder="eg. April 27, 2001"
          value={getField("part1", "birthday")}
          onChange={handleInputChange("birthday")}
        />
        <TaskPicture
          labelText={<Label text="Show me your best look/pic!" isRequired />}
          imageSrc={getImageSource("bestLook")}
          altText="Best look"
          imageKey="bestLook"
          onImageChange={handleImageChange("bestLook")}
        />

        <QuestionAndChips
          labelText={<Label text="Favorite color?" isRequired />}
          chips={[
            { label: "Red", color: "bg-red-five" },
            { label: "Blue", color: "bg-blue-five" },
            { label: "Green", color: "bg-green-five" },
            { label: "Yellow", color: "bg-yellow-five" },
            { label: "Purple", color: "bg-violet-five" },
            { label: "Orange", color: "bg-orange-five" },
            { label: "Pink", color: "bg-pink" },
            { label: "Brown", color: "bg-brown-five" },
            { label: "Black", color: "bg-black-five" },
            { label: "White", color: "bg-white" },
            { label: "Gray", color: "bg-gray-five" },
          ]}
          onChipSelect={(color) => handleChipSelect("favoriteColor", color)}
          selectedChip={favoriteColor}
        />

        <QuestionAndChips
          labelText={<Label text="One word that describes you?" isRequired />}
          chips={[
            { label: "Calm", color: "bg-blue-five" },
            { label: "Adventurous", color: "bg-green-five" },
            { label: "Creative", color: "bg-orange-five" },
            { label: "Mysterious", color: "bg-black-five" },
            { label: "Friendly", color: "bg-pink" },
            { label: "Smart", color: "bg-red-five" },
            { label: "Funny", color: "bg-yellow-five" },
            { label: "Imaginative", color: "bg-violet-five" },
            { label: "Innocent", color: "bg-white" },
          ]}
          onChipSelect={(word) => handleChipSelect("wordToDescribe", word)}
          selectedChip={wordToDescribe}
        />
        <Divider />
        <QandAshort
          labelText={<Label text="Nickname or username?" />}
          inputId="nickname"
          inputPlaceholder="eg. DoctorJoe"
          value={getField("part1", "nickname")}
          onChange={handleInputChange("nickname")}
        />

        <QandAlong
          labelText="Any cool story behind it?"
          inputId="usernameStory"
          inputPlaceholder="Share something fun!"
          value={getField("part1", "usernameStory")}
          onChange={(e) => updateField("part1", "usernameStory", e.target.value)}
        />

        <QandAlong
          labelText="Random fun fact about you? Or just anything random at all."
          inputId="funFact"
          inputPlaceholder="Share something fun!"
          value={getField("part1", "funFact")}
          onChange={(e) => updateField("part1", "funFact", e.target.value)}
        />
      </div>

      <div className="fixed bottom-0 left-0 w-full bg-yellow-eight shadow-lg p-4 flex justify-center">
        <Button onClick={onNext} disabled={!isNextEnabled}>Next</Button>
      </div>
    </div>
  );
};

export default Part1;