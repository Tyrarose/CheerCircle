"use client";
import React, { useEffect, useState } from "react";

const ResultTemplate = () => {
  const [story, setStory] = useState("");
  const [images, setImages] = useState<{
    funnyFace?: string;
  }>({});
  const [imageErrors, setImageErrors] = useState({
    funnyFace: false,
  });
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

  const getCacheData = () => {
    // Guard against server-side rendering where localStorage is unavailable
    if (typeof window === 'undefined') return {};
    
    const mergedAnswers = {};
    for (let i = 1; i <= 7; i++) {
      const part = getLocalStorageItem(`part${i}-answers`);
      if (part) {
        try {
          Object.assign(mergedAnswers, JSON.parse(part));
        } catch (e) {
          console.error(`Error parsing part${i}-answers:`, e);
        }
      }
    }
    return mergedAnswers;
  };

  const getIntro = (fullname: string | undefined, nickname: string | undefined, birthday: string | undefined) => {
    const options = [
      `Meet ${fullname || "our mysterious friend"}${nickname ? ` (aka ${nickname})` : ""}, born on ${birthday}.`,
      `${fullname ? fullname : "Someone"} just stepped into the spotlight.${nickname ? ` Nickname? ${nickname}.` : ""}`,
      `Once upon a time, on ${birthday}, ${fullname || "a curious soul"} was born.`,
      `This story begins with ${fullname || "a mystery"}${nickname ? `, known to some as ${nickname}` : ""}.`,
      `${fullname ? `${fullname} — a name to remember.` : "A story with an unknown name, yet so vivid."}`,
    ];
    return options[Math.floor(Math.random() * options.length)];
  };
  
  const getFavoriteColorInsight = (color: string = ""): string => {
    const insights: Record<string, string> = {
      red: "A bold choice — passionate, driven, and never afraid to stand out.",
      blue: "They value calm, trust, and loyalty. A peaceful presence in a chaotic world.",
      green: "Grounded and in tune with nature, they're a breath of fresh air.",
      yellow: "Bright and optimistic, they tend to light up any room.",
      purple: "Creative and mysterious, with a touch of royalty.",
      pink: "A heart full of softness and a spark of playful rebellion.",
      black: "Elegant and powerful — they find comfort in mystery and depth.",
      white: "Simple, serene, and full of clarity. There's beauty in their quiet strength.",
      orange: "Energetic, adventurous, and always chasing the next thrill.",
      brown: "Reliable, stable, and deeply rooted. A quiet strength surrounds them.",
      gray: "Balanced and wise, they walk the fine line between logic and emotion.",
      gold: "They seek richness in life — not just in things, but in meaning.",
      silver: "Reflective, sharp, and graceful under pressure.",
    };
  
    const key = color?.toLowerCase().trim() || "";
    return insights[key] || "An intriguing color — a choice that hints at a layered soul.";
  };

  const getSeasonInsight = (season: string = "") => {
    if (!season) return "A season unlike any other — just like them.";
    
    switch (season.toLowerCase()) {
      case "summer":
        return "They bring warmth and a burst of energy wherever they go.";
      case "winter":
        return "Cool, introspective, and quietly powerful.";
      case "spring":
        return "Always blooming with new ideas and vibrant hope.";
      case "autumn":
      case "fall":
        return "Their presence is comforting, like a warm cup of tea in crisp air.";
      default:
        return "A season unlike any other — just like them.";
    }
  };

  const getDogOrCatInsight = (choice: string = "") => {
    if (!choice) return "They exist in a category all their own.";
    
    switch (choice.toLowerCase()) {
      case "dog":
        return "Loyal, playful, and always up for a new adventure.";
      case "cat":
        return "Independent, intuitive, and full of quiet mischief.";
      default:
        return "They exist in a category all their own.";
    }
  };
  
  const getMillionInsight = (million: string = "") => {
    if (!million) return "";
    
    if (million.toLowerCase().includes("help")) {
      return "A heart that thinks beyond the self — they'd uplift others first.";
    } else if (million.toLowerCase().includes("travel")) {
      return "Curious and bold, they'd turn fortune into unforgettable memories.";
    } else if (million.toLowerCase().includes("invest")) {
      return "Strategic and forward-thinking — they plant seeds for tomorrow.";
    } else {
      return "Their instincts say it all — no hesitation, just bold moves.";
    }
  };
  
  const getFaveWeatherInsight = (weather: string = "") => {  
    if (!weather) return "Whatever the sky holds, they find their own kind of magic in it.";
    
    switch (weather.toLowerCase()) {
      case "sunny":
        return "A true sun-chaser — they light up the room and thrive under warmth and clarity.";
      case "rainy":
        return "There's comfort in the sound of raindrops — introspective, poetic, and gentle.";
      case "cloudy":
        return "They find beauty in the gray — calm, dreamy, and always thinking deeply.";
      case "snowy":
        return "Soft yet bold — they carry a quiet strength, just like fresh snowfall.";
      case "breezy":
        return "Easygoing and free-spirited — like a breeze, they bring calm wherever they go.";
      default:
        return "Whatever the sky holds, they find their own kind of magic in it.";
    }
  };
  
  const getWordToDescribeInsight = (word: string = "") => {
    if (!word) return "They're uniquely themselves — too special to be summed up in one word.";
    
    switch (word.toLowerCase()) {
      case "calm":
        return "Steady and soothing, they bring peace into every room they enter.";
      case "adventurous":
        return "Always chasing the next thrill — their spirit is fearless and bold.";
      case "creative":
        return "Their mind paints outside the lines — full of original ideas and vibrant visions.";
      case "mysterious":
        return "An enigma wrapped in curiosity — deep, intriguing, and full of untold stories.";
      case "friendly":
        return "Warm, open, and kind — they make everyone feel like an old friend.";
      case "smart":
        return "Quick-witted and insightful — they notice what others miss and think a few steps ahead.";
      case "funny":
        return "A walking ray of sunshine — laughter follows wherever they go.";
      case "imaginative":
        return "Their world is one of wonder — full of dreams, stories, and wild ideas.";
      case "innocent":
        return "Pure-hearted and sweet — they see the good in people and find joy in simple things.";
      default:
        return "They're uniquely themselves — too special to be summed up in one word.";
    }
  };
  
  const getEraInsight = (era: string = "") => {
    if (!era) return "A traveler through time — they carry traits from many eras, making them endlessly unique.";
    
    switch (era.toLowerCase()) {
      case "ancient times":
        return "A timeless soul — wise beyond years, deeply rooted in history, and drawn to the mysteries of the past.";
      case "the 1800s":
        return "Romantic and curious — someone who finds wonder in handwritten letters, horse-drawn dreams, and old-world charm.";
      case "the roaring '20s":
        return "Bold and full of flair — they're the life of the party, living with rhythm, jazz, and untamed spirit.";
      case "the '80s":
        return "Vibrant, unapologetic, and electric — just like big hair and synth beats, they leave a mark wherever they go.";
      case "the future":
        return "Visionary and limitless — their mind lives in tomorrow, always dreaming forward with fierce creativity.";
      default:
        return "A traveler through time — they carry traits from many eras, making them endlessly unique.";
    }
  };
  
  const storyTemplate = (data: Record<string, any>) => {
    const {
      fullname,
      nickname,
      usernameStory,
      birthday,
      favoriteColor,
      wordToDescribe,
      lazyDayActivity,
      faveWeather,
      currentObsession,
      childhoodMemory,
      mostComforting,
      animals,
      emoji,
      neverForget,
      dessert,
      adventure,
      song,
      superpower,
      season,
      era,
      googled,
      million,
      moneyNotIssue,
      clothing,
      clothingInsight,
      door,
      doorInsight,
      talkToAnimal,
      swapLife,
      riseOrSet,
      riseOrSetInsight,
      riseOrSetWhy,
      dogOrCat,
      dogOrCatWhy,
      flavors,
      flavorsInsight,
      hobby,
      hobbyInsight,
      funFact,
    } = data;
    
    return `
    ${getIntro(fullname, nickname, birthday)}
    ${usernameStory ? `\n${usernameStory}` : ""}
    
    Their favorite color? ${favoriteColor || "A mystery for now"}. ${getFavoriteColorInsight(favoriteColor)}
    When asked to describe themselves in one word, they chose: ${wordToDescribe || "Indescribable"}. ${getWordToDescribeInsight(wordToDescribe)}
    On a lazy day, you'll likely find them "${lazyDayActivity || "doing what brings them joy"} ... ".
    They adore ${faveWeather || "their own special"} weather — ${getFaveWeatherInsight(faveWeather)}
    
    Lately, they've been obsessed with: ${currentObsession || "something special"}. Childhood nostalgia hits with memories like: ${childhoodMemory || "those they keep close to heart"}.
    ${mostComforting ? `A gesture that stayed with them? "${mostComforting}".` : ""}
    ${funFact ? `A fun fact about them: "${funFact}"` : ""}
    
    In a more whimsical mood, they imagine us as — "${animals || "unique creatures"}". To describe me? They simply say "${emoji || "✨"}".
    Unforgettable? ${neverForget || "Some things remain a beautiful mystery"}.
    
    ${dessert ? `If I were dessert, I'd be: "${dessert}". Sweet or spicy — that's up to interpretation.` : ""}
    ${adventure ? `Our dream adventure? ${adventure}` : ""}
    ${song ? `A song that brings us to mind? "${song}".` : ""}
    
    In a world of magic, their dream superpower would be: ${superpower || "something extraordinary"}. As a season, they feel like ${season || "a blend of all seasons"}. ${getSeasonInsight(season)}
    If they could live in any era, it would be ${era || "one of their choosing"}. ${getEraInsight(era)}
    
    Their last Google search? "${googled || "Something intriguing"}". 
    ${million ? `First move with a million dollars? ${million}. ${getMillionInsight(million)}` : ""}
    ${moneyNotIssue ? `If money wasn't an issue, they'd: "${moneyNotIssue}"` : ""}
    
    As clothing, they'd be: ${clothing || "something that fits just right"}. ${clothingInsight || ""}
    As a door? "${door || "One that opens to possibilities"}". ${doorInsight || ""}
    
    ${talkToAnimal ? `If they could talk to any animal, it would be: ${talkToAnimal}.` : ""}
    ${swapLife ? `They'd trade lives for a day with: ${swapLife}` : ""}
    
    ${riseOrSet ? `They chose ${riseOrSet} — ${riseOrSetInsight || ""}` : ""}
    ${riseOrSetWhy ? `"${riseOrSetWhy}"` : ""}
    
    ${dogOrCat ? `Team ${dogOrCat}. ${getDogOrCatInsight(dogOrCat)}.` : ""}
    ${dogOrCatWhy ? `"${dogOrCatWhy}"` : ""}
    
    ${flavors ? `Their taste? Definitely ${flavors}. ${flavorsInsight || ""}` : ""}
    ${hobby ? `Their hobby heart belongs to: ${hobby}. ${hobbyInsight || ""}` : ""}
    `;
  };

  // Function to safely handle image loading and display
  const handleImageError = (type: string) => {
    setImageErrors(prev => ({
      ...prev,
      [type]: true
    }));
    console.error(`Failed to load image: ${type}`);
  };

  useEffect(() => {
    // Mark that we're running on the client side
    setIsClient(true);
    
    // This runs only client-side
    const loadClientData = () => {
      try {
        // Get story data
        const answers = getCacheData();
        
        // Get image data from localStorage - could be base64 strings or URLs
        const imageData = {
          funnyFace: getLocalStorageItem("funnyFace") || undefined,
        };
        
        setImages(imageData);
        
        const storyText = storyTemplate(answers);
        setStory(storyText.trim());
      } catch (error) {
        console.error("Error loading client data:", error);
        setStory("There was an error loading your story. Please try refreshing the page.");
      }
    };

    // Only run on the client
    if (typeof window !== 'undefined') {
      loadClientData();
    }
  }, []);

  // Show a loading state when rendering on the server or before client-side code runs
  if (!isClient) {
    return (
      <div className="max-w-screen-md mx-auto text-center py-8">
        <p className="text-gray-500">Loading your story...</p>
      </div>
    );
  }

  // Function to render a placeholder image
  const renderPlaceholder = () => (
    <div className="bg-gray-200 rounded-lg flex items-center justify-center h-64">
      <p className="text-gray-500">Image not available</p>
    </div>
  );

  // Function to render an image with error handling
  const renderImage = (src: string | undefined, alt: string, type: string) => {
    if (!src || imageErrors[type as keyof typeof imageErrors]) {
      return renderPlaceholder();
    }

    return (
      <img
        src={src}
        alt={alt}
        className="rounded-lg shadow-md mx-auto max-h-64 object-cover"
        onError={() => handleImageError(type)}
      />
    );
  };

  return (
    <div className="max-w-screen-md mx-auto space-y-8 whitespace-pre-wrap font-serif text-lg leading-relaxed px-4">
      {/* Display the story text */}
      {story ? (
        <main className="story-content"> {story}

          <section>
            <div className="bg-yellow-five w-full">
              Francois Mercer
            </div>
            <div className="w-full bg-black-five"></div>
            <ul>
              <li>Motion Designer</li>
              <li>Motion Designer</li>
              <li>Motion Designer</li>
            </ul>
          </section>

          <section>
            {/* body */}
          </section>

          <section>
            {/* footer */}
          </section>
        </main>
      ) : (
        <section className="text-center py-8">
          <p className="text-gray-500">Loading your story...</p>
        </section>
      )}
      
      {/* Display images if they exist */}
      {(images.funnyFace) && (
        <div className="image-gallery mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          {images.funnyFace && (
            <div className="image-container">
              <h3 className="text-center font-medium mb-2">Making a Funny Face</h3>
              {renderImage(images.funnyFace, "Making a funny face", "funnyFace")}
            </div>
          )}

        </div>
      )}
    </div>
  );
};

export default ResultTemplate;