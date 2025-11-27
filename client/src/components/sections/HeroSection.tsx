import { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { useLanguage } from "@/lib/useLanguage";
import heroIllustration from "@assets/generated_images/playful_watercolor_bride_and_groom.png";

const HeroSection = () => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref);
  const { t } = useLanguage();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);

  const handleExploreClick = () => {
    const preWeddingSection = document.querySelector("#pre-wedding");
    if (preWeddingSection) {
      preWeddingSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      ref={ref}
      className="h-screen relative flex items-center justify-center"
      style={{
        background: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url('${heroIllustration}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <motion.div
        className="text-center text-white"
        initial="hidden"
        animate={controls}
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: {
            opacity: 1,
            y: 0,
            transition: {
              duration: 0.8,
              staggerChildren: 0.3,
            },
          },
        }}
      >
        <motion.h1
          className="font-display text-5xl md:text-7xl font-bold mb-4"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
        >
          Sara & Devid
        </motion.h1>
        <motion.p
          className="text-xl md:text-2xl mb-6 font-light"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
        >
          {t.hero.gettingMarried}
        </motion.p>
        <motion.p
          className="text-xl md:text-2xl font-light"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
        >
          {t.hero.date}
        </motion.p>
        <motion.div
          className="mt-12"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
        >
          <button
            onClick={handleExploreClick}
            className="inline-block bg-gold hover:bg-gold-dark text-white font-medium py-3 px-8 rounded-full transition-all transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent"
            data-testid="button-explore"
            aria-label="Scroll to explore wedding details"
          >
            {t.hero.exploreButton} <span className="ml-2" aria-hidden="true">↓</span>
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;