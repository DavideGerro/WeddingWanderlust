import { useRef } from "react";
import { useInView } from "framer-motion";
import { motion } from "framer-motion";
import { MapPin, Clock, Shirt, Info, Smartphone, Sun } from "lucide-react";
import TimelineItem from "@/components/ui/TimelineItem";
import { Button } from "@/components/ui/button";
import { VENUE_ADDRESS } from "@/lib/constants";
import { useLanguage } from "@/lib/useLanguage";

const WeddingDaySection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useLanguage();

  const openGoogleMaps = () => {
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(VENUE_ADDRESS)}`, '_blank');
  };

  const timeline = [
    {
      time: "4:00 PM",
      title: "Guest Arrival",
      description: "Welcome drinks and mingling in the garden"
    },
    {
      time: "5:00 PM",
      title: "Ceremony",
      description: "Vow exchange with a breathtaking view of the Tagus River"
    },
    {
      time: "5:45 PM",
      title: "Cocktail Hour",
      description: "Champagne, signature cocktails, and passed hors d'oeuvres"
    },
    {
      time: "7:00 PM",
      title: "Dinner Reception",
      description: "Seated dinner featuring Portuguese and Italian cuisine"
    },
    {
      time: "9:00 PM",
      title: "Cake Cutting & First Dance",
      description: "A sweet moment followed by our first dance as a married couple"
    },
    {
      time: "9:30 PM",
      title: "Party Time",
      description: "Dancing the night away with DJ and live band performances"
    },
    {
      time: "12:00 AM",
      title: "Late Night Snacks",
      description: "Surprise treats to keep the energy going"
    },
    {
      time: "2:00 AM",
      title: "Farewell",
      description: "End of the celebration (transportation available)"
    }
  ];
  
  return (
    <section id="wedding-day" ref={ref} className="py-16 bg-gray-50">
      <div className="container px-4 mx-auto">
        <h2 className="text-4xl font-display font-bold text-center mb-12">
          {t.weddingDay.title}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="rounded-lg overflow-hidden shadow-lg mb-6">
              <img 
                src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80" 
                alt="Wedding venue - Quinta Pezinhos no Tejo" 
                className="w-full h-80 object-cover"
              />
            </div>
            <p className="text-gray-600 leading-relaxed mb-8">
              {t.weddingDay.venueDescription}
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              <div className="rounded-lg bg-white p-5 shadow-sm">
                <div className="flex items-center mb-3">
                  <MapPin className="text-gold mr-2 h-5 w-5" />
                  <h3 className="font-medium text-lg">{t.weddingDay.location}</h3>
                </div>
                <p className="text-gray-600 text-sm mb-4">
                  Quinta Pezinhos no Tejo<br />
                  R. do Joinal 2825<br />
                  Caparica, Portugal
                </p>
                <Button 
                  onClick={openGoogleMaps}
                  className="w-full bg-gold hover:bg-gold-dark text-white"
                  data-testid="button-google-maps"
                  aria-label="Open venue location in Google Maps"
                >
                  {t.weddingDay.viewInGoogleMaps}
                </Button>
              </div>
              
              <div className="space-y-6">
                <div className="rounded-lg bg-white p-5 shadow-sm">
                  <div className="flex items-center mb-3">
                    <Smartphone className="text-gold mr-2 h-5 w-5" />
                    <h3 className="font-medium text-lg">{t.weddingDay.gettingThere}</h3>
                  </div>
                  <p className="text-gray-600 text-sm">
                    {t.weddingDay.gettingThereDetails}
                  </p>
                </div>
                
                <div className="rounded-lg bg-white p-5 shadow-sm">
                  <div className="flex items-center mb-3">
                    <Sun className="text-gold mr-2 h-5 w-5" />
                    <h3 className="font-medium text-lg">{t.weddingDay.weather}</h3>
                  </div>
                  <p className="text-gray-600 text-sm">
                    {t.weddingDay.weatherDetails}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
          
          <div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mb-12"
            >
              <h3 className="font-display text-2xl mb-6">{t.weddingDay.timeline}</h3>
              <div className="relative">
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gold/30"></div>
                <div className="space-y-6">
                  {timeline.map((item, index) => (
                    <TimelineItem
                      key={index}
                      time={item.time}
                      title={item.title}
                      description={item.description}
                      isEven={index % 2 === 0}
                      delay={index * 0.1}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h3 className="font-display text-2xl mb-6">{t.weddingDay.whatToWear}</h3>
              <div className="space-y-6">
                <div className="flex items-start">
                  <Shirt className="text-gold mr-3 mt-1 h-5 w-5" />
                  <div>
                    <h4 className="font-medium">{t.weddingDay.dressCode}</h4>
                    <p className="text-gray-600">
                      {t.weddingDay.dressCodeDetails}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Info className="text-gold mr-3 mt-1 h-5 w-5" />
                  <div>
                    <h4 className="font-medium">{t.weddingDay.specialNotes}</h4>
                    <p className="text-gray-600">
                      {t.weddingDay.specialNotesDetails}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WeddingDaySection;