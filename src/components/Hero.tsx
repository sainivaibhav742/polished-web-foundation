import { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Shield, Award, Users } from 'lucide-react';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    const fadeElements = heroRef.current?.querySelectorAll('.fade-in');
    fadeElements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.offsetTop - headerOffset;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  };

  const stats = [
    { icon: Users, label: 'Clients Served', value: '500+' },
    { icon: Award, label: 'Awards Won', value: '25+' },
    { icon: Shield, label: 'Years Experience', value: '15+' },
  ];

  return (
    <section id="hero" className="section-padding bg-gradient-to-b from-background to-muted/20" ref={heroRef}>
      <div className="container-custom">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Heading */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-foreground mb-6 fade-in">
            Professional Excellence
            <span className="block text-primary">Delivered Daily</span>
          </h1>

          {/* Subheading */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed fade-in max-w-3xl mx-auto">
            We provide comprehensive business solutions with a commitment to quality, 
            innovation, and client satisfaction that has defined our industry leadership for over a decade.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 fade-in">
            <Button
              size="lg"
              className="btn-professional text-lg px-8 py-4 h-auto"
              onClick={() => scrollToSection('services')}
            >
              Our Services
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="btn-outline text-lg px-8 py-4 h-auto"
              onClick={() => scrollToSection('about')}
            >
              Learn More
            </Button>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto fade-in">
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className="text-center p-6 rounded-lg bg-card border border-border hover-lift"
              >
                <stat.icon className="h-12 w-12 text-primary mx-auto mb-4" />
                <div className="text-3xl font-bold text-foreground mb-2">{stat.value}</div>
                <div className="text-sm text-muted-foreground font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;