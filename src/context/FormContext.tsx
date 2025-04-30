// FormContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';

interface FormData {
  part1: {
    fullname: string;
    birthday: string;
    favoriteColor: string;
    wordToDescribe: string;
    nickname: string;
    usernameStory: string;
    funFact: string;
  };
  part2: {
    lazyDayActivity: string;
    faveWeather: string;
    currentObsession: string;
    childhoodMemory: string;
    mostComforting: string;
  };
  part3: {
    animals: string;
    emoji: string;
    neverForget: string;
    dessert?: string;
    adventure?: string;
    song?: string;
  };
  part4: {
    superpower: string;
    season: string;
    era: string;
    googled: string;
    million: string;
    moneyNotIssue: string;
  };
  part5: {
    clothing: string;
    door: string;
    talkToAnimal: string;
    swapLife: string;
  };
  part6: {
    riseOrSet: string;
    riseOrSetWhy: string;
    dogOrCat: string;
    dogOrCatWhy: string;
    flavors: string;
    hobby: string;
  };
  part7: {
    skill: string;
    wantToTry: string;
    bucketList: string;
    buyDreamHome: string;
    ChildhoodActivity: string;
    exploreGoal: string;
  };
}

interface FormContextType {
  formData: FormData;
  updateFormData: (part: keyof FormData, data: any) => void;
  updateField: (part: keyof FormData, field: string, value: string) => void;
  getField: (part: keyof FormData, field: string) => string;
  saveToLocalStorage: () => void;
  loadFromLocalStorage: () => void;
  submitAllData: () => void;
}

const FormContext = createContext<FormContextType | undefined>(undefined);

// Debounce function
const debounce = <F extends (...args: any[]) => any>(
  func: F,
  waitFor: number
) => {
  let timeout: ReturnType<typeof setTimeout> | null = null;

  return (...args: Parameters<F>): void => {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => func(...args), waitFor);
  };
};

const initialFormData: FormData = {
  part1: {
    fullname: '',
    birthday: '',
    favoriteColor: '',
    wordToDescribe: '',
    nickname: '',
    usernameStory: '',
    funFact: '',
  },
  part2: {
    lazyDayActivity: '',
    faveWeather: '',
    currentObsession: '',
    childhoodMemory: '',
    mostComforting: '',
  },
  part3: {
    animals: '',
    emoji: '',
    neverForget: '',
    dessert: '',
    adventure: '',
    song: '',
  },
  part4: {
    superpower: '',
    season: '',
    era: '',
    googled: '',
    million: '',
    moneyNotIssue: '',
  },
  part5: {
    clothing: '',
    door: '',
    talkToAnimal: '',
    swapLife: '',
  },
  part6: {
    riseOrSet: '',
    riseOrSetWhy: '',
    dogOrCat: '',
    dogOrCatWhy: '',
    flavors: '',
    hobby: '',
  },
  part7: {
    skill: '',
    wantToTry: '',
    bucketList: '',
    buyDreamHome: '',
    ChildhoodActivity: '',
    exploreGoal: '',
  },
};

export const FormProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [formData, setFormData] = useState<FormData>(initialFormData);

  // Load data from localStorage when component mounts
  useEffect(() => {
    loadFromLocalStorage();
  }, []);

  // Save to localStorage function
  const saveToLocalStorage = () => {
    if (typeof window === 'undefined') return;

    // Save each part separately
    Object.keys(formData).forEach((part) => {
      const partKey = part as keyof FormData;
      const partData = formData[partKey];
      
      // Save text fields for each part
      localStorage.setItem(`${part}-answers`, JSON.stringify(partData));
    });
  };

  // Debounced version of saveToLocalStorage
  const debouncedSave = debounce(saveToLocalStorage, 500);

  // Load from localStorage function
  const loadFromLocalStorage = () => {
    if (typeof window === 'undefined') return;
    
    const updatedFormData = { ...initialFormData };
    
    // Load each part's data
    Object.keys(updatedFormData).forEach((part) => {
      const partKey = part as keyof FormData;
      const savedData = localStorage.getItem(`${part}-answers`);
      
      if (savedData) {
        try {
          updatedFormData[partKey] = {
            ...updatedFormData[partKey],
            ...JSON.parse(savedData)
          };
        } catch (error) {
          console.error(`Error parsing ${part} data from localStorage:`, error);
        }
      }
    });
    
    setFormData(updatedFormData);
  };

  // Update the entire section of a part
  const updateFormData = (part: keyof FormData, data: any) => {
    setFormData((prev) => {
      const newData = {
        ...prev,
        [part]: {
          ...prev[part],
          ...data,
        },
      };
      debouncedSave(); // Save after update
      return newData;
    });
  };

  // Update a specific field within a part
  const updateField = (part: keyof FormData, field: string, value: string) => {
    setFormData((prev) => {
      const newData = {
        ...prev,
        [part]: {
          ...prev[part],
          [field]: value,
        },
      };
      debouncedSave(); // Save after update
      return newData;
    });
  };

  // Get a field value
  const getField = (part: keyof FormData, field: string): string => {
    const partData = formData[part] as any;
    return partData[field] || '';
  };

  // Download all data as JSON
  const submitAllData = () => {
    // First, ensure everything is saved
    saveToLocalStorage();
    
    // Generate the final JSON data including images
    const finalData = { ...formData };
    
    // Collect image data
    const imageKeys = Object.keys(localStorage)
      .filter(key => key.match(/^part\d+_image_/));
    
    const images: {[key: string]: string} = {};
    imageKeys.forEach(key => {
      const imageData = localStorage.getItem(key);
      if (imageData) {
        images[key] = imageData;
      }
    });
    
    // Add images to final data
    const jsonData = {
      formData: finalData,
      images: images
    };
    
    // Create and download the JSON file
    const jsonString = JSON.stringify(jsonData, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'all-answers.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <FormContext.Provider value={{ 
      formData, 
      updateFormData, 
      updateField,
      getField,
      saveToLocalStorage,
      loadFromLocalStorage,
      submitAllData 
    }}>
      {children}
    </FormContext.Provider>
  );
};

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (context === undefined) {
    throw new Error('useFormContext must be used within a FormProvider');
  }
  return context;
};