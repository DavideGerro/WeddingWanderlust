import { useLocation } from "wouter";
import { useLanguage } from "@/lib/useLanguage";

const Footer = () => {
  const [, navigate] = useLocation();
  const { t, language, country } = useLanguage();

  const honeymoonHiddenCountries = ["FR", "MA"];
  const countryHidden = country ? honeymoonHiddenCountries.includes(country) : false;
  const showHoneymoon = !countryHidden && language !== "fr";

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

  const navLinks = [
    { href: "#pre-wedding", label: t.navLinks.preWedding },
    { href: "#wedding-day", label: t.navLinks.weddingDay },
    { href: "#post-wedding", label: t.navLinks.postWedding },
    ...(showHoneymoon ? [{ href: "#honeymoon", label: t.navLinks.honeymoon }] : []),
  ];

  return (
    <footer className="bg-gray-100 py-12">
      <div className="container mx-auto px-4 text-center">
        <h2 className="font-display text-3xl text-gold mb-6">Sara & Devid</h2>
        
        <p className="text-gray-600 mb-8 max-w-xl mx-auto">
          {t.footer.thankYou}
        </p>
        
        <div className="flex flex-wrap justify-center gap-4 md:gap-6 mb-8">
          {navLinks.map((link) => (
            <a 
              key={link.href}
              href={link.href} 
              className="text-gray-600 hover:text-gold transition-colors"
              onClick={(e) => {
                e.preventDefault();
                handleNavigation(link.href);
              }}
            >
              {link.label}
            </a>
          ))}
        </div>
        
        <div className="text-gray-500 text-sm">
          <p>{t.footer.copyright}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
