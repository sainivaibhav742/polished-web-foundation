import { useEffect, useRef, useState } from 'react';
import { Calendar, User, ArrowRight, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

const News = () => {
  const newsRef = useRef<HTMLDivElement>(null);
  const [expandedArticles, setExpandedArticles] = useState<number[]>([]);

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

    const fadeElements = newsRef.current?.querySelectorAll('.fade-in');
    fadeElements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const toggleArticle = (articleId: number) => {
    setExpandedArticles(prev => 
      prev.includes(articleId) 
        ? prev.filter(id => id !== articleId)
        : [...prev, articleId]
    );
  };

  const newsArticles = [
    {
      id: 1,
      title: 'Digital Transformation Trends Shaping 2024',
      excerpt: 'Explore the key digital transformation trends that are revolutionizing how businesses operate and compete in the modern marketplace.',
      fullContent: 'The digital landscape continues to evolve at an unprecedented pace, with artificial intelligence, cloud computing, and automation leading the charge. Organizations that embrace these technologies are positioning themselves for sustainable growth and competitive advantage. Our recent analysis of market trends reveals that companies investing in digital transformation are experiencing 30% higher revenue growth compared to their traditional counterparts.',
      author: 'Sarah Johnson',
      date: '2024-01-15',
      category: 'Technology',
      readTime: '5 min read'
    },
    {
      id: 2,
      title: 'Strategic Planning in Uncertain Times',
      excerpt: 'Learn how leading organizations are adapting their strategic planning processes to navigate volatility and maintain growth momentum.',
      fullContent: 'In today\'s rapidly changing business environment, traditional strategic planning approaches are being challenged. Organizations must develop more agile, responsive strategies that can adapt to unexpected market shifts. Our consultants have identified five key principles that successful companies are using to maintain strategic focus while remaining flexible enough to pivot when necessary.',
      author: 'Michael Chen',
      date: '2024-01-10',
      category: 'Strategy',
      readTime: '7 min read'
    },
    {
      id: 3,
      title: 'Sustainable Business Practices Drive Innovation',
      excerpt: 'Discover how sustainability initiatives are not just good for the planet, but are also driving innovation and competitive advantage.',
      fullContent: 'Sustainability is no longer just a corporate responsibility initiative – it\'s become a key driver of innovation and business value. Companies that integrate environmental and social considerations into their core business strategies are discovering new opportunities for growth, cost reduction, and stakeholder engagement. Our research shows that sustainable businesses are 25% more likely to outperform their peers in long-term profitability.',
      author: 'Emma Davis',
      date: '2024-01-05',
      category: 'Sustainability',
      readTime: '6 min read'
    },
    {
      id: 4,
      title: 'The Future of Remote Work and Collaboration',
      excerpt: 'Insights into how the workplace is evolving and what organizations need to do to succeed in the hybrid work environment.',
      fullContent: 'The shift to remote and hybrid work models has fundamentally changed how organizations operate. Companies that successfully navigate this transition are investing in digital collaboration tools, reimagining their office spaces, and developing new management approaches. Our analysis reveals that organizations with strong remote work capabilities are experiencing 20% higher employee satisfaction and 15% lower turnover rates.',
      author: 'David Thompson',
      date: '2023-12-28',
      category: 'Human Resources',
      readTime: '8 min read'
    }
  ];

  return (
    <section id="news" className="section-padding bg-background" ref={newsRef}>
      <div className="container-custom">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16 fade-in">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6">
              Latest News & Insights
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Stay informed with our latest industry insights, thought leadership articles, 
              and analysis of emerging business trends.
            </p>
          </div>

          {/* News Grid */}
          <div className="space-y-8">
            {newsArticles.map((article, index) => (
              <article 
                key={article.id} 
                className="group bg-card rounded-lg border border-border p-8 hover-lift fade-in transition-all duration-300 hover:border-primary/20"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                  {/* Article Content */}
                  <div className="flex-1">
                    {/* Meta Information */}
                    <div className="flex flex-wrap items-center gap-4 mb-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(article.date).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        <span>{article.author}</span>
                      </div>
                      <span className="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs">
                        {article.category}
                      </span>
                      <span>{article.readTime}</span>
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl font-serif font-semibold text-foreground mb-4 group-hover:text-primary transition-colors duration-200">
                      {article.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      {article.excerpt}
                    </p>

                    {/* Expanded Content */}
                    <div className={`overflow-hidden transition-all duration-500 ${
                      expandedArticles.includes(article.id) 
                        ? 'max-h-96 opacity-100 mb-4' 
                        : 'max-h-0 opacity-0'
                    }`}>
                      <p className="text-muted-foreground leading-relaxed">
                        {article.fullContent}
                      </p>
                    </div>

                    {/* Read More Button */}
                    <Button
                      variant="ghost"
                      className="group-hover:text-primary transition-colors duration-300 p-0 h-auto font-medium"
                      onClick={() => toggleArticle(article.id)}
                    >
                      {expandedArticles.includes(article.id) ? 'Read Less' : 'Read More'}
                      <ChevronDown className={`ml-2 h-4 w-4 transition-transform duration-300 ${
                        expandedArticles.includes(article.id) ? 'rotate-180' : ''
                      }`} />
                    </Button>
                  </div>

                  {/* Article Thumbnail */}
                  <div className="lg:w-48 lg:flex-shrink-0">
                    <div className="aspect-video lg:aspect-square w-full bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg flex items-center justify-center">
                      <div className="text-4xl font-bold text-primary/40">
                        {article.title.charAt(0).toUpperCase()}
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* News CTA */}
          <div className="text-center mt-16 fade-in">
            <div className="bg-muted/50 border border-border rounded-lg p-8 max-w-2xl mx-auto">
              <h3 className="text-2xl font-serif font-semibold text-foreground mb-4">
                Stay Updated
              </h3>
              <p className="text-muted-foreground mb-6">
                Subscribe to our newsletter to receive the latest insights and industry updates directly in your inbox.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
                <Button className="btn-professional">
                  Subscribe
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default News;