import { ExternalLink, Globe } from "lucide-react";
import { Github, Linkedin, Twitter } from "@/components/ui/icons";

interface MinimalTemplateProps {
  profile: {
    full_name: string;
    title: string;
    bio: string;
    location: string;
    email: string;
    website: string;
    linkedin_url: string;
    twitter_url: string;
    github_url: string;
  };
  projects: Array<{
    id: string;
    title: string;
    description: string;
    tech_stack: string[];
    github_url: string;
    live_url: string;
  }>;
  skills: Array<{
    id: string;
    name: string;
    proficiency: string;
  }>;
  experiences: Array<{
    id: string;
    company: string;
    role: string;
    start_date: string;
    end_date: string;
    is_current: boolean;
    description: string;
  }>;
}

export function MinimalTemplate({ profile, projects, skills, experiences }: MinimalTemplateProps) {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-100 py-20">
        <div className="mx-auto max-w-4xl px-4">
          <h1 className="text-4xl font-bold text-gray-900">{profile.full_name || "Your Name"}</h1>
          <p className="mt-2 text-xl text-gray-600">{profile.title || "Developer"}</p>
          <p className="mt-4 max-w-2xl text-gray-600">{profile.bio || "Welcome to my portfolio!"}</p>
          
          <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-gray-500">
            {profile.location && <span>{profile.location}</span>}
            {profile.email && <a href={`mailto:${profile.email}`} className="hover:text-primary">{profile.email}</a>}
          </div>

          <div className="mt-6 flex gap-4">
            {profile.github_url && (
              <a href={profile.github_url} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900">
                <Github className="h-5 w-5" />
              </a>
            )}
            {profile.linkedin_url && (
              <a href={profile.linkedin_url} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-600">
                <Linkedin className="h-5 w-5" />
              </a>
            )}
            {profile.twitter_url && (
              <a href={profile.twitter_url} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-400">
                <Twitter className="h-5 w-5" />
              </a>
            )}
            {profile.website && (
              <a href={profile.website} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-primary">
                <Globe className="h-5 w-5" />
              </a>
            )}
          </div>
        </div>
      </header>

      {/* Experience */}
      {experiences.length > 0 && (
        <section className="py-16">
          <div className="mx-auto max-w-4xl px-4">
            <h2 className="mb-8 text-2xl font-bold text-gray-900">Experience</h2>
            <div className="space-y-8">
              {experiences.map((exp) => (
                <div key={exp.id}>
                  <h3 className="text-lg font-semibold text-gray-900">{exp.role}</h3>
                  <p className="text-gray-600">{exp.company}</p>
                  <p className="mt-1 text-sm text-gray-500">
                    {new Date(exp.start_date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })} - 
                    {exp.is_current ? ' Present' : exp.end_date ? ` ${new Date(exp.end_date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}` : ''}
                  </p>
                  {exp.description && <p className="mt-2 text-gray-600">{exp.description}</p>}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <section className="border-t border-gray-100 py-16">
          <div className="mx-auto max-w-4xl px-4">
            <h2 className="mb-8 text-2xl font-bold text-gray-900">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span key={skill.id} className="rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700">
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <section className="border-t border-gray-100 py-16">
          <div className="mx-auto max-w-4xl px-4">
            <h2 className="mb-8 text-2xl font-bold text-gray-900">Projects</h2>
            <div className="grid gap-8 md:grid-cols-2">
              {projects.map((project) => (
                <div key={project.id} className="rounded-xl border border-gray-100 p-6 hover:border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">{project.title}</h3>
                  <p className="mt-2 text-gray-600">{project.description}</p>
                  {project.tech_stack.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {project.tech_stack.map((tech) => (
                        <span key={tech} className="rounded bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                  <div className="mt-4 flex gap-4">
                    {project.github_url && (
                      <a href={project.github_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900">
                        <Github className="h-4 w-4" /> Code
                      </a>
                    )}
                    {project.live_url && (
                      <a href={project.live_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-sm text-gray-600 hover:text-primary">
                        <ExternalLink className="h-4 w-4" /> Demo
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="border-t border-gray-100 py-8">
        <div className="mx-auto max-w-4xl px-4 text-center text-sm text-gray-500">
          <p>Built with PortfolioForge</p>
        </div>
      </footer>
    </div>
  );
}
