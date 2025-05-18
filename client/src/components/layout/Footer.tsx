import { useLocation } from "wouter";

const Footer = () => {
  const [, navigate] = useLocation();

  const handleNavigation = (href: string) => {
    const isHashLink = href.startsWith("#");
    
    if (isHashLink) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      navigate(href);
    }
  };

  return (
    <footer className="bg-gray-100 py-12">
      <div className="container mx-auto px-4 text-center">
        <h2 className="font-display text-3xl text-gold mb-6">Sara & Devid</h2>
        
        <p className="text-gray-600 mb-8 max-w-xl mx-auto">
          Thank you for sharing in our special day. We can't wait to celebrate with you in Lisbon!
        </p>
        
        <div className="flex flex-wrap justify-center gap-4 md:gap-6 mb-8">
          <a 
            href="#pre-wedding" 
            className="text-gray-600 hover:text-gold transition-colors"
            onClick={(e) => {
              e.preventDefault();
              handleNavigation("#pre-wedding");
            }}
          >
            Pre-Wedding
          </a>
          <a 
            href="#wedding-day" 
            className="text-gray-600 hover:text-gold transition-colors"
            onClick={(e) => {
              e.preventDefault();
              handleNavigation("#wedding-day");
            }}
          >
            Wedding Day
          </a>
          <a 
            href="#post-wedding" 
            className="text-gray-600 hover:text-gold transition-colors"
            onClick={(e) => {
              e.preventDefault();
              handleNavigation("#post-wedding");
            }}
          >
            Post-Wedding
          </a>
          <a 
            href="#honeymoon" 
            className="text-gray-600 hover:text-gold transition-colors"
            onClick={(e) => {
              e.preventDefault();
              handleNavigation("#honeymoon");
            }}
          >
            Honeymoon
          </a>
        </div>
        
        <div className="text-gray-500 text-sm">
          <p>&copy; 2024 Sofia & Marco Wedding</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
