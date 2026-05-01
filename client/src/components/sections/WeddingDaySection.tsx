import { useRef } from "react";
import { useInView } from "framer-motion";
import { motion } from "framer-motion";
import { MapPin, Clock, Shirt, Info, Smartphone, Sun, Bus, ExternalLink, Users, Heart, Wine, UtensilsCrossed, Cake, Music, Pizza, Car } from "lucide-react";
import TimelineItem from "@/components/ui/TimelineItem";
import { Button } from "@/components/ui/button";
import { VENUE_ADDRESS } from "@/lib/constants";
import { useLanguage } from "@/lib/useLanguage";

const VENUE_MAPS_URL = "https://maps.app.goo.gl/eZuQpG2GWwmJqUhG9";

const BUS_STOPS = [
  { name: "Marquês de Pombal", url: "https://maps.google.com/?q=Marquês+de+Pombal,+Lisboa,+Portugal" },
  { name: "Praça dos Restauradores", url: "https://maps.google.com/?q=Praça+dos+Restauradores,+Lisboa,+Portugal" },
];

// Renders bus stop names as clickable Google Maps links in site gold colour
function ShuttleText({ text }: { text: string }) {
  const parts: (string | JSX.Element)[] = [text];
  BUS_STOPS.forEach((stop) => {
    const result: (string | JSX.Element)[] = [];
    parts.forEach((part) => {
      if (typeof part !== "string") { result.push(part); return; }
      const segments = part.split(stop.name);
      segments.forEach((seg, i) => {
        result.push(seg);
        if (i < segments.length - 1) {
          result.push(
            <a key={stop.name} href={stop.url} target="_blank" rel="noopener noreferrer"
              className="font-semibold text-gold hover:text-gold-dark underline underline-offset-2 inline-flex items-center gap-0.5 transition-colors">
              {stop.name}<ExternalLink className="h-3 w-3 inline ml-0.5" />
            </a>
          );
        }
      });
    });
    parts.splice(0, parts.length, ...result);
  });
  return <>{parts}</>;
}

// Renders the getting-there text: newlines → <br />, VISITLISBON → gold badge
function GettingThereText({ text }: { text: string }) {
  const lines = text.split("\n");
  return (
    <>
      {lines.map((line, i) => {
        const segments = line.split("VISITLISBON");
        return (
          <span key={i}>
            {segments.map((seg, j) => (
              <span key={j}>
                {seg}
                {j < segments.length - 1 && (
                  <span className="inline-flex items-center mx-1 px-2 py-0.5 rounded-md bg-gold/15 text-gold font-bold text-xs tracking-wider border border-gold/30 align-middle">
                    VISITLISBON
                  </span>
                )}
              </span>
            ))}
            {i < lines.length - 1 && <br />}
          </span>
        );
      })}
    </>
  );
}

// Highlights the "light jacket" phrase (varies by language) with a soft gold glow
const JACKET_TERMS: Record<string, string> = {
  en: "light jacket",
  it: "giacca leggera",
  es: "chaqueta ligera",
  fr: "veste légère",
};

function WeatherText({ text, language }: { text: string; language: string }) {
  const term = JACKET_TERMS[language];
  if (!term || !text.includes(term)) return <>{text}</>;
  const [before, after] = text.split(term);
  return (
    <>
      {before}
      <span className="font-semibold text-gold/90 bg-gold/10 px-1.5 py-0.5 rounded-md">
        {term}
      </span>
      {after}
    </>
  );
}

const WeddingDaySection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { t, language } = useLanguage();

  const openGoogleMaps = () => {
    window.open(VENUE_MAPS_URL, '_blank');
  };

  const timeline = [
    {
      time: "16:00",
      title: t.weddingDay.timelineEvents.guestArrival,
      description: t.weddingDay.timelineEvents.guestArrivalDesc,
      icon: Users,
      highlight: false
    },
    {
      time: "16:30",
      title: t.weddingDay.timelineEvents.ceremony,
      description: t.weddingDay.timelineEvents.ceremonyDesc,
      icon: Heart,
      highlight: true
    },
    {
      time: "17:00",
      title: t.weddingDay.timelineEvents.cocktailHour,
      description: t.weddingDay.timelineEvents.cocktailHourDesc,
      icon: Wine,
      highlight: false
    },
    {
      time: "19:00",
      title: t.weddingDay.timelineEvents.dinnerReception,
      description: t.weddingDay.timelineEvents.dinnerReceptionDesc,
      icon: UtensilsCrossed,
      highlight: false
    },
    {
      time: "21:30",
      title: t.weddingDay.timelineEvents.cakeCutting,
      description: t.weddingDay.timelineEvents.cakeCuttingDesc,
      icon: Cake,
      highlight: true
    },
    {
      time: "22:00",
      title: t.weddingDay.timelineEvents.partyTime,
      description: t.weddingDay.timelineEvents.partyTimeDesc,
      icon: Music,
      highlight: false
    },
    {
      time: "23:00",
      title: t.weddingDay.timelineEvents.lateNightSnacks,
      description: t.weddingDay.timelineEvents.lateNightSnacksDesc,
      icon: Pizza,
      highlight: false
    },
    {
      time: "01:00",
      title: t.weddingDay.timelineEvents.farewell,
      description: t.weddingDay.timelineEvents.farewellDesc,
      icon: Car,
      highlight: false
    }
  ];
  
  return (
    <section id="wedding-day" ref={ref} className="py-20 bg-gradient-to-b from-gray-50 via-white to-gray-50">
      <div className="container px-4 mx-auto max-w-7xl">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-gold/80 font-medium tracking-widest uppercase text-sm mb-3 block">June 26, 2026</span>
          <h2 className="text-5xl md:text-6xl font-display font-bold mb-4 text-gray-900">
            {t.weddingDay.title}
          </h2>
          <div className="flex items-center justify-center gap-3">
            <div className="w-12 h-0.5 bg-gold/40 rounded-full"></div>
            <Heart className="w-5 h-5 text-gold/60" />
            <div className="w-12 h-0.5 bg-gold/40 rounded-full"></div>
          </div>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl mb-8 group">
              <img 
                src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80" 
                alt="Wedding venue - Quinta Pezinhos no Tejo" 
                className="w-full h-80 object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
              <button
                onClick={openGoogleMaps}
                className="absolute bottom-0 left-0 right-0 p-6 text-white cursor-pointer hover:bg-black/40 transition-colors group/btn"
                aria-label="Open venue location in Google Maps"
              >
                <h3 className="font-display text-2xl font-semibold mb-1 group-hover/btn:underline">Quinta Pezinhos no Tejo</h3>
                <p className="text-white/80 text-sm flex items-center gap-2 group-hover/btn:text-white transition-colors">
                  <MapPin className="w-4 h-4" />
                  {t.weddingDay.venueLocation}
                </p>
              </button>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100 mb-8">
              <p className="text-gray-600 leading-relaxed text-lg">
                {t.weddingDay.venueDescription}
              </p>
            </div>
            
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
                <a
                  href={VENUE_MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 text-sm mb-5 flex-grow leading-relaxed hover:text-gold transition-colors block group/addr"
                >
                  Quinta Pezinhos no Tejo<br />
                  R. do Joinal 2825<br />
                  Caparica, Portugal
                  <MapPin className="inline h-3.5 w-3.5 ml-1 text-gold opacity-60 group-hover/addr:opacity-100 transition-opacity" />
                </a>
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
                  <GettingThereText text={t.weddingDay.gettingThereDetails} />
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
                  <ShuttleText text={t.weddingDay.accommodationDetails} />
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
                  <WeatherText text={t.weddingDay.weatherDetails} language={language} />
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
              <h3 className="font-display text-3xl font-bold mb-8 flex items-center gap-3">
                <Clock className="w-7 h-7 text-gold" />
                {t.weddingDay.timeline}
              </h3>
              <div className="relative">
                <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-gradient-to-b from-gold/50 via-gold/30 to-gold/10"></div>
                <div className="space-y-4">
                  {timeline.map((item, index) => {
                    const IconComponent = item.icon;
                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                        transition={{ duration: 0.4, delay: 0.4 + index * 0.08 }}
                        className={`relative pl-14 group ${item.highlight ? 'py-1' : ''}`}
                      >
                        <div className={`absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                          item.highlight 
                            ? 'bg-white border-2 border-gold text-gold shadow-lg shadow-gold/20' 
                            : 'bg-white border-2 border-gold/30 text-gold group-hover:border-gold group-hover:bg-gold/5'
                        }`}>
                          <IconComponent className="w-5 h-5" />
                        </div>
                        <div className={`rounded-xl p-4 transition-all duration-300 ${
                          item.highlight 
                            ? 'bg-gradient-to-r from-gold/10 to-gold/5 border border-gold/20 shadow-sm' 
                            : 'bg-white border border-gray-100 hover:border-gold/20 hover:shadow-md'
                        }`}>
                          <div className="flex items-center gap-3 mb-1">
                            <span className={`font-bold text-sm ${item.highlight ? 'text-gold' : 'text-gold/80'}`}>
                              {item.time}
                            </span>
                            <span className="text-gray-300">•</span>
                            <h4 className={`font-display font-semibold ${item.highlight ? 'text-gray-900' : 'text-gray-800'}`}>
                              {item.title}
                            </h4>
                          </div>
                          <p className="text-gray-600 text-sm leading-relaxed">
                            {item.description}
                          </p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h3 className="font-display text-3xl font-bold mb-8 flex items-center gap-3">
                <Shirt className="w-7 h-7 text-gold" />
                {t.weddingDay.whatToWear}
              </h3>
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