interface ProgressBarProps {
    totalSteps: number;
    currentStep: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ totalSteps, currentStep }) => {
    return (
        <div className="flex gap-1">
            {[...Array(totalSteps)].map((_, index) => (
                <div
                    key={index}
                    className={`h-1 w-full rounded-full ${
                        index < currentStep ? 'bg-yellow-five' : 'bg-gray-seven'
                    }`}
                />
            ))}
        </div>
    );
};

export default ProgressBar;