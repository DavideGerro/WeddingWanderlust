import { useRef } from "react";
import { useInView } from "framer-motion";
import { motion } from "framer-motion";
import { MapPin, Clock, Shirt, Info, Smartphone, Sun, Bus, ExternalLink } from "lucide-react";
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
        <div className="text-center mb-16">
          <h2 className="text-5xl font-display font-bold mb-4">
            {t.weddingDay.title}
          </h2>
          <div className="w-20 h-1 bg-gold/50 mx-auto rounded-full"></div>
        </div>
        
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
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="rounded-xl bg-white p-6 shadow-md hover:shadow-lg hover:border-gold/20 border border-transparent transition-all duration-300 flex flex-col group"
              >
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center mr-3 group-hover:bg-gold/15 transition-colors">
                    <MapPin className="text-gold h-5 w-5" />
                  </div>
                  <h3 className="font-display font-semibold text-lg text-gray-900">{t.weddingDay.location}</h3>
                </div>
                <p className="text-gray-600 text-sm mb-5 flex-grow leading-relaxed">
                  Quinta Pezinhos no Tejo<br />
                  R. do Joinal 2825<br />
                  Caparica, Portugal
                </p>
                <Button 
                  onClick={openGoogleMaps}
                  className="w-full bg-gold hover:bg-gold-dark text-white font-medium transition-all duration-200 gap-2"
                  data-testid="button-google-maps"
                  aria-label="Open venue location in Google Maps"
                >
                  {t.weddingDay.viewInGoogleMaps}
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="rounded-xl bg-white p-6 shadow-md hover:shadow-lg hover:border-gold/20 border border-transparent transition-all duration-300 flex flex-col group"
              >
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center mr-3 group-hover:bg-gold/15 transition-colors">
                    <Smartphone className="text-gold h-5 w-5" />
                  </div>
                  <h3 className="font-display font-semibold text-lg text-gray-900">{t.weddingDay.gettingThere}</h3>
                </div>
                <p className="text-gray-600 text-sm flex-grow leading-relaxed">
                  {t.weddingDay.gettingThereDetails}
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="rounded-xl bg-white p-6 shadow-md hover:shadow-lg hover:border-gold/20 border border-transparent transition-all duration-300 flex flex-col group"
              >
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center mr-3 group-hover:bg-gold/15 transition-colors">
                    <Bus className="text-gold h-5 w-5" />
                  </div>
                  <h3 className="font-display font-semibold text-lg text-gray-900">{t.weddingDay.accommodation}</h3>
                </div>
                <p className="text-gray-600 text-sm flex-grow leading-relaxed">
                  {t.weddingDay.accommodationDetails}
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="rounded-xl bg-white p-6 shadow-md hover:shadow-lg hover:border-gold/20 border border-transparent transition-all duration-300 flex flex-col group"
              >
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center mr-3 group-hover:bg-gold/15 transition-colors">
                    <Sun className="text-gold h-5 w-5" />
                  </div>
                  <h3 className="font-display font-semibold text-lg text-gray-900">{t.weddingDay.weather}</h3>
                </div>
                <p className="text-gray-600 text-sm flex-grow leading-relaxed">
                  {t.weddingDay.weatherDetails}
                </p>
              </motion.div>
            </div>
          </motion.div>
          
          <div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mb-12"
            >
              <h3 className="font-display text-3xl font-bold mb-8">{t.weddingDay.timeline}</h3>
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
              <h3 className="font-display text-3xl font-bold mb-8">{t.weddingDay.whatToWear}</h3>
              <div className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="rounded-xl bg-white p-6 shadow-md hover:shadow-lg hover:border-gold/20 border border-transparent transition-all duration-300 group"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center flex-shrink-0 group-hover:bg-gold/15 transition-colors mt-1">
                      <Shirt className="text-gold h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-display font-semibold text-lg text-gray-900 mb-2">{t.weddingDay.dressCode}</h4>
                      <p className="text-gray-600 leading-relaxed">
                        {t.weddingDay.dressCodeDetails}
                      </p>
                    </div>
                  </div>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className="rounded-xl bg-white p-6 shadow-md hover:shadow-lg hover:border-gold/20 border border-transparent transition-all duration-300 group"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center flex-shrink-0 group-hover:bg-gold/15 transition-colors mt-1">
                      <Info className="text-gold h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-display font-semibold text-lg text-gray-900 mb-2">{t.weddingDay.specialNotes}</h4>
                      <p className="text-gray-600 leading-relaxed">
                        {t.weddingDay.specialNotesDetails}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WeddingDaySection;