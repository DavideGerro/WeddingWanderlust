import { useRef } from "react";
import { useInView } from "framer-motion";
import { motion } from "framer-motion";
import { MapPin, HandPlatter, Info } from "lucide-react";
import { Card } from "@/components/ui/card";

const hotels = [
  {
    name: "Hotel Avenida Palace",
    stars: 5,
    description: "Located in the heart of Lisbon, this historic hotel offers elegant rooms and excellent service, just a 10-minute drive from our venue.",
    rate: "€180/night",
    bookingUrl: "#"
  },
  {
    name: "Lisbon Boutique Hotel",
    stars: 4,
    description: "A charming boutique hotel with modern amenities and a rooftop terrace, located within walking distance to the venue.",
    rate: "€140/night",
    bookingUrl: "#"
  },
  {
    name: "Alfama River Apartments",
    stars: 3,
    description: "Perfect for families or groups, these spacious apartments offer kitchen facilities and beautiful views of the Tagus River.",
    rate: "€120/night",
    bookingUrl: "#"
  }
];

const PreWeddingSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px 0px" });
  
  return (
    <section id="pre-wedding" ref={ref} className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.h2 
          className="text-center font-display text-4xl md:text-5xl mb-16 relative"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <span className="relative z-10">Before The Wedding</span>
          <span className="absolute w-24 h-2 bg-gold-light bottom-0 left-1/2 transform -translate-x-1/2"></span>
        </motion.h2>
        
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <img 
              src="https://images.unsplash.com/photo-1555881400-74d7acaacd8b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80" 
              alt="Lisbon cityscape" 
              className="w-full h-80 object-cover rounded-lg shadow-lg mb-6"
            />
            <h3 className="font-display text-2xl mb-4">Discovering Lisbon</h3>
            <p className="text-gray-600 leading-relaxed mb-5">
              Lisbon, the city of seven hills, offers a perfect blend of history, culture, and breathtaking views. We've put together some recommendations to help you make the most of your stay in this beautiful city.
            </p>
            <div className="space-y-3">
              <div className="flex items-start">
                <MapPin className="text-gold mr-3 mt-1 h-5 w-5" />
                <div>
                  <h4 className="font-medium">Must-Visit Places</h4>
                  <p className="text-gray-600">Alfama District, Belém Tower, Jerónimos Monastery, Praça do Comércio</p>
                </div>
              </div>
              <div className="flex items-start">
                <HandPlatter className="text-gold mr-3 mt-1 h-5 w-5" />
                <div>
                  <h4 className="font-medium">Local Cuisine</h4>
                  <p className="text-gray-600">Try the famous pastéis de nata, bacalhau, and ginjinha at traditional tascas</p>
                </div>
              </div>
              <div className="flex items-start">
                <Info className="text-gold mr-3 mt-1 h-5 w-5" />
                <div>
                  <h4 className="font-medium">Useful Tips</h4>
                  <p className="text-gray-600">Wear comfortable shoes for the hills, bring a light jacket for evening, and try to learn a few basic Portuguese phrases</p>
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h3 className="font-display text-2xl mb-4">Accommodation</h3>
            <p className="text-gray-600 leading-relaxed mb-6">
              We've arranged special rates at these hotels close to our venue. When booking, mention "Sofia & Marco Wedding" for the discounted price.
            </p>
            
            <div className="space-y-6">
              {hotels.map((hotel, index) => (
                <Card key={index} className="bg-offwhite rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow">
                  <h4 className="font-medium text-lg">{hotel.name}</h4>
                  <div className="flex items-center text-sm text-gray-500 mb-2">
                    {[...Array(hotel.stars)].map((_, i) => (
                      <svg key={i} className="w-4 h-4 text-gold mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                    ))}
                    <span className="ml-2">{hotel.stars}-star {hotel.stars === 5 ? 'luxury hotel' : hotel.stars === 4 ? 'boutique hotel' : 'apartments'}</span>
                  </div>
                  <p className="text-gray-600 mb-3">{hotel.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Special rate: {hotel.rate}</span>
                    <a href={hotel.bookingUrl} className="text-gold hover:text-gold-dark font-medium transition-colors">
                      Book Now <span className="inline-block ml-1">↗</span>
                    </a>
                  </div>
                </Card>
              ))}
            </div>
          </motion.div>
        </div>
        
        <motion.div 
          className="bg-offwhite rounded-lg shadow-lg p-6 md:p-8"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h3 className="font-display text-2xl mb-6 text-center">Getting Around Lisbon</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-md">
                <svg className="h-6 w-6 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
              </div>
              <h4 className="font-medium text-lg mb-2">Taxis & Rideshares</h4>
              <p className="text-gray-600">Uber, Bolt and local taxis are readily available. Average ride from city center to venue: €15</p>
            </div>
            
            <div className="text-center">
              <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-md">
                <svg className="h-6 w-6 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </div>
              <h4 className="font-medium text-lg mb-2">Public Transport</h4>
              <p className="text-gray-600">Lisbon's metro, trams, and buses are affordable and efficient. Get a 24h travel card for €6.40</p>
            </div>
            
            <div className="text-center">
              <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-md">
                <svg className="h-6 w-6 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h4 className="font-medium text-lg mb-2">Walking</h4>
              <p className="text-gray-600">Many attractions are within walking distance, but be prepared for Lisbon's famous hills!</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PreWeddingSection;
