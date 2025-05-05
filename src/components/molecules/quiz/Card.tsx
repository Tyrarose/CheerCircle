import { FC } from "react";

interface CardProps {
  bgColor: string;
  children: React.ReactNode;
}

const Card: FC<CardProps> = ({ bgColor, children }) => (
  <div
    className={`p-8 rounded-[30px] shadow-md ${bgColor} w-full`}
  >
    {children}
  </div>
);

export default Card;