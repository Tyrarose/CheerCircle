import { FC } from "react";

interface MostComfortingProps {
  text: string;
  color: string
}

const MostComforting: FC<MostComfortingProps> = ({ text, color }) => (
  <div className="relative w-full px-4 py-1">
    <div className="relative w-full">
      {/* Background shadow card */}
      <div className="absolute -bottom-1.5 right-1.5 w-full h-full rounded-lg border border-black-five bg-white z-0" />

      {/* Main green window */}
      <div className={`relative z-10 rounded-lg border border-black-five ${color} w-full pt-3 px-4 pb-4`}>
        
        {/* Top bar with colored dots */}
        <div className="flex gap-2 px-1 mb-2">
          <div className="w-3 h-3 rounded-full bg-yellow-five border border-black-five" />
          <div className="w-3 h-3 rounded-full bg-red-five border border-black-five" />
          <div className="w-3 h-3 rounded-full bg-white border border-black-five" />
        </div>

        {/* Inner white box */}
        <div className="rounded-lg bg-white border border-black-five px-6 py-4">
          {/* Title */}
          <div className="text-center text-2xl font-agbalumo font-extrabold text-black-five mb-4 leading-tight">
            The Heart Remembers
          </div>

          {/* Description */}
          <div className="text-black-five text-sm text-justify leading-relaxed font-comfortaa">
            {text}
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default MostComforting;
