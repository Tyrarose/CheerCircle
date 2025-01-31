"use client";
import { FC } from "react";

interface ButtonProps {
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
  disabled?: boolean; 
}

const Button: FC<ButtonProps> = ({ onClick, className, style, children, disabled }) => (
  <button
    onClick={disabled ? undefined : onClick}
    className={`px-6 py-3 rounded-full 
      ${disabled ? "bg-gray-six text-gray-five cursor-not-allowed" : "bg-yellow-five text-black-five"} 
      font-baloo font-bold flex items-center justify-center 
      w-full text-[16px] sm:text-[16px] lg:text-[18px] ${className}`}
    style={style}
    disabled={disabled}
  >
    {children}
  </button>
);

export default Button;
