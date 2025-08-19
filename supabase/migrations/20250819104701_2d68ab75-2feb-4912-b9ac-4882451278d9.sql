-- Create contact queries table
CREATE TABLE public.contact_queries (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'resolved')),
  admin_notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create news/articles table
CREATE TABLE public.news_articles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  author_name TEXT NOT NULL DEFAULT 'Admin',
  featured_image TEXT,
  published BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create portfolio items table
CREATE TABLE public.portfolio_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT,
  project_url TEXT,
  technologies TEXT[] DEFAULT '{}',
  category TEXT NOT NULL DEFAULT 'web',
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create admin profiles table
CREATE TABLE public.admin_profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  role TEXT DEFAULT 'admin' CHECK (role IN ('admin', 'super_admin')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.contact_queries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.news_articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolio_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_profiles ENABLE ROW LEVEL SECURITY;

-- Contact queries policies (public can insert, admins can view/manage)
CREATE POLICY "Anyone can submit contact queries"
ON public.contact_queries
FOR INSERT
WITH CHECK (true);

CREATE POLICY "Admins can view all contact queries"
ON public.contact_queries
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.admin_profiles
    WHERE user_id = auth.uid()
  )
);

CREATE POLICY "Admins can update contact queries"
ON public.contact_queries
FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM public.admin_profiles
    WHERE user_id = auth.uid()
  )
);

-- News articles policies (public can read published, admins can manage all)
CREATE POLICY "Anyone can view published articles"
ON public.news_articles
FOR SELECT
USING (published = true);

CREATE POLICY "Admins can view all articles"
ON public.news_articles
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.admin_profiles
    WHERE user_id = auth.uid()
  )
);

CREATE POLICY "Admins can insert articles"
ON public.news_articles
FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.admin_profiles
    WHERE user_id = auth.uid()
  )
);

CREATE POLICY "Admins can update articles"
ON public.news_articles
FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM public.admin_profiles
    WHERE user_id = auth.uid()
  )
);

CREATE POLICY "Admins can delete articles"
ON public.news_articles
FOR DELETE
USING (
  EXISTS (
    SELECT 1 FROM public.admin_profiles
    WHERE user_id = auth.uid()
  )
);

-- Portfolio items policies (public can read, admins can manage)
CREATE POLICY "Anyone can view portfolio items"
ON public.portfolio_items
FOR SELECT
USING (true);

CREATE POLICY "Admins can insert portfolio items"
ON public.portfolio_items
FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.admin_profiles
    WHERE user_id = auth.uid()
  )
);

CREATE POLICY "Admins can update portfolio items"
ON public.portfolio_items
FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM public.admin_profiles
    WHERE user_id = auth.uid()
  )
);

CREATE POLICY "Admins can delete portfolio items"
ON public.portfolio_items
FOR DELETE
USING (
  EXISTS (
    SELECT 1 FROM public.admin_profiles
    WHERE user_id = auth.uid()
  )
);

-- Admin profiles policies
CREATE POLICY "Admins can view admin profiles"
ON public.admin_profiles
FOR SELECT
USING (
  user_id = auth.uid() OR
  EXISTS (
    SELECT 1 FROM public.admin_profiles
    WHERE user_id = auth.uid() AND role = 'super_admin'
  )
);

CREATE POLICY "Super admins can insert admin profiles"
ON public.admin_profiles
FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.admin_profiles
    WHERE user_id = auth.uid() AND role = 'super_admin'
  )
);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_contact_queries_updated_at
  BEFORE UPDATE ON public.contact_queries
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_news_articles_updated_at
  BEFORE UPDATE ON public.news_articles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_portfolio_items_updated_at
  BEFORE UPDATE ON public.portfolio_items
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_admin_profiles_updated_at
  BEFORE UPDATE ON public.admin_profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Insert some sample data
INSERT INTO public.news_articles (title, excerpt, content, published) VALUES
('Welcome to Our Company', 'We are excited to announce the launch of our new website.', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', true),
('Our Latest Project Success', 'We successfully completed a major project for our client.', 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', true),
('Industry Insights 2024', 'Key trends and insights for the upcoming year.', 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.', true);

INSERT INTO public.portfolio_items (title, description, technologies, category, featured) VALUES
('E-Commerce Platform', 'A modern e-commerce solution with advanced features', ARRAY['React', 'Node.js', 'PostgreSQL'], 'web', true),
('Mobile Banking App', 'Secure mobile banking application with biometric authentication', ARRAY['React Native', 'Firebase', 'TypeScript'], 'mobile', true),
('Corporate Website', 'Professional corporate website with CMS integration', ARRAY['Next.js', 'Tailwind CSS', 'Supabase'], 'web', false),
('Data Analytics Dashboard', 'Real-time analytics dashboard for business intelligence', ARRAY['Vue.js', 'D3.js', 'Python'], 'web', false);