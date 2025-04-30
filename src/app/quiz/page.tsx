// Quiz/Page.tsx

"use client";

import { useState, useEffect } from "react";
import Header from "../../components/organisms/Header";
import Footer from "../../components/organisms/Footer";
import Part1 from "../../components/templates/Part1";
import Part2 from "../../components/templates/Part2";
import Part3 from "../../components/templates/Part3";
import Part4 from "../../components/templates/Part4";
import Part5 from "../../components/templates/Part5";
import Part6 from "../../components/templates/Part6";
import Part7 from "../../components/templates/Part7";
import Final from "../../components/templates/Final";
import { FormProvider, useFormContext } from '../../context/FormContext';

// Component that handles image caching
const FormWithImageCaching = ({ children }: { children: React.ReactNode }) => {
  const { updateFormData } = useFormContext();
  
  // Load cached images from localStorage on initial render
  useEffect(() => {
    // Get all localStorage keys
    const keys = Object.keys(localStorage);
    
    // Filter for image keys
    const imageKeys = keys.filter(key => key.match(/^part\d+_image_/));
    
    // Process saved images
    if (imageKeys.length > 0) {
      console.log("Found cached images:", imageKeys);
    }
  }, []);
  
  return <>{children}</>;
};

// Custom FormProvider wrapper
const CustomFormProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <FormProvider>
      <FormWithImageCaching>{children}</FormWithImageCaching>
    </FormProvider>
  );
};

// Main Quiz content component
const QuizContent = () => {
  const [currentPart, setCurrentPart] = useState(1);
  const { saveToLocalStorage } = useFormContext();

  // Function to save image to localStorage
  const cacheImage = (part: string, key: string, file: File) => {
    // Read the file and store it as base64 in localStorage
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      localStorage.setItem(`${part}_image_${key}`, base64String);
    };
    reader.readAsDataURL(file);
  };

  const handleNext = () => {
    // Save data before navigation
    saveToLocalStorage();
    setCurrentPart((prev) => prev + 1);
    window.scrollTo(0, 0);
  };

  const handlePrevious = () => {
    // Save data before navigation
    saveToLocalStorage();
    setCurrentPart((prev) => (prev > 1 ? prev - 1 : prev));
    window.scrollTo(0, 0);
  };

  const renderPart = () => {
    switch (currentPart) {
      case 1:
        return <Part1 onNext={handleNext} cacheImage={(key, file) => cacheImage("part1", key, file)} />;
      case 2:
        return <Part2 onNext={handleNext} onPrevious={handlePrevious} cacheImage={(key, file) => cacheImage("part2", key, file)} />;
      case 3:
        return <Part3 onNext={handleNext} onPrevious={handlePrevious} cacheImage={(key, file) => cacheImage("part3", key, file)} />;
      case 4:
        return <Part4 onNext={handleNext} onPrevious={handlePrevious} cacheImage={(key, file) => cacheImage("part4", key, file)} />;
      case 5:
        return <Part5 onNext={handleNext} onPrevious={handlePrevious} cacheImage={(key, file) => cacheImage("part5", key, file)} />;
      case 6:
        return <Part6 onNext={handleNext} onPrevious={handlePrevious} cacheImage={(key, file) => cacheImage("part6", key, file)} />;
      case 7:
        return <Part7 onNext={handleNext} onPrevious={handlePrevious} cacheImage={(key, file) => cacheImage("part7", key, file)} />;
      case 8:
        return <Final onPrevious={handlePrevious} />;
      default:
        return <Part1 onNext={handleNext} cacheImage={(key, file) => cacheImage("part1", key, file)} />;
    }
  };

  return (
    <div className="bg-yellow-eight min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow flex items-center justify-center p-8 pb-20">
        <main className="gap-8 row-start-2 items-center w-full max-w-2xl">
          {renderPart()}
        </main>
      </div>
      <Footer />
    </div>
  );
};

const Quiz = () => {
  return (
    <CustomFormProvider>
      <QuizContent />
    </CustomFormProvider>
  );
};

export default Quiz;