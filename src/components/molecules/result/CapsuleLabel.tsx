import { FC } from "react";
import Capsule from "../../atoms/Capsule";
import Label from "../../atoms/Label";

interface CapsuleLabelProps {
  color?: string;
  word: string;
  upper?: string;
  lower?: string;
}

const CapsuleLabel: FC<CapsuleLabelProps> = ({ color, word, upper, lower }) => (
  <div className="flex flex-col m-6">
    <Label font="mr-6 font-fredoka" text={upper} />
    <Capsule color={color} label={word} />
    <Label font="font-fredoka italic text-black-eight text-sm" text={lower} />
  </div>
);

export default CapsuleLabel;
