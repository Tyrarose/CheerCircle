"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/atoms/Button";

export default function Home() {
  const router = useRouter();
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    router.prefetch('/login');
  }, []);

  const handleClick = () => {
    setAnimate(true);
    setTimeout(() => {
      router.push("/login");
    }, 180);
  };

  return (
    <div className="relative overflow-hidden">
      {/* Background Image */}
      <section
        className="absolute inset-0"
        style={{
          backgroundImage: "url('/images/home-bg.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></section>

      {/* White Layer Overlay */}
      <section className="absolute inset-0 bg-white bg-opacity-70 z-1" />

      {/* Expanding circle */}
      <div
        className={`fixed z-50 rounded-full transition-transform duration-180 ease-out 
          ${animate ? "scale-[100]" : "scale-0"} 
          w-10 h-10 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none`}
        style={{
          backgroundColor: animate ? "#DEDCD8" : "#FFE600", // Replace with your Tailwind yellow-five value if needed
          transition: "transform 0.7s ease-out, background-color 0.7s ease-out",
        }}
      ></div>


      {/* Content */}
      <section className="flex items-center justify-center min-h-screen z-10 relative text-black">
        <div className="grid grid-cols-1 gap-4 text-center">
          <p className="text-black">Welcome to CheerCircle!</p>
          <p className="text-black">Your personalized digital slam book, made just for you!</p>
          <Button onClick={handleClick} disabled={false}>
            Create Your Link Now!
          </Button>
        </div>
      </section>
    </div>
  );
}
