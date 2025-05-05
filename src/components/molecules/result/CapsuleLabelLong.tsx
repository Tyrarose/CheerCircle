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
    <Label font="font-fredoka" text={upper} />
    <Capsule textFormat="text-sm lowercase" color={color} label={word} />
  </div>
);

export default CapsuleLabel;
