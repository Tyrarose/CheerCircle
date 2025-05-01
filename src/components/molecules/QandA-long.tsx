import React from "react";

interface QandAProps {
  labelText: React.ReactNode;
  inputId: string;
  inputPlaceholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const QandAlong: React.FC<QandAProps> = ({ labelText, inputId, inputPlaceholder, value, onChange }) => {
  return (
    <div className="flex items-center justify-center w-full">
      <form className="w-full">
        <div>
          <label htmlFor={inputId} className="block text-sm font-semibold text-black-five mb-1">
            {labelText}
          </label>
          <div className="relative">
            <textarea
              id={inputId}
              placeholder={inputPlaceholder}
              value={value}
              onChange={onChange}
              className="w-full min-h-[120px] pl-4 pr-4 py-4 border border-black-five rounded-[12px] focus:outline-none focus:ring-1 focus:ring-black-five focus:border-black-five bg-transparent resize-none"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default QandAlong;
