import { useRef } from "react";
import { useInView } from "framer-motion";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/useLanguage";

const WeddingGallerySection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useLanguage();

  return (
    <section id="gallery" ref={ref} className="py-16 bg-white">
      <div className="container px-4 mx-auto max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h3 className="font-display text-2xl mb-4">{t.postWedding.weddingGallery}</h3>
          <p className="text-gray-600 mb-6">
            {t.postWedding.galleryDesc}
          </p>
          <div className="p-12 bg-gray-50 rounded-lg border border-dashed border-gray-300 flex items-center justify-center">
            <p className="text-xl text-gray-400 font-light">{t.postWedding.gallerySoon}</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WeddingGallerySection;
