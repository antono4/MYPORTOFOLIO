-- PortfolioForge Database Schema
-- Run this migration in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255),
    name VARCHAR(100),
    avatar_url TEXT,
    github_id VARCHAR(50) UNIQUE,
    github_username VARCHAR(100),
    github_token_encrypted TEXT,
    stripe_customer_id VARCHAR(100),
    subscription_tier VARCHAR(20) DEFAULT 'free' CHECK (subscription_tier IN ('free', 'premium')),
    subscription_status VARCHAR(50),
    is_admin BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Profiles table
CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
    full_name VARCHAR(100),
    title VARCHAR(100),
    bio TEXT,
    location VARCHAR(100),
    email VARCHAR(255),
    website VARCHAR(255),
    avatar_url TEXT,
    linkedin_url VARCHAR(255),
    twitter_url VARCHAR(255),
    github_url VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id)
);

-- Portfolios table
CREATE TABLE IF NOT EXISTS portfolios (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    custom_domain VARCHAR(255),
    template VARCHAR(50) DEFAULT 'minimal',
    is_published BOOLEAN DEFAULT FALSE,
    published_url TEXT,
    deployed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Projects table
CREATE TABLE IF NOT EXISTS projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    portfolio_id UUID REFERENCES portfolios(id) ON DELETE CASCADE NOT NULL,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    tech_stack JSONB DEFAULT '[]',
    github_url TEXT,
    live_url TEXT,
    screenshot_url TEXT,
    is_featured BOOLEAN DEFAULT FALSE,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Experiences table
CREATE TABLE IF NOT EXISTS experiences (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    portfolio_id UUID REFERENCES portfolios(id) ON DELETE CASCADE NOT NULL,
    company VARCHAR(200) NOT NULL,
    role VARCHAR(100),
    start_date DATE NOT NULL,
    end_date DATE,
    is_current BOOLEAN DEFAULT FALSE,
    description TEXT,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Skills table
CREATE TABLE IF NOT EXISTS skills (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    portfolio_id UUID REFERENCES portfolios(id) ON DELETE CASCADE NOT NULL,
    name VARCHAR(100) NOT NULL,
    proficiency VARCHAR(20) DEFAULT 'intermediate' CHECK (proficiency IN ('beginner', 'intermediate', 'expert')),
    category VARCHAR(50) DEFAULT 'Frontend',
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Analytics table
CREATE TABLE IF NOT EXISTS analytics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    portfolio_id UUID REFERENCES portfolios(id) ON DELETE CASCADE NOT NULL,
    visitor_id VARCHAR(100),
    page_path TEXT,
    referrer TEXT,
    country VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_github_id ON users(github_id);
CREATE INDEX IF NOT EXISTS idx_profiles_user_id ON profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_portfolios_user_id ON portfolios(user_id);
CREATE INDEX IF NOT EXISTS idx_portfolios_slug ON portfolios(slug);
CREATE INDEX IF NOT EXISTS idx_projects_portfolio_id ON projects(portfolio_id);
CREATE INDEX IF NOT EXISTS idx_experiences_portfolio_id ON experiences(portfolio_id);
CREATE INDEX IF NOT EXISTS idx_skills_portfolio_id ON skills(portfolio_id);
CREATE INDEX IF NOT EXISTS idx_analytics_portfolio_id ON analytics(portfolio_id);

-- Row Level Security (RLS) Policies

-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolios ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics ENABLE ROW LEVEL SECURITY;

-- Users policies
CREATE POLICY "Users can view their own data"
    ON users FOR SELECT
    USING (auth.uid() = id);

CREATE POLICY "Users can update their own data"
    ON users FOR UPDATE
    USING (auth.uid() = id);

-- Profiles policies
CREATE POLICY "Users can view their own profile"
    ON profiles FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile"
    ON profiles FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile"
    ON profiles FOR UPDATE
    USING (auth.uid() = user_id);

-- Portfolios policies
CREATE POLICY "Users can view their own portfolios"
    ON portfolios FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own portfolios"
    ON portfolios FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own portfolios"
    ON portfolios FOR UPDATE
    USING (auth.uid() = user_id);

CREATE POLICY "Anyone can view published portfolios"
    ON portfolios FOR SELECT
    USING (is_published = TRUE);

-- Projects policies
CREATE POLICY "Users can view their own projects"
    ON projects FOR SELECT
    USING (EXISTS (
        SELECT 1 FROM portfolios 
        WHERE portfolios.id = projects.portfolio_id 
        AND portfolios.user_id = auth.uid()
    ));

CREATE POLICY "Users can manage their own projects"
    ON projects FOR ALL
    USING (EXISTS (
        SELECT 1 FROM portfolios 
        WHERE portfolios.id = projects.portfolio_id 
        AND portfolios.user_id = auth.uid()
    ));

-- Public read access for published portfolio projects
CREATE POLICY "Anyone can view projects for published portfolios"
    ON projects FOR SELECT
    USING (EXISTS (
        SELECT 1 FROM portfolios 
        WHERE portfolios.id = projects.portfolio_id 
        AND portfolios.is_published = TRUE
    ));

-- Experiences policies
CREATE POLICY "Users can view their own experiences"
    ON experiences FOR SELECT
    USING (EXISTS (
        SELECT 1 FROM portfolios 
        WHERE portfolios.id = experiences.portfolio_id 
        AND portfolios.user_id = auth.uid()
    ));

CREATE POLICY "Users can manage their own experiences"
    ON experiences FOR ALL
    USING (EXISTS (
        SELECT 1 FROM portfolios 
        WHERE portfolios.id = experiences.portfolio_id 
        AND portfolios.user_id = auth.uid()
    ));

-- Skills policies
CREATE POLICY "Users can view their own skills"
    ON skills FOR SELECT
    USING (EXISTS (
        SELECT 1 FROM portfolios 
        WHERE portfolios.id = skills.portfolio_id 
        AND portfolios.user_id = auth.uid()
    ));

CREATE POLICY "Users can manage their own skills"
    ON skills FOR ALL
    USING (EXISTS (
        SELECT 1 FROM portfolios 
        WHERE portfolios.id = skills.portfolio_id 
        AND portfolios.user_id = auth.uid()
    ));

-- Analytics policies
CREATE POLICY "Users can view their own analytics"
    ON analytics FOR SELECT
    USING (EXISTS (
        SELECT 1 FROM portfolios 
        WHERE portfolios.id = analytics.portfolio_id 
        AND portfolios.user_id = auth.uid()
    ));

CREATE POLICY "Analytics can be inserted by anyone"
    ON analytics FOR INSERT
    WITH CHECK (TRUE);

-- Functions for automatic timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers for updated_at
CREATE TRIGGER update_users_updated_at
    BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_profiles_updated_at
    BEFORE UPDATE ON profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_portfolios_updated_at
    BEFORE UPDATE ON portfolios
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_projects_updated_at
    BEFORE UPDATE ON projects
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_experiences_updated_at
    BEFORE UPDATE ON experiences
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_skills_updated_at
    BEFORE UPDATE ON skills
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
