import { useRef, useState } from "react";
import { useInView } from "framer-motion";
import { motion } from "framer-motion";
import { BANKING_INFO } from "@/lib/constants";
import { useLanguage } from "@/lib/useLanguage";

// Icons
import { FaGift, FaCopy, FaCheck } from "react-icons/fa";
import { TbBuildingBank } from "react-icons/tb";

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
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-2xl mx-auto"
        >
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
    </section>
  );
};

export default HoneymoonSection;