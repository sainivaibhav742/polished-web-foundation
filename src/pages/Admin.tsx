import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { User } from '@supabase/supabase-js';
import { 
  LogOut, 
  MessageSquare, 
  FileText, 
  Briefcase, 
  Eye, 
  Edit,
  Trash2,
  Plus,
  MoreHorizontal
} from 'lucide-react';

interface ContactQuery {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: string;
  admin_notes: string | null;
  created_at: string;
}

interface NewsArticle {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author_name: string;
  published: boolean;
  created_at: string;
}

interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  category: string;
  technologies: string[];
  featured: boolean;
  created_at: string;
}

const Admin = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [queries, setQueries] = useState<ContactQuery[]>([]);
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session?.user) {
      navigate('/auth');
      return;
    }

    setUser(session.user);

    // Check if user is admin
    const { data: adminProfile } = await supabase
      .from('admin_profiles')
      .select('*')
      .eq('user_id', session.user.id)
      .single();

    if (!adminProfile) {
      toast({
        title: "Access Denied",
        description: "You don't have admin privileges.",
        variant: "destructive",
      });
      navigate('/');
      return;
    }

    setIsAdmin(true);
    loadData();
    setLoading(false);
  };

  const loadData = async () => {
    // Load contact queries
    const { data: queriesData } = await supabase
      .from('contact_queries')
      .select('*')
      .order('created_at', { ascending: false });

    if (queriesData) setQueries(queriesData);

    // Load articles
    const { data: articlesData } = await supabase
      .from('news_articles')
      .select('*')
      .order('created_at', { ascending: false });

    if (articlesData) setArticles(articlesData);

    // Load portfolio items
    const { data: portfolioData } = await supabase
      .from('portfolio_items')
      .select('*')
      .order('created_at', { ascending: false });

    if (portfolioData) setPortfolioItems(portfolioData);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  const updateQueryStatus = async (id: string, status: string, notes?: string) => {
    const { error } = await supabase
      .from('contact_queries')
      .update({ status, admin_notes: notes })
      .eq('id', id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to update query status.",
        variant: "destructive",
      });
      return;
    }

    loadData();
    toast({
      title: "Updated",
      description: "Query status has been updated.",
    });
  };

  const toggleArticlePublished = async (id: string, published: boolean) => {
    const { error } = await supabase
      .from('news_articles')
      .update({ published })
      .eq('id', id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to update article status.",
        variant: "destructive",
      });
      return;
    }

    loadData();
    toast({
      title: "Updated",
      description: `Article ${published ? 'published' : 'unpublished'} successfully.`,
    });
  };

  const togglePortfolioFeatured = async (id: string, featured: boolean) => {
    const { error } = await supabase
      .from('portfolio_items')
      .update({ featured })
      .eq('id', id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to update portfolio item.",
        variant: "destructive",
      });
      return;
    }

    loadData();
    toast({
      title: "Updated",
      description: `Portfolio item ${featured ? 'featured' : 'unfeatured'} successfully.`,
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-subtle flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <header className="border-b bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Admin Dashboard</h1>
            <p className="text-muted-foreground">Welcome back, {user?.email}</p>
          </div>
          <Button onClick={handleSignOut} variant="outline" size="sm">
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Queries</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{queries.length}</div>
              <p className="text-xs text-muted-foreground">
                {queries.filter(q => q.status === 'pending').length} pending
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Published Articles</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {articles.filter(a => a.published).length}
              </div>
              <p className="text-xs text-muted-foreground">
                {articles.filter(a => !a.published).length} drafts
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Portfolio Items</CardTitle>
              <Briefcase className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{portfolioItems.length}</div>
              <p className="text-xs text-muted-foreground">
                {portfolioItems.filter(p => p.featured).length} featured
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Website</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <Button 
                onClick={() => window.open('/', '_blank')} 
                variant="outline" 
                size="sm"
                className="w-full"
              >
                View Site
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Tabs Content */}
        <Tabs defaultValue="queries" className="space-y-4">
          <TabsList>
            <TabsTrigger value="queries">Contact Queries</TabsTrigger>
            <TabsTrigger value="articles">News Articles</TabsTrigger>
            <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
          </TabsList>

          <TabsContent value="queries">
            <Card>
              <CardHeader>
                <CardTitle>Contact Queries</CardTitle>
                <CardDescription>
                  Manage and respond to customer inquiries
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Subject</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {queries.map((query) => (
                        <TableRow key={query.id}>
                          <TableCell className="font-medium">{query.name}</TableCell>
                          <TableCell>{query.email}</TableCell>
                          <TableCell className="max-w-xs truncate">{query.subject}</TableCell>
                          <TableCell>
                            <Badge 
                              variant={
                                query.status === 'resolved' ? 'default' :
                                query.status === 'in_progress' ? 'secondary' : 'outline'
                              }
                            >
                              {query.status.replace('_', ' ')}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {new Date(query.created_at).toLocaleDateString()}
                          </TableCell>
                          <TableCell>
                            <Select
                              value={query.status}
                              onValueChange={(value) => updateQueryStatus(query.id, value)}
                            >
                              <SelectTrigger className="w-32">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="in_progress">In Progress</SelectItem>
                                <SelectItem value="resolved">Resolved</SelectItem>
                              </SelectContent>
                            </Select>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="articles">
            <Card>
              <CardHeader>
                <CardTitle>News Articles</CardTitle>
                <CardDescription>
                  Manage news articles and blog posts
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Author</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {articles.map((article) => (
                        <TableRow key={article.id}>
                          <TableCell className="font-medium max-w-xs truncate">
                            {article.title}
                          </TableCell>
                          <TableCell>{article.author_name}</TableCell>
                          <TableCell>
                            <Badge variant={article.published ? 'default' : 'outline'}>
                              {article.published ? 'Published' : 'Draft'}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {new Date(article.created_at).toLocaleDateString()}
                          </TableCell>
                          <TableCell>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => toggleArticlePublished(article.id, !article.published)}
                            >
                              {article.published ? 'Unpublish' : 'Publish'}
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="portfolio">
            <Card>
              <CardHeader>
                <CardTitle>Portfolio Items</CardTitle>
                <CardDescription>
                  Manage your portfolio projects
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Technologies</TableHead>
                        <TableHead>Featured</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {portfolioItems.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell className="font-medium max-w-xs truncate">
                            {item.title}
                          </TableCell>
                          <TableCell className="capitalize">{item.category}</TableCell>
                          <TableCell>
                            <div className="flex flex-wrap gap-1 max-w-xs">
                              {item.technologies.slice(0, 2).map((tech, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {tech}
                                </Badge>
                              ))}
                              {item.technologies.length > 2 && (
                                <Badge variant="outline" className="text-xs">
                                  +{item.technologies.length - 2}
                                </Badge>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant={item.featured ? 'default' : 'outline'}>
                              {item.featured ? 'Featured' : 'Regular'}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {new Date(item.created_at).toLocaleDateString()}
                          </TableCell>
                          <TableCell>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => togglePortfolioFeatured(item.id, !item.featured)}
                            >
                              {item.featured ? 'Unfeature' : 'Feature'}
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Admin;