import { FC } from "react";

interface nameProps {
  name: string;
  story?: string;
}

const Sparkle = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="#FACC15"
    stroke="black"
    strokeWidth="0.5"
    className={`w-24 h-24 ${className}`}
  >
    <path
      d="M12 2c.3 2 .9 3.2 2 4.2s2.2 1.7 4 2c-1.8.3-3.1 1-4 2s-1.7 2.2-2 4c-.3-1.8-1-3.1-2-4s-2.2-1.7-4-2c1.8-.3 3.1-1 4-2s1.7-2.2 2-4z"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const name: FC<nameProps> = ({ name, story }) => (
  <div className="flex justify-center">
    <div className="relative inline-block">
      {/* Sparkle top-left */}
      <div className="absolute -left-8 -top-4 rotate-[8deg]">
        <Sparkle />
      </div>

      {/* Sparkle bottom-right */}
      <div className="absolute -right-8 -bottom-12 rotate-[-8deg]">
        <Sparkle />
      </div>

      {/* Capsule */}
      <div className="items-center justify-center bg-pink-six shadow-[0px_8px_0px_0px_rgba(0,0,0,1)] rounded-full px-8 py-6" style={{ borderRadius: '50%', minWidth: 'max-content', minHeight: 'min-content' }}>
        <div className="text-4xl font-agbalumo text-black rotate-[-3deg]">{name}</div>
        {story && (
          <div className="text-black-five text-center text-sm font-fredoka rotate-[-3deg]">
            {story}
          </div>
        )}
      </div>
    </div>
  </div>
);

export default name;
