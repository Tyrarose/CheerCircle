import { FC } from "react";

interface IconAndTextProps {
  icon?: string;
  label: string;
  color?: string;
  leftAlign?: boolean;
}

// When `left` is true, we align text left; otherwise, center.
const IconAndText: FC<IconAndTextProps> = ({ icon, label, color, leftAlign = false }) => (
  <div className="flex items-center gap-2">
    <div
      className={`rounded-full w-8 h-8 flex items-center justify-center border-2 border-black-five ${color}`}
    >
      <i className={`${icon} text-black text-ms`}></i>
    </div>
    <span
      className={`mx-4 text-sm font-comfortaa ${leftAlign ? "text-left" : "text-center"}`}
    >
      {label}
    </span>
  </div>
);

export default IconAndText;
