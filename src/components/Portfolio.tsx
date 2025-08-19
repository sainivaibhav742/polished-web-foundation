import { useEffect, useRef, useState } from 'react';
import { ExternalLink, Calendar, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Portfolio = () => {
  const portfolioRef = useRef<HTMLDivElement>(null);
  const [selectedCategory, setSelectedCategory] = useState('all');

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

    const slideElements = portfolioRef.current?.querySelectorAll('.slide-up');
    slideElements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'consulting', label: 'Consulting' },
    { id: 'finance', label: 'Finance' },
    { id: 'technology', label: 'Technology' },
    { id: 'operations', label: 'Operations' }
  ];

  const projects = [
    {
      id: 1,
      title: 'Global Manufacturing Optimization',
      category: 'consulting',
      description: 'Comprehensive operational restructuring for a Fortune 500 manufacturing company, resulting in 30% efficiency improvement.',
      image: '/api/placeholder/400/300',
      date: '2023',
      tags: ['Strategy', 'Operations', 'Manufacturing'],
      results: ['30% efficiency increase', '$2M annual savings', '6-month implementation']
    },
    {
      id: 2,
      title: 'Financial Risk Assessment Platform',
      category: 'finance',
      description: 'Development of advanced risk assessment framework for multinational investment firm with real-time monitoring capabilities.',
      image: '/api/placeholder/400/300',
      date: '2023',
      tags: ['Risk Management', 'Finance', 'Analytics'],
      results: ['50% faster risk assessment', 'Real-time monitoring', 'Regulatory compliance']
    },
    {
      id: 3,
      title: 'Digital Transformation Initiative',
      category: 'technology',
      description: 'Complete digital overhaul for traditional retail chain, including e-commerce platform and inventory management system.',
      image: '/api/placeholder/400/300',
      date: '2022',
      tags: ['Digital', 'E-commerce', 'Retail'],
      results: ['200% online sales growth', 'Integrated systems', 'Mobile-first approach']
    },
    {
      id: 4,
      title: 'Supply Chain Optimization',
      category: 'operations',
      description: 'End-to-end supply chain redesign for pharmaceutical company, improving delivery times and reducing costs.',
      image: '/api/placeholder/400/300',
      date: '2023',
      tags: ['Supply Chain', 'Logistics', 'Healthcare'],
      results: ['40% faster delivery', '25% cost reduction', 'Quality improvements']
    },
    {
      id: 5,
      title: 'Corporate Restructuring Strategy',
      category: 'consulting',
      description: 'Strategic reorganization of multinational corporation to improve efficiency and market responsiveness.',
      image: '/api/placeholder/400/300',
      date: '2022',
      tags: ['Strategy', 'Restructuring', 'Change Management'],
      results: ['Streamlined operations', 'Improved agility', 'Cost optimization']
    },
    {
      id: 6,
      title: 'Investment Portfolio Analysis',
      category: 'finance',
      description: 'Comprehensive portfolio optimization for institutional investor, balancing risk and return objectives.',
      image: '/api/placeholder/400/300',
      date: '2023',
      tags: ['Investment', 'Portfolio', 'Analytics'],
      results: ['15% return improvement', 'Risk reduction', 'Diversified holdings']
    }
  ];

  const filteredProjects = selectedCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  return (
    <section id="portfolio" className="section-padding bg-muted/30" ref={portfolioRef}>
      <div className="container-custom">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16 slide-up">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6">
              Our Portfolio
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Explore our successful projects and the measurable impact we've delivered 
              for clients across various industries and business challenges.
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12 slide-up">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                className={`transition-all duration-200 ${
                  selectedCategory === category.id 
                    ? 'bg-primary text-primary-foreground' 
                    : 'hover:bg-primary/10'
                }`}
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.label}
              </Button>
            ))}
          </div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <div 
                key={project.id} 
                className="group bg-card rounded-lg border border-border overflow-hidden hover-lift slide-up"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                {/* Project Image */}
                <div className="relative overflow-hidden h-48 bg-muted">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-4 left-4 right-4">
                      <Button
                        size="sm"
                        variant="secondary"
                        className="bg-white/90 text-black hover:bg-white"
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        View Details
                      </Button>
                    </div>
                  </div>
                  <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                    <div className="text-6xl font-bold text-primary/30">
                      {project.title.charAt(0)}
                    </div>
                  </div>
                </div>

                {/* Project Content */}
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">{project.date}</span>
                  </div>

                  <h3 className="text-xl font-serif font-semibold text-foreground mb-3 group-hover:text-primary transition-colors duration-200">
                    {project.title}
                  </h3>

                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag, tagIndex) => (
                      <span 
                        key={tagIndex}
                        className="inline-flex items-center px-2 py-1 text-xs bg-primary/10 text-primary rounded-full"
                      >
                        <Tag className="h-3 w-3 mr-1" />
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Results */}
                  <div className="space-y-1">
                    <h4 className="text-sm font-medium text-foreground mb-2">Key Results:</h4>
                    {project.results.map((result, resultIndex) => (
                      <div key={resultIndex} className="flex items-center text-sm text-muted-foreground">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2 flex-shrink-0"></div>
                        {result}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Portfolio CTA */}
          <div className="text-center mt-16 slide-up">
            <div className="bg-card border border-border rounded-lg p-8 max-w-2xl mx-auto">
              <h3 className="text-2xl font-serif font-semibold text-foreground mb-4">
                Ready to Start Your Project?
              </h3>
              <p className="text-muted-foreground mb-6">
                Let's discuss how we can help you achieve similar results for your organization.
              </p>
              <Button 
                size="lg" 
                className="btn-professional"
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
                Start Your Project
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;