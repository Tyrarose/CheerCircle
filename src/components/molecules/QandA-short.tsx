import React from "react";

interface QandAProps {
  labelText: React.ReactNode;
  inputId: string;
  inputPlaceholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const QandAshort: React.FC<QandAProps> = ({ labelText, inputId, inputPlaceholder = "", value, onChange }) => {
  return (
    <div className="flex items-center justify-center w-full">
      <form className="w-full">
        <div>
          <label htmlFor={inputId} className="block text-sm font-semibold text-black-five mb-1">
            {labelText}
          </label>
          <div className="relative">
            <input
              type="text"
              id={inputId}
              placeholder={inputPlaceholder || ""} // Ensure it defaults to an empty string
              value={value}
              onChange={onChange}
              className="w-full pl-4 pr-4 py-2 border border-black-five rounded-[12px] focus:outline-none focus:ring-1 focus:ring-black-five focus:border-black-five bg-transparent"
            />
          </div>
        </div>
      </form>
    </div>
  );
};


export default QandAshort;
