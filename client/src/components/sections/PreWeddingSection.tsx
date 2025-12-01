import { useRef } from "react";
import { useInView } from "framer-motion";
import { motion } from "framer-motion";
import { MapPin, HandPlatter, Info, Hotel, Utensils, Umbrella, Bus, Car } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useLanguage } from "@/lib/useLanguage";

// Helper function to render markdown bold syntax (**text**) as bold JSX elements
const renderBoldText = (text: string) => {
  const parts = text.split(/(\*\*[^*]+\*\*)/);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    return <span key={i}>{part}</span>;
  });
};


const PreWeddingSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useLanguage();

  return (
    <section id="pre-wedding" ref={ref} className="py-16 bg-white">
      <div className="container px-4 mx-auto">
        <h2 className="text-4xl font-display font-bold text-center mb-16">
          {t.preWedding.title}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <img 
              src="/images/lisbon-bridge.jpg" 
              alt="Lisbon 25 de Abril Bridge with Cristo Rei statue" 
              className="w-full h-80 object-cover rounded-lg shadow-lg mb-6"
              loading="lazy"
              data-testid="img-lisbon-bridge"
            />
            <h3 className="font-display text-2xl mb-4">{t.preWedding.discoveringLisbon}</h3>
            <p className="text-gray-600 leading-relaxed mb-5">
              {t.preWedding.lisbonDescription}
            </p>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-start">
                <MapPin className="text-gold mr-3 mt-1 h-5 w-5" />
                <div>
                  <h4 className="font-medium">{t.preWedding.mustVisit}</h4>
                  <p className="text-gray-600 whitespace-pre-line">{renderBoldText(t.preWedding.mustVisitPlaces)}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Info className="text-gold mr-3 mt-1 h-5 w-5" />
                <div className="w-full">
                  <h4 className="font-medium">{t.preWedding.usefulTips}</h4>
                  <p className="text-gray-600 whitespace-pre-line mb-3">{renderBoldText(t.preWedding.usefulTipsDesc.split('A few basic Portuguese words')[0])}</p>
                  <div className="portuguese-flag-box">
                    <p className="text-gray-700 whitespace-pre-line">{renderBoldText('A few basic Portuguese words go a long way:\n\n' + t.preWedding.usefulTipsDesc.split('A few basic Portuguese words go a long way:\n\n')[1])}</p>
                  </div>
                </div>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-8 p-6 bg-yellow-50 border-2 border-yellow-300 rounded-lg shadow-md transform -rotate-1"
            >
              <h4 className="font-display text-lg mb-4 text-amber-900">{t.preWedding.favoriteFood} 👨‍🍳</h4>
              
              <div className="space-y-3 text-sm">
                <div>
                  <p className="font-medium text-amber-900 mb-2">{t.preWedding.breakfast}</p>
                  {t.preWedding.honestGreens && (
                    <p className="text-gray-700 mb-1">
                      <a href={`https://www.google.com/maps/search/${encodeURIComponent(t.preWedding.honestGreens.split(' — ')[0])}`} target="_blank" rel="noopener noreferrer" className="font-bold text-blue-600 hover:text-blue-800 hover:underline">{t.preWedding.honestGreens.split(' — ')[0]}</a> — {t.preWedding.honestGreens.split(' — ')[1]}
                    </p>
                  )}
                  {t.preWedding.monkaCafe && (
                    <p className="text-gray-700 mb-1">
                      <a href={`https://www.google.com/maps/search/${encodeURIComponent(t.preWedding.monkaCafe.split(' — ')[0])}`} target="_blank" rel="noopener noreferrer" className="font-bold text-blue-600 hover:text-blue-800 hover:underline">{t.preWedding.monkaCafe.split(' — ')[0]}</a> — {t.preWedding.monkaCafe.split(' — ')[1]}
                    </p>
                  )}
                  {t.preWedding.bikeBakery && (
                    <p className="text-gray-700">
                      <a href={`https://www.google.com/maps/search/${encodeURIComponent(t.preWedding.bikeBakery.split(' — ')[0])}`} target="_blank" rel="noopener noreferrer" className="font-bold text-blue-600 hover:text-blue-800 hover:underline">{t.preWedding.bikeBakery.split(' — ')[0]}</a> — {t.preWedding.bikeBakery.split(' — ')[1]}
                    </p>
                  )}
                </div>

                <div>
                  <p className="font-medium text-amber-900 mb-2">{t.preWedding.lunchDinner}</p>
                  {t.preWedding.mercado && (
                    <p className="text-gray-700 mb-1">
                      <a href={`https://www.google.com/maps/search/${encodeURIComponent(t.preWedding.mercado.split(' — ')[0])}`} target="_blank" rel="noopener noreferrer" className="font-bold text-blue-600 hover:text-blue-800 hover:underline">{t.preWedding.mercado.split(' — ')[0]}</a> — {t.preWedding.mercado.split(' — ')[1]}
                    </p>
                  )}
                  {t.preWedding.ruiDosPregos && (
                    <p className="text-gray-700 mb-1">
                      <a href={`https://www.google.com/maps/search/${encodeURIComponent(t.preWedding.ruiDosPregos.split(' — ')[0])}`} target="_blank" rel="noopener noreferrer" className="font-bold text-blue-600 hover:text-blue-800 hover:underline">{t.preWedding.ruiDosPregos.split(' — ')[0]}</a> — {t.preWedding.ruiDosPregos.split(' — ')[1]}
                    </p>
                  )}
                  {t.preWedding.laCamionetta && (
                    <p className="text-gray-700">
                      <a href={`https://www.google.com/maps/search/${encodeURIComponent(t.preWedding.laCamionetta.split(' — ')[0])}`} target="_blank" rel="noopener noreferrer" className="font-bold text-blue-600 hover:text-blue-800 hover:underline">{t.preWedding.laCamionetta.split(' — ')[0]}</a> — {t.preWedding.laCamionetta.split(' — ')[1]}
                    </p>
                  )}
                </div>

                <div>
                  <p className="font-medium text-amber-900 mb-2">{t.preWedding.pasteisDeNata}</p>
                  {t.preWedding.manteigaria && (
                    <p className="text-gray-700 mb-1">
                      <a href={`https://www.google.com/maps/search/${encodeURIComponent(t.preWedding.manteigaria)}`} target="_blank" rel="noopener noreferrer" className="font-bold text-blue-600 hover:text-blue-800 hover:underline">{t.preWedding.manteigaria}</a>
                    </p>
                  )}
                  {t.preWedding.castro && (
                    <p className="text-gray-700">
                      <a href={`https://www.google.com/maps/search/${encodeURIComponent(t.preWedding.castro)}`} target="_blank" rel="noopener noreferrer" className="font-bold text-blue-600 hover:text-blue-800 hover:underline">{t.preWedding.castro}</a>
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="font-display text-2xl mb-6">{t.preWedding.gettingAround}</h3>
            
            {/* Yellow Lisbon Tram */}
            <svg className="w-full h-auto mb-8" viewBox="0 0 300 120" xmlns="http://www.w3.org/2000/svg">
              {/* Tram body */}
              <rect x="40" y="40" width="220" height="50" fill="#FFD700" stroke="#333" strokeWidth="2" rx="8" />
              
              {/* Tram top */}
              <rect x="50" y="25" width="200" height="20" fill="#FFD700" stroke="#333" strokeWidth="2" rx="5" />
              
              {/* Windows */}
              <rect x="60" y="30" width="30" height="15" fill="#87CEEB" stroke="#333" strokeWidth="1" />
              <rect x="100" y="30" width="30" height="15" fill="#87CEEB" stroke="#333" strokeWidth="1" />
              <rect x="140" y="30" width="30" height="15" fill="#87CEEB" stroke="#333" strokeWidth="1" />
              <rect x="180" y="30" width="30" height="15" fill="#87CEEB" stroke="#333" strokeWidth="1" />
              
              {/* Doors */}
              <rect x="55" y="45" width="18" height="38" fill="#8B4513" stroke="#333" strokeWidth="1.5" />
              <rect x="227" y="45" width="18" height="38" fill="#8B4513" stroke="#333" strokeWidth="1.5" />
              
              {/* Wheels */}
              <circle cx="70" cy="95" r="10" fill="#333" />
              <circle cx="230" cy="95" r="10" fill="#333" />
              <circle cx="90" cy="95" r="8" fill="#666" />
              <circle cx="210" cy="95" r="8" fill="#666" />
              
              {/* Pantograph connection */}
              <line x1="80" y1="20" x2="120" y2="0" stroke="#333" strokeWidth="2" />
              <line x1="120" y1="0" x2="220" y2="0" stroke="#333" strokeWidth="2" />
            </svg>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <Car className="text-gold mr-3 mt-1 h-5 w-5" />
                <div>
                  <h4 className="font-medium">{t.preWedding.taxis}</h4>
                  <p className="text-gray-600">{t.preWedding.taxisDesc}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Bus className="text-gold mr-3 mt-1 h-5 w-5" />
                <div>
                  <h4 className="font-medium">{t.preWedding.publicTransport}</h4>
                  <p className="text-gray-600">{t.preWedding.publicTransportDesc}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Umbrella className="text-gold mr-3 mt-1 h-5 w-5" />
                <div>
                  <h4 className="font-medium">{t.preWedding.walking}</h4>
                  <p className="text-gray-600">{t.preWedding.walkingDesc}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PreWeddingSection;