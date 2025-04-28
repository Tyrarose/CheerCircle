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
import {FormProvider} from '../../context/FormContext';


const Quiz = () => {
  const [currentPart, setCurrentPart] = useState(1);

  const handleNext = () => {
    setCurrentPart((prev) => prev + 1);
  };

  const handlePrevious = () => {
    setCurrentPart((prev) => (prev > 1 ? prev - 1 : prev));
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPart]);

  const renderPart = () => {
    switch (currentPart) {
      case 1:
        return <Part1 onNext={handleNext} />;
      case 2:
        return <Part2 onNext={handleNext} onPrevious={handlePrevious} />;
      case 3:
        return <Part3 onNext={handleNext} onPrevious={handlePrevious} />;
      case 4:
        return <Part4 onNext={handleNext} onPrevious={handlePrevious} />;
      case 5:
        return <Part5 onNext={handleNext} onPrevious={handlePrevious} />;
      case 6:
        return <Part6 onNext={handleNext} onPrevious={handlePrevious} />;
      case 7:
        return <Part7 onNext={handleNext} onPrevious={handlePrevious} />;
      case 8:
        return <Final onPrevious={handlePrevious} />;
      default:
        return <Part1 onNext={handleNext} />;
    }
  };

  return (
    <FormProvider>
      <div className="bg-yellow-eight min-h-screen flex flex-col">
        <Header />
        <div className="flex-grow flex items-center justify-center p-8 pb-20">
          <main className="gap-8 row-start-2 items-center w-full max-w-2xl">
            {renderPart()}
          </main>
        </div>
        <Footer />
      </div>
    </FormProvider>
  );
};

export default Quiz;
