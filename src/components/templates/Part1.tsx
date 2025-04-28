"use client";

import React, { useState } from "react";
import ProgressBar from "@/components/molecules/ProgressBar";
import QandAshort from "@/components/molecules/QandA-short";
import TaskPicture from "@/components/molecules/TaskPicture";
import QuestionAndChips from "@/components/organisms/QuestionAndChips";
import ExpandableQA from "@/components/molecules/ExpandableQA";
import Divider from "@/components/atoms/Divider";
import Button from "@/components/atoms/Button";
import QandAlong from "@/components/molecules/QandA-long";
import Label from "@/components/atoms/Label";

const Part1 = ({ onNext }: { onNext: () => void }) => {
  const [imagePreviews, setImagePreviews] = useState<{ [key: string]: string }>({
    funnyFace: "/images/part1/frame-1.png",
    bigSmile: "/images/part1/frame-2.png",
    bestLook: "/images/part1/frame-3.png",
  });

  const [answers, setAnswers] = useState({
    fullname: "",
    birthday: "",
    favoriteColor: "",
    wordToDescribe: "",
    nickname: "",
    usernameStory: "",
    funFact: "",
  });

  const [images, setImages] = useState<{ [key: string]: File | null }>({});

  // Generic input change handler
  const handleInputChange = (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setAnswers((prev) => ({ ...prev, [key]: e.target.value }));
  };

  // Generic chip selection handler
  const handleChipSelect = (key: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  };

  // Generic image change handler
  const handleImageChange = (key: string) => (file: File) => {
    setImages((prev) => ({ ...prev, [key]: file }));
    const imageUrl = URL.createObjectURL(file);
    setImagePreviews((prev) => ({ ...prev, [key]: imageUrl }));
  };


  // Save form data function
  const saveFormData = async (formData: { [key: string]: any }, imageData: { [key: string]: File | null }) => {
    // Save text answers
    localStorage.setItem("part1-answers", JSON.stringify(formData));

    // Save images separately
    for (const [key, file] of Object.entries(imageData)) {
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          localStorage.setItem(`part1-image-${key}`, reader.result as string); // Save as base64 string
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const isNextEnabled =
    Object.values(images).some((file) => file !== null) &&
    answers.favoriteColor.trim() !== "" &&
    answers.wordToDescribe.trim() !== "" &&
    answers.fullname.trim() !== "" &&
    answers.birthday.trim() !== "";

  const handleNext = async () => {
    await saveFormData(answers, images);
    onNext();
  };

  const isPrevEnabled = true;

  const handlePrev = async () => {
    await saveFormData(answers, images);
    onNext();
  };

  return (
    <div className="max-w-screen-md mx-auto space-y-6 pb-20">
      {/* Progress Bar */}
      <ProgressBar totalSteps={6} currentStep={1} />
      
      <h1 className="text-2xl font-bold text-center">Part 01. Profile</h1>
      
      <div className="space-y-6">
        <TaskPicture
          labelText={<Label text="Make a funny face!" isRequired />}
          imageSrc={imagePreviews.funnyFace}
          altText="Funny face"
          imageKey="funnyFace"
          onImageChange={handleImageChange("funnyFace")} // Corrected call
        />
        <QandAshort
          labelText={<Label text="Full name?" isRequired />}
          inputId="fullname"
          inputPlaceholder="eg. Joe Stone Doctor"
          value={answers.fullname}
          onChange={handleInputChange("fullname")}
        />
        <TaskPicture
          labelText={<Label text="Crack a big smile!" isRequired />}
          imageSrc={imagePreviews.bigSmile}
          altText="Big smile"
          imageKey="bigSmile"
          onImageChange={handleImageChange("bigSmile")}
        />
        <QandAshort
          labelText={<Label text="Birthday?" isRequired />}
          inputId="birthday"
          inputPlaceholder="eg. April 27, 2001"
          value={answers.birthday}
          onChange={handleInputChange("birthday")}
        />
        <TaskPicture
          labelText={<Label text="Show me your best look/pic!" isRequired />}
          imageSrc={imagePreviews.bestLook}
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
        />
        
        <Divider text="Optional" />

        <QandAshort
          labelText={<Label text="Nickname or username?" />}
          inputId="nickname"
          inputPlaceholder="eg. DoctorJoe"
          value={answers.nickname}
          onChange={handleInputChange("nickname")}
        />
        
        <ExpandableQA
          question="Any cool story behind it?"
          onChange={(value) => setAnswers((prev) => ({ ...prev, usernameStory: value }))} 
        />
        
        <Divider text="Bonus Question (Skip if you want)" />
        <QandAlong
          labelText="Random fun fact about you? Or just anything random at all."
          inputId="funFact"
          inputPlaceholder="Share something fun!"
          value={answers.funFact || ""}
          onChange={(e) => setAnswers((prev) => ({ ...prev, funFact: e.target.value }))} 
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

export default Part1;
