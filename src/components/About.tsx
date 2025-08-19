import { useEffect, useRef } from 'react';
import { CheckCircle, Target, Eye, Heart } from 'lucide-react';

const About = () => {
  const aboutRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('slide-up-visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    const slideElements = aboutRef.current?.querySelectorAll('.slide-up');
    slideElements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const values = [
    {
      icon: Target,
      title: 'Mission',
      description: 'To deliver exceptional business solutions that drive growth and success for our clients through innovation and dedication.'
    },
    {
      icon: Eye,
      title: 'Vision',
      description: 'To be the leading provider of professional services, recognized for our expertise, integrity, and commitment to excellence.'
    },
    {
      icon: Heart,
      title: 'Values',
      description: 'Integrity, innovation, collaboration, and client success form the foundation of everything we do in our organization.'
    }
  ];

  const achievements = [
    'ISO 9001:2015 Certified Quality Management',
    'Award-winning customer service excellence',
    'Trusted by Fortune 500 companies',
    'Sustainable business practices leader',
    'Innovation in digital transformation',
    'Community partnership initiatives'
  ];

  return (
    <section id="about" className="section-padding bg-muted/30" ref={aboutRef}>
      <div className="container-custom">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16 slide-up">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6">
              About Our Company
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Founded on principles of excellence and innovation, we have been serving businesses 
              worldwide with comprehensive solutions for over 15 years.
            </p>
          </div>

          {/* Company Story */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
            <div className="slide-up">
              <h3 className="text-2xl font-serif font-semibold text-foreground mb-6">
                Our Story
              </h3>
              <div className="prose prose-lg text-muted-foreground space-y-4">
                <p>
                  Since our establishment in 2008, we have grown from a small team of dedicated 
                  professionals to a globally recognized organization serving clients across 
                  multiple industries and continents.
                </p>
                <p>
                  Our commitment to quality, innovation, and client satisfaction has earned us 
                  numerous industry awards and the trust of over 500 businesses worldwide. 
                  We continue to evolve and adapt to meet the changing needs of our clients.
                </p>
                <p>
                  Today, we stand as a testament to what can be achieved through dedication, 
                  expertise, and an unwavering commitment to excellence in everything we do.
                </p>
              </div>
            </div>

            <div className="slide-up">
              <h3 className="text-2xl font-serif font-semibold text-foreground mb-6">
                Key Achievements
              </h3>
              <div className="space-y-3">
                {achievements.map((achievement, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{achievement}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Mission, Vision, Values */}
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div 
                key={index} 
                className="text-center p-8 bg-card rounded-lg border border-border hover-lift slide-up"
              >
                <value.icon className="h-16 w-16 text-primary mx-auto mb-6" />
                <h3 className="text-xl font-serif font-semibold text-foreground mb-4">
                  {value.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;