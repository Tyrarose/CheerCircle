import { FC } from "react";

interface TextProps {
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}

const Text: FC<TextProps> = ({ className, style, children }) => (
  <p className={`text-sm ${className}`} style={style}>
    {children}
  </p>
);

export default Text;
