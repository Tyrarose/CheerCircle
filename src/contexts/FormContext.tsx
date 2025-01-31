import React, { createContext, useContext, useState } from 'react';

interface FormData {
  part1: {
    fullname: string;
    birthday: string;
    favoriteColor: string;
    wordToDescribe: string;
    nickname: string;
    usernameStory: string;
    funFact: string;
    images: {
      funnyFace: string;
      bigSmile: string;
      bestLook: string;
    };
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
  submitAllData: () => void;
}

const FormContext = createContext<FormContextType | undefined>(undefined);

export const FormProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [formData, setFormData] = useState<FormData>({
    part1: {
      fullname: '',
      birthday: '',
      favoriteColor: '',
      wordToDescribe: '',
      nickname: '',
      usernameStory: '',
      funFact: '',
      images: {
        funnyFace: '',
        bigSmile: '',
        bestLook: '',
      },
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
  });

  const updateFormData = (part: keyof FormData, data: any) => {
    setFormData((prev) => ({
      ...prev,
      [part]: {
        ...prev[part],
        ...data,
      },
    }));
  };

  const submitAllData = () => {
    const jsonString = JSON.stringify(formData, null, 2);
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
    <FormContext.Provider value={{ formData, updateFormData, submitAllData }}>
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