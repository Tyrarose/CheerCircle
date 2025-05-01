// SwipeableCardCarousel.tsx
import React, { useState, useRef, useEffect } from 'react';
import CardTextInput from './CardTextInput';
import CardAndChips from './CardAndChips';

interface SwipeableCardCarouselProps {
  fields: string[];
  selectedField: string | null;
  onSelect: (field: string) => void;
  onValueChange: (field: string, value: string) => void;
  getFieldValue: (field: string) => string;
  quiz: Record<string, {
    bgColor: string;
    question: string;
    followUpQuestion: string;
    options?: string[];
    isRequired: boolean;
  }>;
}

const SwipeableCardCarousel: React.FC<SwipeableCardCarouselProps> = ({
  fields,
  selectedField,
  onSelect,
  onValueChange,
  getFieldValue,
  quiz
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Update currentIndex when selectedField changes
  useEffect(() => {
    if (selectedField) {
      const index = fields.indexOf(selectedField);
      if (index !== -1 && index !== currentIndex) {
        setCurrentIndex(index);
      }
    }
  }, [selectedField, fields, currentIndex]);

  // Handle swipe logic
  const handleSwipe = (direction: 'left' | 'right') => {
    let newIndex;
    if (direction === 'left') {
      newIndex = Math.min(currentIndex + 1, fields.length - 1);
    } else {
      newIndex = Math.max(currentIndex - 1, 0);
    }
    
    if (newIndex !== currentIndex) {
      setCurrentIndex(newIndex);
      onSelect(fields[newIndex]);
    }
  };

  return (
    <div className="relative w-full">
      {/* Navigation buttons */}
      <div className="flex justify-between absolute w-full top-1/2 -translate-y-1/2 z-10 px-2">
        <button
          className="bg-gray-200 rounded-full p-2 shadow-md disabled:opacity-30"
          onClick={() => handleSwipe('right')}
          disabled={currentIndex === 0}
        >
          &#8592;
        </button>
        <button
          className="bg-gray-200 rounded-full p-2 shadow-md disabled:opacity-30"
          onClick={() => handleSwipe('left')}
          disabled={currentIndex === fields.length - 1}
        >
          &#8594;
        </button>
      </div>

      {/* Cards container */}
      <div 
        ref={carouselRef}
        className="overflow-hidden"
      >
        <div 
          className="flex transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {fields.map((field, index) => {
            const cardConfig = quiz[field];
            const isSelected = selectedField === field;
            
            return (
              <div key={field} className="w-full flex-shrink-0 px-2">
                {cardConfig?.options ? (
                  <CardAndChips
                    bgColor={cardConfig.bgColor}
                    question={cardConfig.question}
                    followUpQuestion={cardConfig.followUpQuestion}
                    chips={cardConfig.options}
                    selectedChip={getFieldValue(field)}
                    onChipSelect={(value) => onValueChange(field, value)}
                  />
                ) : (
                  <CardTextInput
                    bgColor={cardConfig.bgColor}
                    question={cardConfig.question}
                    followUpQuestion={cardConfig.followUpQuestion}
                    value={getFieldValue(field)}
                    onChange={(value) => onValueChange(field, value)}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Pagination dots */}
      <div className="flex justify-center mt-4">
        {fields.map((_, index) => (
          <div
            key={index}
            className={`h-2 w-2 rounded-full mx-1 ${
              index === currentIndex ? 'bg-blue-600' : 'bg-gray-300'
            }`}
            onClick={() => {
              setCurrentIndex(index);
              onSelect(fields[index]);
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default SwipeableCardCarousel;