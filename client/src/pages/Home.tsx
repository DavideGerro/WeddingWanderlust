import HeroSection from "@/components/sections/HeroSection";
import PreWeddingSection from "@/components/sections/PreWeddingSection";
import WeddingDaySection from "@/components/sections/WeddingDaySection";
import RsvpSection from "@/components/sections/RsvpSection";
import PostWeddingSection from "@/components/sections/PostWeddingSection";
import HoneymoonSection from "@/components/sections/HoneymoonSection";

const Home = () => {
  return (
    <main className="font-sans bg-offwhite text-gray-800">
      <HeroSection />
      <div className="section-divider bg-floral-pattern"></div>
      <PreWeddingSection />
      <div className="section-divider bg-floral-pattern"></div>
      <WeddingDaySection />
      <div className="section-divider bg-floral-pattern"></div>
      <RsvpSection />
      <div className="section-divider bg-floral-pattern"></div>
      <PostWeddingSection />
      <div className="section-divider bg-floral-pattern"></div>
      <HoneymoonSection />
    </main>
  );
};

export default Home;
