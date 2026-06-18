import { createServerSupabaseClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { MinimalTemplate } from "@/components/templates/minimal";

interface PageProps {
  params: { username: string };
}

export default async function PublicPortfolioPage({ params }: PageProps) {
  const supabase = createServerSupabaseClient();

  // Get user by username (github_username or slug)
  const { data: user } = await supabase
    .from("users")
    .select("id, name, github_username")
    .or(`github_username.eq.${params.username},name.ilike.${params.username}`)
    .single();

  if (!user) {
    notFound();
  }

  // Get user's portfolio
  const { data: portfolio } = await supabase
    .from("portfolios")
    .select("*")
    .eq("user_id", user.id)
    .single();

  if (!portfolio) {
    // Return default template with user info
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold">{user.name || user.github_username}</h1>
          <p className="mt-2 text-gray-600">Portfolio not found</p>
        </div>
      </div>
    );
  }

  // Get profile
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("user_id", user.id)
    .single();

  // Get projects
  const { data: projects } = await supabase
    .from("projects")
    .select("*")
    .eq("portfolio_id", portfolio.id)
    .order("sort_order", { ascending: true });

  // Get experiences
  const { data: experiences } = await supabase
    .from("experiences")
    .select("*")
    .eq("portfolio_id", portfolio.id)
    .order("start_date", { ascending: false });

  // Get skills
  const { data: skills } = await supabase
    .from("skills")
    .select("*")
    .eq("portfolio_id", portfolio.id)
    .order("sort_order", { ascending: true });

  // Default profile data
  const profileData = profile || {
    full_name: user.name || user.github_username || "Developer",
    title: "Software Developer",
    bio: "",
    location: "",
    email: "",
    website: "",
    linkedin_url: "",
    twitter_url: "",
    github_url: user.github_username ? `https://github.com/${user.github_username}` : "",
  };

  // Render based on template
  const template = portfolio.template || "minimal";

  switch (template) {
    case "minimal":
    default:
      return (
        <MinimalTemplate
          profile={profileData}
          projects={projects || []}
          skills={skills || []}
          experiences={experiences || []}
        />
      );
  }
}

export async function generateMetadata({ params }: PageProps) {
  const supabase = createServerSupabaseClient();

  const { data: user } = await supabase
    .from("users")
    .select("name, github_username")
    .or(`github_username.eq.${params.username},name.ilike.${params.username}`)
    .single();

  return {
    title: user?.name || user?.github_username || "Portfolio",
    description: "Developer portfolio built with PortfolioForge",
  };
}
