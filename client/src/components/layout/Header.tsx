import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "#pre-wedding", label: "Pre-Wedding" },
  { href: "#wedding-day", label: "Wedding Day" },
  { href: "#post-wedding", label: "Post-Wedding" },
  { href: "#honeymoon", label: "Honeymoon" },
];

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [, navigate] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

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
    
    setIsMobileMenuOpen(false);
  };

  return (
    <header className={`fixed w-full bg-white bg-opacity-95 shadow-md z-50 transition-all duration-300 ${
      isScrolled ? "py-1" : "py-2"
    }`}>
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        <a 
          href="#hero" 
          className="font-display text-2xl text-gold font-bold italic"
          onClick={(e) => {
            e.preventDefault();
            handleNavigation("#hero");
          }}
        >
          Sara & Devid
        </a>
        
        {/* Desktop navigation */}
        <nav className="hidden md:flex space-x-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-sans font-medium hover:text-gold transition-colors"
              onClick={(e) => {
                e.preventDefault();
                handleNavigation(link.href);
              }}
            >
              {link.label}
            </a>
          ))}
        </nav>
        
        {/* Mobile menu button */}
        <button 
          className="md:hidden text-gray-800 focus:outline-none" 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>
      
      {/* Mobile navigation */}
      {isMobileMenuOpen && (
        <nav className="md:hidden bg-white">
          <div className="container mx-auto px-4 py-2 flex flex-col space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-sans font-medium hover:text-gold transition-colors py-2"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavigation(link.href);
                }}
              >
                {link.label}
              </a>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;
