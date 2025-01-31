import { FC } from "react";

interface TextInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  className?: string;
  style?: React.CSSProperties;
}

const TextInput: FC<TextInputProps> = ({
  value,
  onChange,
  placeholder,
  className,
  style,
}) => {
  return (
    <textarea
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`w-full h-full min-h-[160px] p-5 border border-black-five text-black-five placeholder-black-five rounded-[30px] focus:outline-none focus:ring-1 focus:ring-black-five resize-none ${className}`}
      style={style}
    />
  );
};

export default TextInput;