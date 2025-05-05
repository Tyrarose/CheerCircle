import { FC } from "react";

interface CapsuleProps {
  color?: string;
  label: string;
  textFormat: string
}

const Capsule: FC<CapsuleProps> = ({ textFormat, color, label }) => (
  <div
    className={`px-8 py-1 
        rounded-full 
        text-md ${textFormat}
        font-archivo 
        uppercase 
        border-4 
        border-black-five 
        text-center
        ${color}`}
  >
    {label}
  </div>
);

export default Capsule;
