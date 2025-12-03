import { useRef } from "react";
import { useInView } from "framer-motion";
import { motion } from "framer-motion";
import { Calendar, MapPin, Info, Shirt } from "lucide-react";
import { useLanguage } from "@/lib/useLanguage";

const PostWeddingSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useLanguage();

  return (
    <section id="post-wedding" ref={ref} className="py-20 bg-white">
      <div className="container px-4 mx-auto max-w-5xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-display font-bold mb-4">
            {t.postWedding.title}
          </h2>
          <div className="w-24 h-1 bg-primary/30 mx-auto mb-6"></div>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            {t.postWedding.description}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <img 
              src="/images/tagus-boat.jpg" 
              alt="Boat cruise on the Tagus River" 
              className="w-full h-80 object-cover rounded-lg shadow-lg"
              loading="lazy"
              data-testid="img-tagus-boat"
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h3 className="font-display text-2xl mb-4">{t.postWedding.farewellBrunch}</h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <Calendar className="text-primary mr-3 mt-1 h-5 w-5" />
                <div>
                  <h4 className="font-medium">{t.postWedding.when}</h4>
                  <p className="text-gray-600">Sunday, June 27, 2026 • 19:00 - 21:00</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <MapPin className="text-primary mr-3 mt-1 h-5 w-5" />
                <div>
                  <h4 className="font-medium">{t.postWedding.where}</h4>
                  <p className="text-gray-600">Tagus River Cruise, Departing from Doca de Santo Amaro</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Info className="text-primary mr-3 mt-0.5 h-6 w-6" />
                <div>
                  <h4 className="font-medium">{t.postWedding.details}</h4>
                  <p className="text-gray-600">{t.postWedding.detailsDesc}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Shirt className="text-primary mr-3 mt-1 h-5 w-5" />
                <div>
                  <h4 className="font-medium">{t.postWedding.dressCode}</h4>
                  <p className="text-gray-600">{t.postWedding.dressCodeDetails}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PostWeddingSection;