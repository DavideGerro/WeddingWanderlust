import { useRef, useState } from "react";
import { useInView } from "framer-motion";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { BANKING_INFO } from "@/lib/constants";
import { useLanguage } from "@/lib/useLanguage";

// Icons
import { FaPlaneDeparture, FaUtensils, FaMountain, FaUmbrellaBeach, FaHotel, FaCamera, FaGift, FaCopy, FaCheck } from "react-icons/fa";
import { TbBuildingBank } from "react-icons/tb";

const honeymoonExperiences = [
  { id: "tokyo-hotel", titleKey: "tokyoHotel", descKey: "tokyoHotelDesc", icon: "FaHotel", amount: 150 },
  { id: "kyoto-tour", titleKey: "kyotoTour", descKey: "kyotoTourDesc", icon: "FaMountain", amount: 75 },
  { id: "sushi-class", titleKey: "sushiClass", descKey: "sushiClassDesc", icon: "FaUtensils", amount: 45 },
  { id: "mt-fuji", titleKey: "mtFuji", descKey: "mtFujiDesc", icon: "FaCamera", amount: 100 },
  { id: "okinawa-beach", titleKey: "okinawaBeach", descKey: "okinawaBeachDesc", icon: "FaUmbrellaBeach", amount: 35 },
  { id: "bullet-train", titleKey: "bulletTrain", descKey: "bulletTrainDesc", icon: "FaPlaneDeparture", amount: 85 }
];

const HoneymoonSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useLanguage();
  
  const [copiedIban, setCopiedIban] = useState(false);
  
  const copyIban = () => {
    navigator.clipboard.writeText(BANKING_INFO.iban);
    setCopiedIban(true);
    setTimeout(() => setCopiedIban(false), 2000);
  };
  
  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case "FaHotel": return <FaHotel className="text-gold h-6 w-6" />;
      case "FaMountain": return <FaMountain className="text-gold h-6 w-6" />;
      case "FaUtensils": return <FaUtensils className="text-gold h-6 w-6" />;
      case "FaCamera": return <FaCamera className="text-gold h-6 w-6" />;
      case "FaUmbrellaBeach": return <FaUmbrellaBeach className="text-gold h-6 w-6" />;
      case "FaPlaneDeparture": return <FaPlaneDeparture className="text-gold h-6 w-6" />;
      default: return <FaGift className="text-gold h-6 w-6" />;
    }
  };
  
  return (
    <section id="honeymoon" ref={ref} className="py-16 bg-gray-50">
      <div className="container px-4 mx-auto">
        <div className="flex items-center justify-center mb-6">
          <FaGift className="text-red-500 h-8 w-8 mr-3" />
          <h2 className="text-4xl font-display font-bold text-center">
            {t.honeymoon.title}
          </h2>
        </div>
        
        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
          {t.honeymoon.description}
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <img 
              src="https://images.unsplash.com/photo-1528360983277-13d401cdc186?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80" 
              alt="Tokyo skyline with Mount Fuji in the background" 
              className="w-full h-64 object-cover rounded-lg shadow-lg mb-6"
            />
            
            <h3 className="font-display text-2xl mb-4">{t.honeymoon.itinerary}</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <Card className="p-5 bg-white shadow-sm hover:shadow-md transition-shadow">
                <h4 className="font-medium mb-1">{t.honeymoon.tokyo}</h4>
                <p className="text-sm text-gray-600 mb-2">{t.honeymoon.tokyoNights}</p>
                <p className="text-xs text-gray-500">{t.honeymoon.tokyoDesc}</p>
              </Card>
              
              <Card className="p-5 bg-white shadow-sm hover:shadow-md transition-shadow">
                <h4 className="font-medium mb-1">{t.honeymoon.kyoto}</h4>
                <p className="text-sm text-gray-600 mb-2">{t.honeymoon.kyotoNights}</p>
                <p className="text-xs text-gray-500">{t.honeymoon.kyotoDesc}</p>
              </Card>
              
              <Card className="p-5 bg-white shadow-sm hover:shadow-md transition-shadow">
                <h4 className="font-medium mb-1">{t.honeymoon.osaka}</h4>
                <p className="text-sm text-gray-600 mb-2">{t.honeymoon.osakaNights}</p>
                <p className="text-xs text-gray-500">{t.honeymoon.osakaDesc}</p>
              </Card>
              
              <Card className="p-5 bg-white shadow-sm hover:shadow-md transition-shadow">
                <h4 className="font-medium mb-1">{t.honeymoon.okinawa}</h4>
                <p className="text-sm text-gray-600 mb-2">{t.honeymoon.okinawaNights}</p>
                <p className="text-xs text-gray-500">{t.honeymoon.okinawaDesc}</p>
              </Card>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="font-display text-2xl mb-4">{t.honeymoon.fund}</h3>
            <p className="text-gray-600 mb-6">
              {t.honeymoon.fundDesc}
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {honeymoonExperiences.map((gift) => (
                <div 
                  key={gift.id}
                  className="rounded-lg border border-gray-200 p-4 bg-white hover:shadow-sm transition-shadow"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-medium">{t.honeymoon[gift.titleKey as keyof typeof t.honeymoon]}</h4>
                      <p className="text-sm text-gray-600">{t.honeymoon[gift.descKey as keyof typeof t.honeymoon]}</p>
                    </div>
                    {getIconComponent(gift.icon)}
                  </div>
                  <p className="text-gold font-semibold">€{gift.amount}</p>
                </div>
              ))}
              
              <div className="rounded-lg border border-gray-200 p-4 bg-white hover:shadow-sm transition-shadow">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-medium">{t.honeymoon.customAmount}</h4>
                    <p className="text-sm text-gray-600">{t.honeymoon.customAmountDesc}</p>
                  </div>
                  <FaGift className="text-gold h-6 w-6" />
                </div>
                <p className="text-gold font-semibold">€25+</p>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-4">
                <TbBuildingBank className="h-6 w-6 text-gold" />
                <h3 className="font-display text-xl">{t.honeymoon.howToContribute}</h3>
              </div>
              
              <p className="text-gray-600 mb-6">
                {t.honeymoon.bankTransferInfo}
              </p>
              
              <div className="p-4 bg-blue-50 rounded-lg text-sm border border-blue-100">
                <p className="font-semibold mb-3 text-blue-900">{t.honeymoon.bankDetails}</p>
                <div className="space-y-2 text-gray-700">
                  <p><span className="text-gray-500">Account Name:</span> {BANKING_INFO.name}</p>
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <p><span className="text-gray-500">IBAN:</span> <span className="font-mono text-xs sm:text-sm">{BANKING_INFO.iban}</span></p>
                    <button 
                      type="button" 
                      onClick={copyIban}
                      className="text-blue-600 hover:text-blue-800 flex items-center gap-1 text-xs bg-white px-2 py-1 rounded border"
                      data-testid="button-copy-iban"
                    >
                      {copiedIban ? <FaCheck className="h-3 w-3" /> : <FaCopy className="h-3 w-3" />}
                      {copiedIban ? "Copied!" : "Copy IBAN"}
                    </button>
                  </div>
                  <p><span className="text-gray-500">Bank:</span> {BANKING_INFO.bank}</p>
                  <p><span className="text-gray-500">Reference:</span> <span className="font-medium">{BANKING_INFO.reference}</span></p>
                </div>
                <p className="text-xs text-blue-700 mt-3 italic">
                  {t.honeymoon.referenceNote}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HoneymoonSection;