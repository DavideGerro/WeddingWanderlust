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

const hotels = [
  {
    name: "Hotel Avenida Palace",
    stars: 5,
    address: "Rua 1º de Dezembro 123, 1200-359 Lisboa",
    amenities: ["Free WiFi", "Breakfast included", "Air conditioning"],
    distance: "25 min drive to venue"
  },
  {
    name: "Lisbon Marriott Hotel",
    stars: 4,
    address: "Avenida dos Combatentes 45, 1600-042 Lisboa",
    amenities: ["Swimming pool", "Restaurant", "Fitness center"],
    distance: "20 min drive to venue"
  },
  {
    name: "Olissippo Lapa Palace",
    stars: 5,
    address: "Rua do Pau da Bandeira 4, 1249-021 Lisboa",
    amenities: ["Luxury spa", "Garden view", "24h room service"],
    distance: "15 min drive to venue"
  }
];

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
                  <p className="text-gray-600">{t.preWedding.mustVisitPlaces}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Info className="text-gold mr-3 mt-1 h-5 w-5" />
                <div>
                  <h4 className="font-medium">{t.preWedding.usefulTips}</h4>
                  <p className="text-gray-600">{t.preWedding.usefulTipsDesc}</p>
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
            <h3 className="font-display text-2xl mb-6">{t.preWedding.accommodation}</h3>
            <p className="text-gray-600 mb-6">
              {t.preWedding.accommodationDesc}
            </p>
            
            <div className="space-y-4 mb-8">
              {hotels.map((hotel, index) => (
                <Card key={index} className="p-4 hover:shadow-md transition-shadow duration-200">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">{hotel.name}</h4>
                      <p className="text-sm text-gray-500">{hotel.address}</p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {hotel.amenities.map((amenity, i) => (
                          <span key={i} className="text-xs bg-gray-100 px-2 py-1 rounded">
                            {amenity}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-gold">
                        {"★".repeat(hotel.stars)}
                      </div>
                      <p className="text-xs text-gray-500 mt-1">{hotel.distance}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
            
            <h3 className="font-display text-2xl mb-4 mt-12">{t.preWedding.gettingAround}</h3>
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