import { Mail, Phone, MapPin, Linkedin, Twitter, Facebook } from 'lucide-react';

const Footer = () => {
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

  const footerLinks = {
    company: [
      { label: 'About Us', id: 'about' },
      { label: 'Our Services', id: 'services' },
      { label: 'Portfolio', id: 'portfolio' },
      { label: 'News & Insights', id: 'news' },
    ],
    services: [
      { label: 'Business Consulting', href: '#' },
      { label: 'Financial Advisory', href: '#' },
      { label: 'Risk Management', href: '#' },
      { label: 'Digital Transformation', href: '#' },
    ],
    resources: [
      { label: 'Case Studies', href: '#' },
      { label: 'White Papers', href: '#' },
      { label: 'Industry Reports', href: '#' },
      { label: 'Best Practices', href: '#' },
    ]
  };

  const contactInfo = [
    {
      icon: Phone,
      label: '+1 (555) 123-4567',
      href: 'tel:+15551234567'
    },
    {
      icon: Mail,
      label: 'contact@procorp.com',
      href: 'mailto:contact@procorp.com'
    },
    {
      icon: MapPin,
      label: '123 Business Ave, Suite 100\nNew York, NY 10001',
      href: '#'
    }
  ];

  const socialLinks = [
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Facebook, href: '#', label: 'Facebook' },
  ];

  return (
    <footer id="contact" className="bg-card border-t border-border">
      {/* Main Footer Content */}
      <div className="section-padding">
        <div className="container-custom">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
              {/* Company Info */}
              <div className="lg:col-span-1">
                <div className="mb-6">
                  <h3 className="text-2xl font-serif font-bold text-primary mb-4">
                    ProCorp
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    Professional excellence delivered daily. We provide comprehensive 
                    business solutions with a commitment to quality and innovation.
                  </p>
                </div>
                
                {/* Social Links */}
                <div className="flex space-x-4">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      aria-label={social.label}
                      className="w-10 h-10 bg-muted rounded-full flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-200"
                    >
                      <social.icon className="h-5 w-5" />
                    </a>
                  ))}
                </div>
              </div>

              {/* Company Links */}
              <div>
                <h4 className="text-lg font-serif font-semibold text-foreground mb-6">
                  Company
                </h4>
                <ul className="space-y-3">
                  {footerLinks.company.map((link, index) => (
                    <li key={index}>
                      <button
                        onClick={() => scrollToSection(link.id)}
                        className="text-muted-foreground hover:text-primary transition-colors duration-200 text-left"
                      >
                        {link.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Services Links */}
              <div>
                <h4 className="text-lg font-serif font-semibold text-foreground mb-6">
                  Services
                </h4>
                <ul className="space-y-3">
                  {footerLinks.services.map((link, index) => (
                    <li key={index}>
                      <a
                        href={link.href}
                        className="text-muted-foreground hover:text-primary transition-colors duration-200"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact Info */}
              <div>
                <h4 className="text-lg font-serif font-semibold text-foreground mb-6">
                  Contact Us
                </h4>
                <ul className="space-y-4">
                  {contactInfo.map((contact, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <contact.icon className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <a
                        href={contact.href}
                        className="text-muted-foreground hover:text-primary transition-colors duration-200 whitespace-pre-line"
                      >
                        {contact.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Newsletter Subscription */}
            <div className="border-t border-border pt-8 mb-8">
              <div className="max-w-md mx-auto text-center">
                <h4 className="text-lg font-serif font-semibold text-foreground mb-4">
                  Stay Connected
                </h4>
                <p className="text-muted-foreground mb-6">
                  Subscribe to our newsletter for latest updates and insights.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                  <button className="btn-professional whitespace-nowrap">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-border py-6">
        <div className="container-custom">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="text-sm text-muted-foreground">
                © {new Date().getFullYear()} ProCorp. All rights reserved.
              </div>
              <div className="flex flex-wrap gap-6 text-sm">
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors duration-200">
                  Privacy Policy
                </a>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors duration-200">
                  Terms of Service
                </a>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors duration-200">
                  Cookie Policy
                </a>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors duration-200">
                  Accessibility
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;