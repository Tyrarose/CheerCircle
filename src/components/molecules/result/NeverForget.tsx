import { FC } from "react";

interface NeverForgetProps {
  color?: string;
  label: string;
}

const NeverForget: FC<NeverForgetProps> = ({ color, label }) => (
  <div className="items-center justify-center m-4 bg-white border-2 border-black-five shadow-[0px_0px_0px_8px_#FF619B,0px_0px_0px_10px_black] rounded-full px-8 py-6" style={{ borderRadius: '50%', minWidth: 'max-content', minHeight: 'min-content' }}>
    <div className="text-center text-2xl font-bold">
      #NeverForget
    </div>
    <div className="flex justify-center items-center gap-2 font-fredoka">
      <div>{label}</div>
    </div>
  </div>
);

export default NeverForget;