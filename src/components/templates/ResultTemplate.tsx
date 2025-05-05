"use client";
import React, { useEffect, useState } from "react";

import CapsuleLabel from "../molecules/result/CapsuleLabel";
import CapsuleLabelLong from "../molecules/result/CapsuleLabelLong";
import NickName from "../molecules/result/NickName";
import NeverForget from "../molecules/result/NeverForget";
import IconAndText from "../molecules/result/IconAndText";
import StackedCards from "../molecules/result/StackedCards";
import AppWindow from "../molecules/result/AppWindow";
import NameBanner from "../molecules/result/NameBanner";
import TwoColumnBordered from "../molecules/result/TwoColumnBordered";
import BottomRow from "../molecules/result/BottomRow";
import PictureWindow from "../molecules/result/PictureWindow";
import Label from "../atoms/Label";

const ResultTemplate = () => {
  const [userData, setUserData] = useState<Record<string, any>>({});
  const [funnyFaceImage, setFunnyFaceImage] = useState(undefined);
  const [funnyFaceError, setFunnyFaceError] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const getLocalStorageItem = (key: string): string | null => {
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
  
  const getFavoriteColorInsight = (color = "") => {
    const insights: { [key: string]: string } = {
      red: "Bold choice: passionate, driven, loves to stand out.",
      blue: "Values calm, trust, loyalty. A peaceful, steady soul.",
      green: "Grounded, like nature. A breath of fresh air.",
      yellow: "Bright, optimistic, lights up every single room.",
      violet: "Creative, mysterious, with a regal, artistic touch.",
      pink: "Soft heart, playful spirit. Sweet with a little edge.",
      black: "Elegant power. Mystery and depth draw them in.",
      white: "Simple, serene clarity. Quiet strength shines through.",
      orange: "Energetic, adventurous, always chasing the next thrill.",
      brown: "Reliable, stable roots. A quiet, dependable strength.",
      gray: "Balanced, wise. Logic and emotion walk hand-in-hand.",
      gold: "Seeks richness in life, beyond just things.",
      silver: "Reflective, sharp mind, graceful under pressure.",
    };
  
    const key = color?.trim() || "";
    return insights[key] || "Intriguing color choice. Hints at a layered soul.";
  };

  const getSeasonInsight = (season = "") => {
    if (!season) return "A season unlike any other — just like them.";
    
    switch (season) {
      case "summer":
        return "They bring warmth and a burst of energy wherever they go";
      case "winter":
        return "Cool, introspective, and quietly powerful";
      case "spring":
        return "Always blooming with new ideas and vibrant hope";
      case "autumn":
      case "fall":
        return "Their presence is comforting, like a warm cup of tea in crisp air";
      default:
        return "A season unlike any other — just like them";
    }
  };

  const getDogOrCatInsight = (choice = "") => {
    if (!choice) return "They exist in a category all their own.";
    
    switch (choice) {
      case "dog":
        return "Loyal, playful, and always up for a new adventure.";
      case "cat":
        return "Independent, intuitive, and full of quiet mischief.";
      default:
        return "They exist in a category all their own.";
    }
  };

  const getCleaningInsight = (choice = "") => {
    if (!choice) return "Balances order and ease in their own way.";
  
    switch (choice) {
      case "clean now, rest later":
        return "Values accomplishment before peace. Action-oriented, enjoys a tidy reward.";
      case "rest now, clean later":
        return "Prioritizes well-being. Believes in recharging before tackling tasks.";
      default:
        return "Balances order and ease in their own way.";
    }
  };
  
  const getMillionInsight = (million = "") => {
    if (!million) return "";
    
    if (million.includes("help")) {
      return "A heart that thinks beyond the self — they'd uplift others first.";
    } else if (million.includes("travel")) {
      return "Curious and bold, they'd turn fortune into unforgettable memories.";
    } else if (million.includes("invest")) {
      return "Strategic and forward-thinking — they plant seeds for tomorrow.";
    } else if (million.includes("business")) {
      return "Driven and independent — they're wired to build their own path, a true creator.";
    } else {
      return "Their instincts say it all — no hesitation, just bold moves.";
    }
  };
  
  const getWordToDescribeInsight = (word = "") => {
    if (!word) return "They're uniquely themselves — too special to be summed up in one word.";
    
    switch (word) {
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
  
  const getEraInsight = (era = "") => {
    if (!era) return "A traveler through time — they carry traits from many eras, making them endlessly unique.";
    
    switch (era) {
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

  const getRiseOrSetInsight = (choice = "") => {
    if (!choice) return "They find meaning in both beginnings and endings.";
    
    switch (choice) {
      case "sunrise":
        return "They embrace new beginnings and fresh opportunities.";
      case "sunset":
        return "They appreciate beauty in closing chapters and peaceful reflection.";
      default:
        return "They find meaning in both beginnings and endings.";
    }
  };

  const getHobbyInsight = (hobby = "") => {
    if (!hobby) return "Whatever captures their interest becomes a canvas for their passion.";
    
    if (hobby.includes("read")) {
      return "Their mind is a library of stories, ideas, and endless curiosity.";
    } else if (hobby.includes("music") || hobby.includes("sing") || hobby.includes("play")) {
      return "They find rhythm in life and harmony in challenges.";
    } else if (hobby.includes("art") || hobby.includes("paint") || hobby.includes("draw")) {
      return "They see the world in colors others might miss.";
    } else if (hobby.includes("sport") || hobby.includes("run") || hobby.includes("bike")) {
      return "Determination and energy fuel both their passions and pursuits.";
    } else if (hobby.includes("cook") || hobby.includes("bake")) {
      return "They know life, like good food, is about bringing the right elements together.";
    } else {
      return "Their interests reveal a soul that's always exploring.";
    }
  };

  const getIcon = (item = "") => {
    switch (item || "") {
      // Icon for Season
      case "spring":
        return "fa fa-leaf";
      case "summer":
        return "fa fa-sun";
      case "autumn":
        return "fa fa-tint";
      case "winter":
        return "fa fa-snowflake";

      default:
        return "fa fa-phone";
    }
  };

  const getLoveLanguageInsight = (loveLanguage = "") => {
    switch (loveLanguage.toLowerCase()) {
      case "acts of service":
        return "Oh! Helping hands make their heart happy. Doing things for them is like a super sweet hug!";
      case "receiving gifts":
        return "Ooh, shiny! Little presents and thoughtful surprises make them feel extra special and loved.";
      case "quality time":
        return "Hey! Just being together, doing fun stuff, makes their heart glow. It's all about special moments!";
      case "words of affirmation":
        return "Shhh... Kind words are like sunshine to them. Hearing nice things makes them feel so good inside.";
      case "physical touch":
        return "A gentle squeeze or a high-five? That's their language! Feeling close makes them feel super loved.";
      default:
        return "Hmm, figuring out what makes their heart happy is like a fun little adventure!";
    }
  };

  const getDigDeeper = (
    skill = "", 
    wantToTry = "",
    bucketList  = "",
    buyDreamHome  = "", 
    exploreGoal   = "",
  ) => {
    let story = "Imagine a world where anything is possible...\n";

    if (skill) {
      story += `In this realm, they suddenly possessed the mastery of ${skill}. What wonders would they create with this newfound talent?`;
    } else {
      story += "A spark of potential flickered within, ready to ignite any hidden ability.";
    }
  
    if (wantToTry) {
      story += `There was always that one thing, ${wantToTry}, they longed to experience but hadn't yet. Perhaps now, the reasons holding them back would simply fade away.`;
    } else {
      story += "A sense of unexplored possibilities lingered, waiting for the right moment to be embraced.";
    }
  
    if (bucketList) {
      story += `A cherished dream, ${bucketList}, felt closer than ever.`;
      if (bucketList) {
        story += ` The thought of finally reaching ${bucketList} filled them with excitement.`;
      } else {
        story += " The anticipation of finally making it happen was thrilling.";
      }
    } else {
      story += "A whisper of adventure beckoned, hinting at journeys yet to be taken.";
    }
  
    if (buyDreamHome) {
      story += `The first treasure for their dream home would be ${buyDreamHome}. It would be more than just an object; it would be a symbol of comfort and belonging.`;
    } else {
      story += "The foundations of a perfect sanctuary awaited their personal touch.";
    }
    
    if (exploreGoal) {
      story += `A quiet curiosity tugged at them – the desire to explore the small goal of ${exploreGoal}. It was a chance for personal growth and enjoyment.`;
    } else {
      story += "A gentle nudge towards self-discovery suggested new hobbies and interests waiting to be found.";
    }
  
    story += "In this 'what if' scenario, the possibilities stretched as far as the imagination could reach. What a wonderful world it could be!";
  
    return story;
  };

  
useEffect(() => {
  setIsClient(true);
  
  const loadClientData = () => {
    try {
      const cachedData = getCacheData();
      
      // No data case - exit early
      if (cachedData === null || cachedData === undefined) {
        return;
      }
      
      // Format data according to its type before updating state
      const formattedData = formatDataForState(cachedData);
      setUserData(formattedData);
      } catch (error) {
        console.error("Error loading client data:", error);
      }
    };
  
    // Only run on the client side
    if (typeof window !== 'undefined') {
      loadClientData();
    }
  }, [getCacheData, setUserData, setIsClient]);

  //  Formats various data types into the object format required by setUserData
  function formatDataForState(data: any): Record<string, any> {
    // Case 1: If it's already an object, lowercase string values
    if (data && typeof data === 'object' && !Array.isArray(data)) {
      const result: Record<string, any> = {};
      
      Object.entries(data).forEach(([key, value]) => {
        result[key] = typeof value === 'string' 
          ? value.toLowerCase() 
          : value;
      });
      return result;
    }
    
    // Case 2: If it's a string, wrap in an object
    if (typeof data === 'string') {
      return { value: data.toLowerCase() };
    }
    
    // Case 3: For any other type, wrap in an object
    return { value: data };
  }

  if (!isClient && isLoading) {
    return (
      <div className="max-w-screen-md mx-auto text-center py-8">
        <p className="text-gray-500">Loading your story...</p>
      </div>
    );
  }


  return (
    <div className="mx-auto space-y-8 whitespace-pre-wrap font-serif text-lg leading-relaxed px-4 mb-6">
      <main className="m-20 py-8"> 
        <div className="flex flex-col md:grid md:grid-cols-1 lg:grid-cols-2 lg:gap-8">
          {/* FIRST PAGE */}
          <section className="flex flex-col flex-1 md:h-auto md:w-auto mb-8 lg:mb-0 bg-yellow-nine">
            <NameBanner name={userData.fullname || "tyra banks"}/>
            <TwoColumnBordered
              leftContent={userData.favoriteColor || "red"}
              rightContent={getFavoriteColorInsight(userData.favoriteColor)}
            />
            <div className="flex flex-row flex-grow gap-4">
              {/* LEFT COLUMN */}
              <section className="flex-1">
                <CapsuleLabel
                  color="bg-blue-six" 
                  upper="When asked to describe themselves in one word, they chose:"
                  word={userData.wordToDescribe || "Unique"}
                  lower={getWordToDescribeInsight(userData.wordToDescribe)}
                />
                <CapsuleLabel
                  color="bg-red-six"
                  upper="On a lazy day, you'll likely find them"
                  word={userData.lazyDayActivity || "Relaxing"}
                />
                <CapsuleLabel
                  color="bg-green-six"
                  upper="Lately, they've been obsessed with:"
                  word={userData.currentObsession || "doomscrolling"}
                />
                <NickName 
                  name={userData.nickname || "Ramen Noodles"} 
                  story={userData.usernameStory || "I have curly hair"}
                />
                <CapsuleLabel
                  color="bg-violet-six"
                  upper="Childhood nostalgia hits with:"
                  word={userData.childhoodMemory || "Super Mario"}
                />
                <CapsuleLabel
                  color="bg-yellow-six"
                  upper="In terms of cleaning, they prefer:"
                  word={userData.cleaning || "Cleaning asap"}
                  lower={getCleaningInsight(userData.cleaning)}
                />
                <CapsuleLabelLong
                  color="bg-blue-six"
                  upper="An advice to their younger self"
                  word={`"${userData.advice} ... "` || "This too shall pass"}
                />
              </section>

              {/* RIGHT COLUMN */}
              <section className="flex-1">
                <PictureWindow
                  picture=""
                  color={`bg-${userData.favoriteColor}-five`}
                  fact={userData.funFact || "Bananas are berries, but strawberries aren't!"}
                />
                <CapsuleLabel
                  color="bg-blue-six"
                  upper="Their love language is"
                  word={userData.loveLanguage || "words of affirmation"}
                  lower={getLoveLanguageInsight(userData.loveLanguage)}
                />
                <CapsuleLabel
                  color="bg-red-six"
                  upper="In a world of magic, their dream superpower would be: "
                  word={userData.superpower || "Color changing Steps"}
                />
                <CapsuleLabel
                  color="bg-blue-six"
                  upper="First move with a million dollars?"
                  word={userData.million || "Create a Museum of Socks"}
                  lower={getMillionInsight(userData.million)}
                />
                <CapsuleLabel
                  color="bg-red-six"
                  word={userData.riseOrSet || "Sunrise and Sunset"}
                  lower={userData.riseOrSetWhy || getRiseOrSetInsight(userData.riseOrSet)}
                />
              </section>
            </div>
            <BottomRow
              col1={{ 
                text: userData.birthday || "Birthday", 
                icon: "fa fa-birthday-cake",
                color: "bg-blue-five" 
              }}
              col2={{ 
                text: userData.birthday || "Birthday", 
                icon: "fa fa-birthday-cake",
                color: "bg-violet-five" 
              }}
              col3={{ 
                text: userData.season || "Season", 
                icon: getIcon(userData.season), 
                color: "bg-green-five" 
              }}
              col4={{ 
                text: userData.superpower || "Superpower", 
                icon: "fa fa-bolt", 
                color: "bg-red-five" 
              }}
            />
          </section>

          {/* SECOND PAGE */}
          <section className="flex flex-col flex-1 md:h-auto md:w-auto mb-8 lg:mb-0 bg-yellow-nine">
            <NameBanner name={userData.fullname || "Your Name"}/>
            <TwoColumnBordered
              leftContent={userData.season || "Season"}
              rightContent={getSeasonInsight(userData.season)}
            />
            <div className="flex flex-row flex-grow gap-4">
              {/* LEFT COLUMN */}
              <section className="flex-1">
                <NeverForget
                  color="bg-pink-six"
                  label={userData.neverForget || "Screaming the name of my crush"}
                />
                <CapsuleLabel
                  color="bg-yellow-six"
                  upper="Their taste? Definitely"
                  word={userData.flavors || "Sweet"}
                />
                <CapsuleLabelLong
                  color="bg-blue-six"
                  upper="Last thing they googled?"
                  word={`"${userData.googled} ... "` || "Tung tung tung sahur"}
                />
                <div className="flex flex-col m-3 gap-3">
                  <IconAndText 
                    icon="fa fa-tshirt" 
                    color="bg-red-six" 
                    leftAlign 
                    label={`As clothing, they'd be: ${userData.clothing || "Something that fits just right"}`}
                  />
                  <IconAndText 
                    icon="fa fa-door-open" 
                    color="bg-red-six" 
                    leftAlign 
                    label={`As a door? "${userData.door || "One that opens to possibilities"}"`}
                  />
                  <IconAndText 
                    icon="fa fa-exchange-alt" 
                    color="bg-red-six" 
                    leftAlign 
                    label={`They'd trade lives for a day with: ${userData.swapLife || "Someone fascinating"}`}
                  />
                </div>
                <AppWindow 
                  color="bg-green-five" 
                  text={`To feel seen is ${userData.seenOrUnderstood} — and the most comforting moment was ${userData.mostComforting}` || "A gesture that stayed with them..."}
                />
                <StackedCards 
                  title="About Us"
                  color="bg-red-six" 
                  text={"Pick from 3 options of questions swipes"} 
                />
              </section> 
              {/* RIGHT COLUMN */}
              <section className="flex-1">
                <CapsuleLabel
                  color="bg-violet-six"
                  upper="Their hobby heart belongs to:"
                  word={userData.hobby || "Hobby"}
                  lower={getHobbyInsight(userData.hobby)}
                />
                <CapsuleLabel
                  color="bg-green-six"
                  upper="Cat or Dog?"
                  word={userData.dogOrCat || "Both!"}
                  lower={getDogOrCatInsight(userData.dogOrCat)}
                />
                <CapsuleLabelLong
                  color="bg-blue-six"
                  upper="If money wasn't an issue, they'd:"
                  word={`"${userData.moneyNotIssue} ... "` || "Dreams without limits"}
                />
                <StackedCards 
                  title="Dig Deeper"
                  color="bg-violet-seven" 
                  text={getDigDeeper(
                    userData.skill, 
                    userData.wantToTry, 
                    userData.bucketList, 
                    userData.buyDreamHome, 
                    userData.exploreGoal)} 
                />
              </section>
            </div>
            <BottomRow
              col1={{ 
                text: userData.loveLanguage || "Love Language",
                icon: "fa fa-heart", 
                color: "bg-blue-five" 
              }}
              col2={{ 
                text: userData.era || "Era", 
                icon: "fa fa-history", 
                color: "bg-violet-five" 
              }}
              col3={{ 
                text: userData.flavors || "Taste", 
                icon: "fa fa-utensils", 
                color: "bg-green-five" 
              }}
              col4={{ 
                text: userData.hobby || "Hobby", 
                icon: "fa fa-heart", 
                color: "bg-red-five" 
              }}
            />
          </section>
        </div>
      </main>
    </div>
  );
};

export default ResultTemplate;