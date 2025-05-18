import { useRef } from "react";
import { useInView } from "framer-motion";
import { motion } from "framer-motion";
import { MapPin, Car, Accessibility, Info } from "lucide-react";
import TimelineItem from "@/components/ui/TimelineItem";

const timelineItems = [
  {
    title: "Arrival & Welcome",
    time: "3:00 PM - 3:30 PM",
    description: "Arrive at Palácio dos Marqueses where you'll be greeted with welcome drinks and have time to mingle before the ceremony begins."
  },
  {
    title: "Ceremony",
    time: "4:00 PM - 5:00 PM",
    description: "Our ceremony will take place in the palace gardens with a beautiful view of the river. Please be seated 10 minutes before the ceremony begins."
  },
  {
    title: "Cocktail Hour",
    time: "5:00 PM - 6:30 PM",
    description: "Enjoy cocktails, canapés, and live music on the terrace while we take photos. This is a perfect time to enjoy the sunset views over Lisbon."
  },
  {
    title: "Dinner & Speeches",
    time: "6:30 PM - 9:00 PM",
    description: "Dinner will be served in the grand ballroom. We'll have speeches, toasts, and share our first dance as a married couple."
  },
  {
    title: "Dancing & Celebration",
    time: "9:00 PM - 2:00 AM",
    description: "Dance the night away with our live band and DJ! Midnight snacks will be served to keep the energy high."
  }
];

const WeddingDaySection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px 0px" });
  
  return (
    <section id="wedding-day" ref={ref} className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.h2 
          className="text-center font-display text-4xl md:text-5xl mb-16 relative"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <span className="relative z-10">The Wedding Day</span>
          <span className="absolute w-24 h-2 bg-gold-light bottom-0 left-1/2 transform -translate-x-1/2"></span>
        </motion.h2>
        
        {/* Wedding Venue */}
        <motion.div 
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <img 
            src="https://images.unsplash.com/photo-1548707309-dac9c32c1c0d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80" 
            alt="Wedding venue in Lisbon" 
            className="w-full h-96 object-cover rounded-lg shadow-lg mb-8"
          />
          
          <div className="md:flex md:space-x-12">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h3 className="font-display text-2xl mb-4">Quinta Pezinhos no Tejo</h3>
              <p className="text-gray-600 leading-relaxed mb-5">
                Our ceremony and reception will be held at the beautiful Quinta Pezinhos no Tejo, a charming venue with stunning views of the Tagus River. We're excited to share this special place with you as we celebrate our love.
              </p>
              <div className="space-y-3">
                <div className="flex items-start">
                  <MapPin className="text-gold mr-3 mt-1 h-5 w-5" />
                  <div>
                    <h4 className="font-medium">Location</h4>
                    <p className="text-gray-600">R. do Joinal 2825, Caparica</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Car className="text-gold mr-3 mt-1 h-5 w-5" />
                  <div>
                    <h4 className="font-medium">Parking</h4>
                    <p className="text-gray-600">Complimentary valet parking available for all guests</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Accessibility className="text-gold mr-3 mt-1 h-5 w-5" />
                  <div>
                    <h4 className="font-medium">Accessibility</h4>
                    <p className="text-gray-600">The venue is fully accessible with elevators and ramps</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="md:w-1/2">
              <div className="bg-offwhite rounded-lg p-6 shadow-md h-full">
                <h3 className="font-display text-2xl mb-4">Venue Map</h3>
                <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center mb-4">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12447.881865882106!2d-9.217509337133767!3d38.69746289272244!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd1ecb42c3c8a1db%3A0x320674966de82677!2sBel%C3%A9m%2C%20Lisbon%2C%20Portugal!5e0!3m2!1sen!2sus!4v1621523336425!5m2!1sen!2sus" 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen 
                    loading="lazy"
                    title="Wedding Venue Map"
                    className="rounded-lg"
                  ></iframe>
                </div>
                <div className="text-right">
                  <a 
                    href="https://maps.google.com" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-flex items-center text-gold hover:text-gold-dark font-medium transition-colors"
                  >
                    View in Google Maps <span className="ml-1">↗</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Wedding Timeline */}
        <motion.div 
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h3 className="font-display text-3xl text-center mb-12">Wedding Day Timeline</h3>
          
          <div className="relative">
            {timelineItems.map((item, index) => (
              <TimelineItem 
                key={index}
                title={item.title}
                time={item.time}
                description={item.description}
                isEven={index % 2 === 0}
                delay={index * 0.1}
              />
            ))}
          </div>
        </motion.div>
        
        {/* What to Wear */}
        <motion.div 
          className="bg-offwhite rounded-lg shadow-lg p-6 md:p-8"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h3 className="font-display text-2xl mb-6 text-center">What to Wear</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="text-center">
              <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-md">
                <svg className="h-6 w-6 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h4 className="font-medium text-lg mb-2">Dress Code</h4>
              <p className="text-gray-600">Formal attire requested. Men are encouraged to wear suits or tuxedos, and women to wear cocktail dresses or evening gowns.</p>
            </div>
            
            <div className="text-center">
              <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-md">
                <Info className="text-gold h-6 w-6" />
              </div>
              <h4 className="font-medium text-lg mb-2">Special Notes</h4>
              <p className="text-gray-600">The ceremony will take place on grass, so consider appropriate footwear. The evening might get cooler, so a light wrap or jacket is recommended.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WeddingDaySection;
