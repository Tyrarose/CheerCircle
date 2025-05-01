// FormContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';

// Simplified form part interface
interface FormPart {
  [key: string]: string;
}

interface FormData {
  part1: FormPart;
  part2: FormPart;
  part3: FormPart;
  part4: FormPart;
  part5: FormPart;
  part6: FormPart;
  part7: FormPart;
}

interface FormContextType {
  formData: FormData;
  updateField: (part: keyof FormData, field: string, value: string) => void;
  getField: (part: keyof FormData, field: string) => string;
}

const FormContext = createContext<FormContextType | undefined>(undefined);

const initialFormData: FormData = {
  part1: {},
  part2: {},
  part3: {},
  part4: {},
  part5: {},
  part6: {},
  part7: {}
};

export const FormProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [formData, setFormData] = useState<FormData>(initialFormData);

  useEffect(() => {
    // Load initial data from localStorage
    const loadFromStorage = () => {
      Object.keys(initialFormData).forEach((part) => {
        const savedData = localStorage.getItem(`${part}-answers`);
        if (savedData) {
          try {
            setFormData(prev => ({
              ...prev,
              [part]: JSON.parse(savedData)
            }));
          } catch (error) {
            console.error(`Error loading ${part}:`, error);
          }
        }
      });
    };

    loadFromStorage();
  }, []);

  const updateField = (part: keyof FormData, field: string, value: string) => {
    setFormData(prev => {
      const newData = {
        ...prev,
        [part]: {
          ...prev[part],
          [field]: value,
        },
      };
      
      // Save to localStorage
      localStorage.setItem(`${part}-answers`, JSON.stringify(newData[part]));
      return newData;
    });
  };

  const getField = (part: keyof FormData, field: string): string => {
    const partData = formData[part];
    return partData[field] || '';
  };

  return (
    <FormContext.Provider value={{ 
      formData, 
      updateField,
      getField,
    }}>
      {children}
    </FormContext.Provider>
  );
};

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useFormContext must be used within a FormProvider');
  }
  return context;
};