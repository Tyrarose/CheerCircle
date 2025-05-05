import { FC } from 'react';
import FunFact from "@/components/molecules/result/FunFact";

interface ProfilePictureFrameProps {
  picture?: string;
  color?: string;
  fact?: string;
}

type SparkleProps = {
  className?: string;
  color?: string;
};

const Sparkle = ({ className, color = "#FACC15" }: SparkleProps) => (
  <svg
    viewBox="0 0 24 24"
    fill={color}
    stroke="black"
    strokeWidth="0.5"
    className={className}
  >
    <path
      d="M12 2c.3 2 .9 3.2 2 4.2s2.2 1.7 4 2c-1.8.3-3.1 1-4 2s-1.7 2.2-2 4c-.3-1.8-1-3.1-2-4s-2.2-1.7-4-2c1.8-.3 3.1-1 4-2s1.7-2.2 2-4z"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ProfilePictureFrame: FC<ProfilePictureFrameProps> = ({ picture, color, fact }) => {
  return (
    <div className="flex items-center justify-center my-8 ">
      <section className="relative">
        {/* Yellow sparkle top left */}
        <div className="absolute -left-6 -top-8 z-10">
          <Sparkle className="w-20 h-20" color="#FACC15" />
        </div>

        {/* Green sparkle top left */}
        <div className="absolute -left-12 top-4 z-10">
          <Sparkle className="w-14 h-14" color="#4ADE80" />
        </div>

        {/* Container for the picture frame background and image */}
        <div className="relative w-72 h-72">
          {/* Background circle with the dynamic color */}
          <div className={`absolute w-full h-full rounded-full ${color} border-2 border-black-five`}></div>

          {/* Profile image circle, offset to create crescent */}
          <div className="absolute w-72 h-72 rounded-full border-2 border-black-five overflow-hidden bg-white" style={{ left: '-24px', top: '2px' }}>
            <img
              src={`${picture} `}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
        </div>


        {/* Pink sparkle bottom right */}
        <div className="absolute -right-4 bottom-4 z-10">
            <Sparkle className="w-14 h-14" color="#FB7185" />
        </div>

        {/* FunFact positioned at the bottom and aligned left */}
        {fact && (
          <div className="absolute bottom-0 right-14 w-full text-left">
            <FunFact text={fact} />
          </div>
        )}
      </section>
    </div>
  );
};

export default ProfilePictureFrame;