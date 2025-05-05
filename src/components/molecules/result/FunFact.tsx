import { FC } from "react";
import Label from "@/components/atoms/Label";

interface FunFactProps {
  text: string;
}

const FunFact: FC<FunFactProps> = ({ text }) => (
  <div className="flex flex-col gap-1">
    <div className="text-center text-2xl font-archivo bg-orange-five w-fit p-2 rounded-xl">
        Fun Fact!
    </div>
    <div className="flex justify-center items-center gap-2 bg-yellow-seven left-4 rounded-xl">
        <Label font="text-xl font-fredoka" text={text} />
    </div>
  </div>
);

export default FunFact;
