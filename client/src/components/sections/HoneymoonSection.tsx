import { useRef, useEffect } from "react";
import { useInView } from "framer-motion";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/useLanguage";

// Icons
import { FaGift } from "react-icons/fa";
import { TbBuildingBank } from "react-icons/tb";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "stripe-buy-button": any;
    }
  }
}

const HoneymoonSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useLanguage();
  
  useEffect(() => {
    // Load Stripe buy button script
    const script = document.createElement("script");
    script.src = "https://js.stripe.com/v3/buy-button.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);
  
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
              {t.honeymoon.contributeInstructions}
            </p>
            
            <div className="flex justify-center">
              <stripe-buy-button
                buy-button-id="buy_btn_1SaG7QH5mllg6YT2FHFDJTgD"
                publishable-key="pk_live_51JU9DkH5mllg6YT2vYTtdZaQLqxwbW4miwQuXjq2exsEopznOQwT1HcnX7JHBSDfpXF8zJxl1oVw0PtgilzKhDFs00drBmiUPd"
              ></stripe-buy-button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HoneymoonSection;