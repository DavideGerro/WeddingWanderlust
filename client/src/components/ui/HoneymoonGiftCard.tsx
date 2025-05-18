import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";

interface HoneymoonGiftCardProps {
  id: string;
  title: string;
  description: string;
  icon: string;
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
  const getIcon = () => {
    switch (icon) {
      case "hotel-bed":
        return (
          <svg className="w-6 h-6 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
        );
      case "restaurant":
        return (
          <svg className="w-6 h-6 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        );
      case "train":
        return (
          <svg className="w-6 h-6 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
        );
      default:
        return (
          <svg className="w-6 h-6 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
          </svg>
        );
    }
  };

  return (
    <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
      <Card 
        className={`bg-white rounded-lg p-4 text-center shadow hover:shadow-md transition-shadow cursor-pointer ${
          isSelected ? "ring-2 ring-gold" : ""
        }`}
        onClick={onSelect}
      >
        <div className="bg-gold-light rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
          {getIcon()}
        </div>
        <h4 className="font-medium">{title}</h4>
        <p className="text-sm text-gray-500 mb-3">{description}</p>
        <span className="font-medium text-gold">€{amount}</span>
      </Card>
    </motion.div>
  );
};

export default HoneymoonGiftCard;
