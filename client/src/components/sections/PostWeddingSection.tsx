import { useRef } from "react";
import { useInView } from "framer-motion";
import { motion } from "framer-motion";
import { Calendar, MapPin, Info, Shirt } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const PostWeddingSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px 0px" });
  const { toast } = useToast();
  
  const handleRSVP = (attending: boolean) => {
    toast({
      title: attending ? "Great! You're coming to brunch!" : "We'll miss you at brunch!",
      description: attending 
        ? "We look forward to seeing you for our farewell brunch."
        : "Thank you for letting us know you can't make it.",
      duration: 5000,
    });
  };
  
  return (
    <section id="post-wedding" ref={ref} className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.h2 
          className="text-center font-display text-4xl md:text-5xl mb-16 relative"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <span className="relative z-10">After The Wedding</span>
          <span className="absolute w-24 h-2 bg-gold-light bottom-0 left-1/2 transform -translate-x-1/2"></span>
        </motion.h2>
        
        <motion.div 
          className="max-w-3xl mx-auto text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <p className="text-gray-600 leading-relaxed text-lg">
            The celebration continues! Join us the day after the wedding for a relaxed brunch to say goodbye before we jet off on our honeymoon.
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <img 
              src="https://images.unsplash.com/photo-1564357645073-9b10fbeba0ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80" 
              alt="Boat cruise on the Tagus River" 
              className="w-full h-80 object-cover rounded-lg shadow-lg"
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h3 className="font-display text-2xl mb-4">Farewell Boat Brunch</h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <Calendar className="text-gold mr-3 mt-1 h-5 w-5" />
                <div>
                  <h4 className="font-medium">When</h4>
                  <p className="text-gray-600">Sunday, June 27, 2026 • 11:00 AM - 2:00 PM</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <MapPin className="text-gold mr-3 mt-1 h-5 w-5" />
                <div>
                  <h4 className="font-medium">Where</h4>
                  <p className="text-gray-600">Tagus River Cruise, Departing from Doca de Santo Amaro</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Info className="text-gold mr-3 mt-1 h-5 w-5" />
                <div>
                  <h4 className="font-medium">Details</h4>
                  <p className="text-gray-600">Join us for a casual brunch on a beautiful boat with scenic views of Lisbon's coastline. This will be a relaxed affair with mimosas, pastries, and good company as we cruise along the Tagus River.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Shirt className="text-gold mr-3 mt-1 h-5 w-5" />
                <div>
                  <h4 className="font-medium">Dress Code</h4>
                  <p className="text-gray-600">All White – Please wear white attire for this special boat excursion</p>
                </div>
              </div>
            </div>
            
            <div className="mt-8">
              <p className="text-gray-600 italic mb-4">Please let us know if you'll be joining us for brunch:</p>
              <div className="flex flex-wrap gap-4">
                <Button 
                  onClick={() => handleRSVP(true)}
                  className="bg-gold hover:bg-gold-dark text-white font-medium py-2 px-6 rounded-full transition-all transform hover:scale-105"
                >
                  I'll Be There
                </Button>
                <Button 
                  onClick={() => handleRSVP(false)}
                  variant="outline"
                  className="bg-white border border-gold text-gold hover:bg-gold-light font-medium py-2 px-6 rounded-full transition-all"
                >
                  Can't Make It
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Photo Gallery */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <h3 className="font-display text-3xl text-center mb-8">Wedding Gallery</h3>
          <p className="text-center text-gray-600 max-w-2xl mx-auto mb-10">
            Our wedding photos will be uploaded here the week after the celebration. Check back to relive the memories and download your favorites!
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="gallery-img overflow-hidden rounded-lg shadow-md">
              <img 
                src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=800&q=80" 
                alt="Wedding celebration" 
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
              />
            </div>
            
            <div className="gallery-img overflow-hidden rounded-lg shadow-md">
              <img 
                src="https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=800&q=80" 
                alt="Wedding venue decorations" 
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
              />
            </div>
            
            <div className="gallery-img overflow-hidden rounded-lg shadow-md">
              <img 
                src="https://images.unsplash.com/photo-1537633552985-df8429e8048b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=800&q=80" 
                alt="Wedding couple portrait" 
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
              />
            </div>
            
            <div className="gallery-img overflow-hidden rounded-lg shadow-md">
              <img 
                src="https://images.unsplash.com/photo-1535254973040-607b474cb50d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=800&q=80" 
                alt="Wedding cake" 
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
              />
            </div>
          </div>
          
          <div className="text-center mt-8">
            <Button className="bg-gold hover:bg-gold-dark text-white font-medium py-3 px-8 rounded-full transition-all transform hover:scale-105 hover:shadow-lg">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
              </svg>
              Gallery Coming Soon
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PostWeddingSection;
