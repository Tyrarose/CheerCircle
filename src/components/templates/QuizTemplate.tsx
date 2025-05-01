// QuizTemplate.tsx
"use client";

import React, { useState, useEffect } from "react";

import ProgressBar from "@/components/molecules/ProgressBar";
import QandAshort from "@/components/molecules/QandA-short";
import TaskPicture from "@/components/molecules/TaskPicture";
import QandAlong from "@/components/molecules/QandA-long";
import DatePicker from "@/components/molecules/DatePicker";
import ExpandableQA from "@/components/molecules/ExpandableQA";

import CardTextInput from "@/components/organisms/CardTextInput";
import CardAndChips from "@/components/organisms/CardAndChips";
import QuestionAndChips from "@/components/organisms/QuestionAndChips";
import SwipeableCardCarousel from "@/components/organisms/SwipeableCardCarousel";

import Divider from "@/components/atoms/Divider";
import Button from "@/components/atoms/Button";
import Label from "@/components/atoms/Label";

import { useFormContext } from "@/context/FormContext";
import { QuizPartConfig, QuizStep } from "@/types/quiz";

interface QuizTemplateProps {
    config: QuizPartConfig;
    onNext: () => void;
    onPrevious?: () => void;
    cacheImage?: (key: string, file: File) => void; 
}

const QuizTemplate = ({ config, onNext, onPrevious, cacheImage }: QuizTemplateProps) => {
  const { partId, title, totalSteps, id: partNumber, steps, bonusSteps, requiredFields, defaultImages } = config;
  const { updateField, getField } = useFormContext();
  const [birthday, setBirthday] = useState<Date | undefined>(undefined);
  const [selectedBonusStep, setSelectedBonusStep] = useState<string | null>(null);
  
  // Image management
  const [imageUrls, setImageUrls] = useState<Record<string, string | null>>({});

  // Load saved data on component mount
  useEffect(() => {
    // Initialize images from localStorage if they exist
    if (defaultImages) {
      const imageKeys = Object.keys(defaultImages);
      const savedImages: Record<string, string | null> = {};
      
      imageKeys.forEach(key => {
        const savedImage = localStorage.getItem(`${partId}_image_${key}`);
        if (savedImage && savedImage.trim() !== "") {
          savedImages[key] = savedImage;
        }
      });
      
      if (Object.keys(savedImages).length > 0) {
        setImageUrls(prev => ({...prev, ...savedImages}));
      }
    }
    
    // Initialize selectedBonusStep based on existing form data
    if (bonusSteps && bonusSteps.length > 0) {
      for (const step of bonusSteps) {
        const value = getField(partId, step.key);
        if (value && value.trim() !== "") {
          setSelectedBonusStep(step.key);
          break;
        }
      }
    }
    
  }, [partId, defaultImages, bonusSteps, getField]);

  // Handle form input changes
  const handleInputChange = (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    updateField(partId, key, e.target.value);
  };
  
  // Handle date picker changes
  const handleBirthdayChange = (date: Date | undefined) => {
    setBirthday(date);
    if (date) {
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const year = date.getFullYear();
      const formattedDate = `${month}-${day}-${year}`;
      updateField(partId, "birthday", formattedDate);
    } else {
      updateField(partId, "birthday", "");
    }
  };

  // Handle chip selection
  const handleChipSelect = (key: string, value: string) => {
    updateField(partId, key, value);
  };

  // Handle image upload
  const handleImageChange = (key: string) => (file: File) => {
    const imageUrl = URL.createObjectURL(file);
    setImageUrls(prev => ({ ...prev, [key]: imageUrl }));
    if (cacheImage) {
      cacheImage(key, file);
    }
  };

  // Get image source
  const getImageSource = (key: string): string => {
    if (!defaultImages) return '';
    
    const cachedUrl = imageUrls[key];
    if (cachedUrl && cachedUrl.trim() !== "") return cachedUrl;
  
    const savedImage = localStorage.getItem(`${partId}_image_${key}`);
    if (savedImage && savedImage.trim() !== "") return savedImage;
  
    return defaultImages[key] || '';
  };
  
  // Handle bonus question selection
  const handleBonusSelection = (key: string) => {
    // First clear any existing bonus values to ensure only one is selected at a time
    if (bonusSteps) {
      bonusSteps.forEach(step => {
        if (step.key !== key) {
          updateField(partId, step.key, "");
        }
      });
    }

    if (selectedBonusStep === key) {
      setSelectedBonusStep(null);
      updateField(partId, key, "");
    } else {
      setSelectedBonusStep(key);
      // Don't update the field value here - let the SwipeableCardCarousel component do that
      // The field will be updated when the user actually selects a value within the card
    }
  };

  // Check if all required fields are filled to enable Next button
  const isNextEnabled = requiredFields.every((key) => 
    getField(partId, key).trim() !== "");

  // Render component based on type from configuration
  const renderComponent = (step: QuizStep) => {
    const { key, type, question, isRequired, ...rest } = step;
    
    // Common props for all components
    const commonProps = {
      labelText: <Label text={question} isRequired={isRequired} />,
    };

    switch (type) {
      case "Divider":
        return (
          <Divider/>
        );
      case "TaskPicture":
        return (
          <TaskPicture
            key={key}
            {...commonProps}
            imageSrc={getImageSource(key)}
            altText={question}
            imageKey={key}
            onImageChange={handleImageChange(key)}
          />
        );
        
      case "QandAshort":
        return (
          <QandAshort
            key={key}
            {...commonProps}
            inputId={key}
            inputPlaceholder={rest.inputPlaceholder || ''}
            value={getField(partId, key)}
            onChange={handleInputChange(key)}
          />
        );
        
      case "QandAlong":
        return (
          <QandAlong
            key={key}
            {...commonProps}
            inputId={key}
            inputPlaceholder={rest.inputPlaceholder || ''}
            value={getField(partId, key)}
            onChange={(e) => updateField(partId, key, e.target.value)}
          />
        );
        
      case "DatePicker":
        return (
          <DatePicker
            key={key}
            {...commonProps}
            pickedDate={birthday}
            onChange={handleBirthdayChange}
          />
        );
        
      case "QuestionAndChips":
        return (
          <QuestionAndChips
            key={key}
            {...commonProps}
            chips={rest.options || []}
            selectedChip={getField(partId, key)}
            onChipSelect={(value) => handleChipSelect(key, value)}
          />
        );
        
      case "CardTextInput":
        return (
          <CardTextInput
            key={key}
            bgColor={rest.bgColor || 'bg-blue-seven'}
            question={question}
            followUpQuestion={rest.followUpQuestion || ''}
            value={getField(partId, key)}
            onChange={(value) => updateField(partId, key, value)}
          />
        );
        
      case "CardAndChips":
        return (
          <CardAndChips
            key={key}
            bgColor={rest.bgColor || 'bg-blue-seven'}
            question={question}
            followUpQuestion={rest.followUpQuestion || ''}
            chips={rest.options || []}
            selectedChip={getField(partId, key)}
            onChipSelect={(value) => handleChipSelect(key, value)}
          />
        );
        
      case "ExpandableQA":
        return (
          <ExpandableQA
            key={key}
            {...commonProps}
            question={question}
            value={getField(partId, key)}
            onChange={(value) => updateField(partId, key, value)}
          />
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="max-w-screen-md mx-auto space-y-6 pb-20">
      <ProgressBar totalSteps={totalSteps} currentStep={partNumber} />
      <h1 className="text-2xl font-bold text-center">{title}</h1>

      <div className="space-y-6">
        {/* Important: The key needs to be applied to the direct child of map */}
        {steps.map((step) => (
          <div key={`step-${step.key}`}>
            {renderComponent(step)}
          </div>
        ))}

        {/* Render bonus section if it exists */}
        {bonusSteps && bonusSteps.length > 0 && (
          <>
            <Divider text="PICK ONE Bonus Question (Swipe to Choose)" />
            <SwipeableCardCarousel 
              fields={bonusSteps.map(step => step.key)}
              selectedField={selectedBonusStep}
              onSelect={handleBonusSelection}
              onValueChange={(key, value) => {
                updateField(partId, key, value);
              }}
              getFieldValue={(field) => getField(partId, field)}
              quiz={Object.fromEntries(
                bonusSteps.map(step => [
                  step.key, 
                  {
                    bgColor: step.bgColor || 'bg-blue-seven',
                    question: step.question,
                    followUpQuestion: step.followUpQuestion || '',
                    isRequired: false
                  }
                ])
              )}
            />
          </>
        )}
      </div>

      <div className="fixed bottom-0 left-0 w-full bg-yellow-eight shadow-lg p-4 flex justify-center">
        {onPrevious && (
          <Button onClick={onPrevious} className="mr-2">
            Previous
          </Button>
        )}
        <Button onClick={onNext} disabled={!isNextEnabled}>
          Next
        </Button>
      </div>
    </div>
  );
};

export default QuizTemplate;