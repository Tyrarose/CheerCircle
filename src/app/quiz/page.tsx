"use client";

import { useState } from "react";
import { useRouter } from 'next/navigation'; // Import the useRouter hook
import Header from "../../components/organisms/Header";
import Footer from "../../components/organisms/Footer";
import Part1 from "../../pages/Part1";
import Part2 from "../../pages/Part2";
import Part3 from "../../pages/Part3";
import Part4 from "../../pages/Part4";
import Part5 from "../../pages/Part5";
import Part6 from "../../pages/Part6";
import Part7 from "../../pages/Part7";
import { FormProvider } from '../../context/FormContext';

const QUIZ_PARTS = [
  { Component: Part1, showPrevious: false },
  { Component: Part2, showPrevious: true },
  { Component: Part3, showPrevious: true },
  { Component: Part4, showPrevious: true },
  { Component: Part5, showPrevious: true },
  { Component: Part6, showPrevious: true },
  { Component: Part7, showPrevious: true, isFinal: true },
];

const QuizContent = () => {
  const [currentPart, setCurrentPart] = useState(1);
  const router = useRouter(); // Initialize the router

  const handleNavigation = (direction: 'next' | 'previous') => {
    if (direction === 'next') {
      if (currentPart === QUIZ_PARTS.length) {
        // If it's the last part and "Next" is clicked, navigate to /result
        router.push('/result');
        return; // Stop further navigation logic
      } else {
        setCurrentPart(currentPart + 1);
      }
    } else {
      setCurrentPart(Math.max(1, currentPart - 1));
    }
    window.scrollTo(0, 0);
  };

  const currentPartIndex = currentPart - 1;
  const { Component, showPrevious, isFinal } = QUIZ_PARTS[currentPartIndex] || QUIZ_PARTS[0];

  return (
    <div className="flex flex-col min-h-screen bg-yellow-eight">
      <Header />
      <div className="flex-grow flex items-center justify-center p-8 pb-20">
        <main className="gap-8 row-start-2 items-center w-full max-w-2xl">
          <Component
            onNext={() => handleNavigation('next')}
            onPrevious={showPrevious ? () => handleNavigation('previous') : undefined}
          />
        </main>
      </div>
      <Footer />
    </div>
  );
};

const Quiz = () => (
  <FormProvider>
    <QuizContent />
  </FormProvider>
);

export default Quiz;