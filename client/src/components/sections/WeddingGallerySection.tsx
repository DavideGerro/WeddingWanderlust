import { useRef } from "react";
import { useInView } from "framer-motion";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/useLanguage";

const WeddingGallerySection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useLanguage();

  return (
    <section id="gallery" ref={ref} className="py-20 bg-gray-50">
      <div className="container px-4 mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="inline-block mb-6">
            <span className="text-5xl">📸</span>
          </div>
          <h2 className="font-display text-3xl font-bold mb-4">{t.postWedding.weddingGallery}</h2>
          <div className="w-16 h-1 bg-primary/30 mx-auto mb-6"></div>
          <p className="text-gray-600 mb-8 text-lg">
            {t.postWedding.galleryDesc}
          </p>
          <div className="p-16 bg-white rounded-xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center shadow-sm">
            <span className="text-4xl mb-4">🎞️</span>
            <p className="text-xl text-gray-400 font-light italic">{t.postWedding.gallerySoon}</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WeddingGallerySection;
