import { FC } from "react";

interface StackedCardsProps {
  text: string;
  color: string;
  title: string;
}

const StackedCards: FC<StackedCardsProps> = ({ text, color, title }) => (
  <div className="relative w-full px-6 py-6">
    {/* Container to preserve layout and provide space for stack */}
    <div className="relative w-full">
      {/* Background stacked cards */}
      <div className={`absolute -bottom-3 -left-3 w-full h-full rounded-xl border border-black-five ${color} z-0`} />
      <div className={`absolute top-1.5 -left-1.5 w-full h-full rounded-xl border border-black-five ${color} z-10`} />

      {/* Main card */}
      <div className="relative z-20 rounded-xl border border-black-five bg-white px-6 py-4 w-full">
        {/* Red top bar */}
        <div className={`w-full h-6 ${color} rounded-md border border-black-five mb-2`} />

        {/* Title */}
        <div className="text-center text-xl font-agbalumo font-bold text-black-five">
          {title}
        </div>

        {/* Description */}
        <div className="text-black-five mt-2 text-sm text-justify font-comfortaa">{text}</div>
      </div>
    </div>
  </div>
);

export default StackedCards;
