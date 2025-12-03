import HeroSection from "@/components/sections/HeroSection";
import PreWeddingSection from "@/components/sections/PreWeddingSection";
import WeddingDaySection from "@/components/sections/WeddingDaySection";
import PostWeddingSection from "@/components/sections/PostWeddingSection";
import RsvpSection from "@/components/sections/RsvpSection";
import WeddingGallerySection from "@/components/sections/WeddingGallerySection";
// import HoneymoonSection from "@/components/sections/HoneymoonSection"; // Hidden for now - uncomment when ready

const Home = () => {
  return (
    <main className="font-sans bg-offwhite text-gray-800">
      <HeroSection />
      <div className="section-divider bg-floral-pattern"></div>
      <PreWeddingSection />
      <div className="section-divider bg-floral-pattern"></div>
      <WeddingDaySection />
      <div className="section-divider bg-floral-pattern"></div>
      <PostWeddingSection />
      <div className="section-divider bg-floral-pattern"></div>
      <RsvpSection />
      <div className="section-divider bg-floral-pattern"></div>
      <WeddingGallerySection />
    </main>
  );
};

export default Home;
