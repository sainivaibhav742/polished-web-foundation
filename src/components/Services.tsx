import { useEffect, useRef } from 'react';
import { 
  Briefcase, 
  TrendingUp, 
  Shield, 
  Users, 
  Settings, 
  Globe,
  ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const Services = () => {
  const servicesRef = useRef<HTMLDivElement>(null);

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

    const fadeElements = servicesRef.current?.querySelectorAll('.fade-in');
    fadeElements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const services = [
    {
      icon: Briefcase,
      title: 'Business Consulting',
      description: 'Strategic planning and business optimization services to help your organization achieve sustainable growth and competitive advantage.',
      features: ['Strategic Planning', 'Process Optimization', 'Market Analysis', 'Growth Strategy']
    },
    {
      icon: TrendingUp,
      title: 'Financial Advisory',
      description: 'Comprehensive financial services including investment planning, risk management, and performance optimization for sustainable success.',
      features: ['Investment Planning', 'Risk Assessment', 'Financial Analysis', 'Portfolio Management']
    },
    {
      icon: Shield,
      title: 'Risk Management',
      description: 'Identify, assess, and mitigate business risks with our comprehensive risk management solutions and compliance frameworks.',
      features: ['Risk Assessment', 'Compliance Audits', 'Security Planning', 'Crisis Management']
    },
    {
      icon: Users,
      title: 'Human Resources',
      description: 'Complete HR solutions from talent acquisition to employee development, performance management, and organizational culture building.',
      features: ['Talent Acquisition', 'Performance Management', 'Training Programs', 'Culture Development']
    },
    {
      icon: Settings,
      title: 'Operations Management',
      description: 'Streamline your operations with our expertise in process improvement, quality management, and operational excellence frameworks.',
      features: ['Process Improvement', 'Quality Management', 'Supply Chain', 'Operational Excellence']
    },
    {
      icon: Globe,
      title: 'Digital Transformation',
      description: 'Navigate the digital landscape with our comprehensive transformation services, technology integration, and digital strategy development.',
      features: ['Digital Strategy', 'Technology Integration', 'Change Management', 'Innovation Labs']
    }
  ];

  return (
    <section id="services" className="section-padding bg-background" ref={servicesRef}>
      <div className="container-custom">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16 fade-in">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6">
              Our Services
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              We offer a comprehensive suite of professional services designed to help 
              your business thrive in today's competitive marketplace.
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {services.map((service, index) => (
              <div 
                key={index} 
                className="group p-8 bg-card rounded-lg border border-border hover-lift fade-in transition-all duration-300 hover:border-primary/20"
              >
                <service.icon className="h-12 w-12 text-primary mb-6 group-hover:scale-110 transition-transform duration-300" />
                
                <h3 className="text-xl font-serif font-semibold text-foreground mb-4">
                  {service.title}
                </h3>
                
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {service.description}
                </p>
                
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mr-3 flex-shrink-0"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <Button 
                  variant="ghost" 
                  className="group-hover:text-primary transition-colors duration-300 p-0 h-auto font-medium"
                >
                  Learn More
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="text-center fade-in">
            <div className="bg-primary/5 border border-primary/10 rounded-lg p-8 max-w-4xl mx-auto">
              <h3 className="text-2xl font-serif font-semibold text-foreground mb-4">
                Ready to Transform Your Business?
              </h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Contact us today to discuss how our professional services can help 
                your organization achieve its goals and unlock its full potential.
              </p>
              <Button 
                size="lg" 
                className="btn-professional text-lg px-8 py-4 h-auto"
                onClick={() => {
                  const element = document.getElementById('contact');
                  if (element) {
                    const headerOffset = 80;
                    const elementPosition = element.offsetTop - headerOffset;
                    window.scrollTo({
                      top: elementPosition,
                      behavior: 'smooth'
                    });
                  }
                }}
              >
                Get Started Today
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;