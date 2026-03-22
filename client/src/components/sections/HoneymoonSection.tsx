import { useRef, useState } from "react";
import { useInView, AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/useLanguage";

// Icons
import { FaGift } from "react-icons/fa";
import { TbBuildingBank } from "react-icons/tb";
import { FiCopy, FiCheck } from "react-icons/fi";

const HoneymoonSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useLanguage();
  const [showArigato, setShowArigato] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopyIban = () => {
    navigator.clipboard.writeText("PT50 3560 0001 9109 9730 2304 1");
    setCopied(true);
    setShowArigato(true);
    setTimeout(() => setShowArigato(false), 3000);
    setTimeout(() => setCopied(false), 2000);
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
          <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-4">
              <TbBuildingBank className="h-6 w-6 text-gold" />
              <h3 className="font-display text-xl">{t.honeymoon.howToContribute}</h3>
            </div>

            <p className="text-gray-600 mb-6">
              {t.honeymoon.bankTransferInstructions}
            </p>

            <div className="bg-blue-50 p-6 rounded-lg border border-blue-200 mb-6">
              <h4 className="font-semibold text-gray-800 mb-4">{t.honeymoon.bankDetails}</h4>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600 font-medium">{t.honeymoon.accountHolder}</p>
                  <p className="text-lg text-gray-800 font-semibold">Sara Abadour & Devid Geris</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 font-medium">IBAN</p>
                  <div className="flex items-center gap-3 mt-1">
                    <p className="text-lg font-mono font-semibold text-gray-800">PT50 3560 0001 9109 9730 2304 1</p>
                    <div className="relative">
                      <button
                        onClick={handleCopyIban}
                        className="p-2 hover:bg-gold/10 rounded transition-colors"
                        title={t.honeymoon.copyIban || "Copy IBAN"}
                        data-testid="button-copy-iban"
                      >
                        {copied
                          ? <FiCheck className="h-5 w-5 text-green-600" />
                          : <FiCopy className="h-5 w-5 text-gold" />
                        }
                      </button>

                      <AnimatePresence>
                        {showArigato && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.5, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.5, y: 10 }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            className="absolute bottom-full right-0 mb-3 z-50"
                          >
                            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-4 flex flex-col items-center w-44">
                              <img
                                src="/arigato.png"
                                alt="Arigato!"
                                className="w-28 h-28 object-contain"
                              />
                              <p className="text-gray-700 text-sm font-medium mt-2 text-center">Copied! Arigatō! 🌸</p>
                            </div>
                            <div className="absolute bottom-[-8px] right-4 w-4 h-4 bg-white border-r border-b border-gray-100 rotate-45 shadow-sm" />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-gray-600 text-sm text-center">
              {t.honeymoon.ibanNote}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HoneymoonSection;
