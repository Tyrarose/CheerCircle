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
    const JSZip = require("jszip");
    const zip = new JSZip();
    
    const jsonString = JSON.stringify(formData, null, 2);
    zip.file("part1-answers.json", jsonString);

    for (const [key, file] of Object.entries(imageData)) {
      if (file) {
        const fileData = await file.arrayBuffer();
        zip.file(`${key}.jpg`, fileData);
      }
    }

    const zipBlob = await zip.generateAsync({ type: "blob" });
    const zipUrl = URL.createObjectURL(zipBlob);
    const zipLink = document.createElement("a");
    zipLink.href = zipUrl;
    zipLink.download = "part1.zip";
    document.body.appendChild(zipLink);
    zipLink.click();
    document.body.removeChild(zipLink);
    URL.revokeObjectURL(zipUrl);
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
          labelText="Make a funny face!"
          imageSrc={imagePreviews.funnyFace}
          altText="Funny face"
          imageKey="funnyFace"
          onImageChange={handleImageChange("funnyFace")} // Corrected call
        />
        <QandAshort
          labelText="Full name?"
          inputId="fullname"
          inputPlaceholder="eg. Joe Stone Doctor"
          value={answers.fullname}
          onChange={handleInputChange("fullname")}
        />
        <TaskPicture
          labelText="Crack a big smile!"
          imageSrc={imagePreviews.bigSmile}
          altText="Big smile"
          imageKey="bigSmile"
          onImageChange={handleImageChange("bigSmile")}
        />
        <QandAshort
          labelText="Birthday?"
          inputId="birthday"
          inputPlaceholder="eg. April 27, 2001"
          value={answers.birthday}
          onChange={handleInputChange("birthday")}
        />
        <TaskPicture
          labelText="Show me your best look/pic!"
          imageSrc={imagePreviews.bestLook}
          altText="Best look"
          imageKey="bestLook"
          onImageChange={handleImageChange("bestLook")}
        />
        
        <QuestionAndChips
          question="Favorite color?"
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
          question="One word that describes you?"
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
          labelText="Nickname or username?"
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
