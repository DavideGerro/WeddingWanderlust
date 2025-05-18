import React from "react";

interface HoneymoonGiftCardProps {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  amount: number;
  isSelected: boolean;
  onSelect: () => void;
}

const HoneymoonGiftCard = ({
  id,
  title,
  description,
  icon,
  amount,
  isSelected,
  onSelect,
}: HoneymoonGiftCardProps) => {
  return (
    <div
      className={`
        rounded-lg border p-4 cursor-pointer transition-all duration-200
        ${isSelected ? 'border-gold bg-gold/5 shadow-sm' : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'}
      `}
      onClick={onSelect}
    >
      <div className="flex justify-between items-start mb-2">
        <div>
          <h4 className="font-medium">{title}</h4>
          <p className="text-sm text-gray-600">{description}</p>
        </div>
        {icon}
      </div>
      <div className="mt-3 text-right">
        <p className="font-medium text-lg">€{amount}</p>
      </div>
    </div>
  );
};

export default HoneymoonGiftCard;