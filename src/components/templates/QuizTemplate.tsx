// QuizTemplate.tsx
"use client";

import React, { useState, useEffect } from "react";
import { format } from "date-fns"; 

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
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedBonusStep, setSelectedBonusStep] = useState<string | null>(null);
  
  // Image management
  const [imageUrls, setImageUrls] = useState<Record<string, string | null>>({});
  // Add isClient state to track client-side rendering
  const [isClient, setIsClient] = useState(false);

  // Safe localStorage wrapper function
  const getLocalStorageItem = (key: string) => {
    if (typeof window === 'undefined') return null;
    try {
      return localStorage.getItem(key);
    } catch (e) {
      console.error(`Error accessing localStorage for key ${key}:`, e);
      return null;
    }
  };

  // Load saved data on component mount
  useEffect(() => {
    // Set isClient to true to indicate we're running on the client side
    setIsClient(true);
    
    // Only run client-side code when window is defined
    if (typeof window === 'undefined') return;

    // Initialize birthday from stored value
    const birthdayStr = getField(partId, "birthday");
    if (birthdayStr) {
      const parsed = new Date(birthdayStr); // Uses native parsing
      if (!isNaN(parsed.getTime())) {
        setBirthday(parsed); // Only for showing in DatePicker
      }
    }
    
    // Initialize images from localStorage if they exist
    if (defaultImages) {
      const imageKeys = Object.keys(defaultImages);
      const savedImages: Record<string, string | null> = {};
      
      imageKeys.forEach(key => {
        const savedImage = getLocalStorageItem(`${partId}_image_${key}`);
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
  const handleDateChange = (date: Date | null) => {
    if (date) {
      const formatted = format(date, 'MMMM d, yyyy');
      setSelectedDate(formatted);
    }
  };
  

  // Handle chip selection
  const handleChipSelect = (key: string, value: string) => {
    updateField(partId, key, value);
  };

  // Handle image upload
  const handleImageChange = (key: string) => (file: File) => {
    // Make sure we're on the client side
    if (typeof window === 'undefined') return;
    
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64Data = reader.result as string;
      try {
        localStorage.setItem(`${partId}_image_${key}`, base64Data);
        setImageUrls(prev => ({ ...prev, [key]: base64Data }));
      } catch (e) {
        console.error(`Error saving image to localStorage: ${e}`);
        // If localStorage fails (e.g., quota exceeded), still update the state
        // so the image shows during the current session
        setImageUrls(prev => ({ ...prev, [key]: base64Data }));
      }
    };
    reader.readAsDataURL(file); // Convert to base64
  };
  
  // Get image source
  const getImageSource = (key: string): string => {
    if (!isClient || !defaultImages) return '';
    
    const cachedUrl = imageUrls[key];
    if (cachedUrl && cachedUrl.trim() !== "") return cachedUrl;
  
    const savedImage = getLocalStorageItem(`${partId}_image_${key}`);
    if (savedImage && savedImage.trim() !== "") return savedImage;
  
    return defaultImages[key] || '';
  };

  const handleBirthdayChange = (date: Date | null) => {
    if (date) {
      const formatted = format(date, "MMMM d, yyyy");
      setBirthday(date);
      setSelectedDate(formatted);
      updateField(partId, "birthday", formatted);
    }
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
            selected={birthday || null}
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

  // Show a loading state when rendering on the server
  if (!isClient) {
    return (
      <div className="max-w-screen-md mx-auto text-center py-8">
        <p className="text-gray-500">Loading quiz...</p>
      </div>
    );
  }

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