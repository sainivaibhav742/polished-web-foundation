import { useEffect } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Services from '@/components/Services';
import Portfolio from '@/components/Portfolio';
import News from '@/components/News';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import BackToTop from '@/components/BackToTop';
import Preloader from '@/components/Preloader';

interface IndexProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const Index = ({ darkMode, toggleDarkMode }: IndexProps) => {
  useEffect(() => {
    // Keyboard navigation support
    const handleKeyDown = (event: KeyboardEvent) => {
      // Skip to main content with Tab
      if (event.key === 'Tab' && !event.shiftKey) {
        const mainContent = document.querySelector('main');
        if (mainContent && document.activeElement === document.body) {
          event.preventDefault();
          mainContent.focus();
        }
      }
      
      // Navigate sections with arrow keys when focused
      if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
        const sections = ['hero', 'about', 'services', 'portfolio', 'news', 'contact'];
        const currentSection = sections.find(section => {
          const element = document.getElementById(section);
          if (element) {
            const rect = element.getBoundingClientRect();
            return rect.top <= 100 && rect.bottom >= 100;
          }
          return false;
        });
        
        if (currentSection) {
          const currentIndex = sections.indexOf(currentSection);
          let nextIndex;
          
          if (event.key === 'ArrowDown') {
            nextIndex = currentIndex < sections.length - 1 ? currentIndex + 1 : 0;
          } else {
            nextIndex = currentIndex > 0 ? currentIndex - 1 : sections.length - 1;
          }
          
          const nextElement = document.getElementById(sections[nextIndex]);
          if (nextElement) {
            event.preventDefault();
            const headerOffset = 80;
            const elementPosition = nextElement.offsetTop - headerOffset;
            window.scrollTo({
              top: elementPosition,
              behavior: 'smooth'
            });
          }
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      <Preloader />
      
      {/* Skip to main content for accessibility */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 bg-primary text-primary-foreground px-4 py-2 rounded-lg"
      >
        Skip to main content
      </a>
      
      <div className="min-h-screen bg-background text-foreground">
        <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        
        <main id="main-content" tabIndex={-1} className="focus:outline-none">
          <Hero />
          <About />
          <Services />
          <Portfolio />
          <News />
          <Contact />
        </main>
        
        <Footer />
        <BackToTop />
      </div>
    </>
  );
};

export default Index;
