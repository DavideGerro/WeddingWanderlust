import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Menu, X, Globe } from "lucide-react";
import { useLanguage } from "@/lib/useLanguage";
import { Language } from "@/lib/i18n";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [, navigate] = useLocation();
  const { t, language, changeLanguage, availableLanguages } = useLanguage();

  const navLinks = [
    { href: "#pre-wedding", label: t.navLinks.preWedding },
    { href: "#wedding-day", label: t.navLinks.weddingDay },
    { href: "#post-wedding", label: t.navLinks.postWedding },
    { href: "#honeymoon", label: t.navLinks.honeymoon },
  ];

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

  const handleLanguageChange = (lang: Language) => {
    changeLanguage(lang);
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
          data-testid="link-logo"
          aria-label="Go to top of page"
        >
          Sara & Devid
        </a>
        
        {/* Desktop navigation */}
        <div className="hidden md:flex items-center">
          <nav className="flex space-x-8 mr-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-sans font-medium hover:text-gold transition-colors focus:outline-none focus:underline"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavigation(link.href);
                }}
                data-testid={`link-nav-${link.href.replace('#', '')}`}
              >
                {link.label}
              </a>
            ))}
          </nav>
          
          {/* Language selector */}
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center text-sm font-medium border border-gray-200 rounded-full px-3 py-1 hover:bg-gray-50">
              <Globe className="h-4 w-4 mr-1" />
              {availableLanguages.find(lang => lang.code === language)?.name}
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {availableLanguages.map((lang) => (
                <DropdownMenuItem 
                  key={lang.code}
                  className={`cursor-pointer ${language === lang.code ? 'bg-gray-100 font-semibold' : ''}`}
                  onClick={() => handleLanguageChange(lang.code as Language)}
                >
                  {lang.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        {/* Mobile menu button */}
        <div className="md:hidden flex items-center space-x-2">
          {/* Mobile language selector */}
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center text-sm font-medium border border-gray-200 rounded-full p-1">
              <Globe className="h-5 w-5" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {availableLanguages.map((lang) => (
                <DropdownMenuItem 
                  key={lang.code}
                  className={`cursor-pointer ${language === lang.code ? 'bg-gray-100 font-semibold' : ''}`}
                  onClick={() => handleLanguageChange(lang.code as Language)}
                >
                  {lang.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          
          <button 
            className="text-gray-800 focus:outline-none focus:ring-2 focus:ring-gold rounded" 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            data-testid="button-mobile-menu"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
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
