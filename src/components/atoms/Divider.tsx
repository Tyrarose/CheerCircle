import React from 'react';

interface DividerProps {
    text?: string;
}

const Divider: React.FC<DividerProps> = ({ text }) => {
    const dividerText = text || "Bonus Question (Skip if you want)";

    return (
        <div className={`flex items-center my-6`}>
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="px-4 text-sm text-gray-500">{dividerText}</span>
            <div className="flex-grow border-t border-gray-300"></div>
        </div>
    );
};

export default Divider;
