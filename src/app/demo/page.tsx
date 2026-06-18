'use client';

import { useState } from 'react';
import Link from 'next/link';
import { MinimalTemplate } from '@/components/templates/minimal';

const demoData = {
  profile: {
    full_name: 'Alex Johnson',
    title: 'Full Stack Developer',
    bio: 'Passionate about building scalable web applications and open source projects. 5+ years of experience in React, Node.js, and cloud infrastructure.',
    location: 'San Francisco, CA',
    email: 'alex@example.dev',
    website: 'https://alexjohnson.dev',
    linkedin_url: 'https://linkedin.com/in/alexjohnson',
    twitter_url: 'https://twitter.com/alexdev',
    github_url: 'https://github.com/alexjohnson',
  },
  projects: [
    {
      id: '1',
      title: 'DevPortfolio',
      description: 'Open source portfolio generator for developers with customizable templates and themes.',
      tech_stack: ['TypeScript', 'React', 'Next.js'],
      github_url: 'https://github.com/alexjohnson/devportfolio',
      live_url: 'https://devportfolio.dev',
    },
    {
      id: '2',
      title: 'CloudSync',
      description: 'Real-time file synchronization tool with end-to-end encryption and team collaboration.',
      tech_stack: ['Go', 'AWS', 'PostgreSQL'],
      github_url: 'https://github.com/alexjohnson/cloudsync',
      live_url: '',
    },
    {
      id: '3',
      title: 'AI-Chatbot',
      description: 'Conversational AI assistant using OpenAI GPT-4 with custom knowledge base.',
      tech_stack: ['Python', 'FastAPI', 'Redis'],
      github_url: 'https://github.com/alexjohnson/ai-chatbot',
      live_url: '',
    },
  ],
  skills: [
    { id: '1', name: 'React', proficiency: 'Expert' },
    { id: '2', name: 'Node.js', proficiency: 'Expert' },
    { id: '3', name: 'TypeScript', proficiency: 'Advanced' },
    { id: '4', name: 'PostgreSQL', proficiency: 'Advanced' },
    { id: '5', name: 'AWS', proficiency: 'Intermediate' },
    { id: '6', name: 'Docker', proficiency: 'Advanced' },
    { id: '7', name: 'GraphQL', proficiency: 'Advanced' },
    { id: '8', name: 'Python', proficiency: 'Intermediate' },
  ],
  experiences: [
    {
      id: '1',
      company: 'TechCorp',
      role: 'Senior Full Stack Developer',
      start_date: '2022-01-01',
      end_date: '',
      is_current: true,
      description: 'Leading development of customer-facing web applications serving 1M+ users.',
    },
    {
      id: '2',
      company: 'StartupXYZ',
      role: 'Full Stack Developer',
      start_date: '2020-03-01',
      end_date: '2021-12-31',
      is_current: false,
      description: 'Built microservices architecture and REST APIs.',
    },
  ],
};

const demoUser = {
  name: 'Alex Johnson',
  title: 'Full Stack Developer',
  bio: 'Passionate about building scalable web applications and open source projects.',
  avatar: 'https://images.unsplash.com/photo-1471506480208-91b3a4cc78be?w=400&h=400&fit=crop&crop=face',
  email: 'alex@example.dev',
  github: 'alexjohnson',
  twitter: 'alexdev',
  linkedin: 'alexjohnson',
  website: 'https://alexjohnson.dev',
  location: 'San Francisco, CA',
  projects: demoData.projects.map(p => ({ ...p, name: p.title, url: p.live_url || p.github_url, stars: Math.floor(Math.random() * 2000), forks: Math.floor(Math.random() * 200), language: p.tech_stack[0] })),
  skills: demoData.skills.map(s => ({ name: s.name, level: Math.floor(Math.random() * 30) + 70 })),
  stats: { repos: 42, followers: 1234, following: 89, contributions: 2847 },
};

const templates = [
  { id: 'minimal', name: 'Minimal', description: 'Clean and simple design', preview: 'bg-white text-gray-900' },
  { id: 'creative', name: 'Creative', description: 'Bold and colorful', preview: 'bg-gradient-to-br from-purple-500 to-pink-500 text-white' },
  { id: 'dark', name: 'Dark', description: 'Modern dark theme', preview: 'bg-gray-900 text-white' },
  { id: 'card', name: 'Card', description: 'Card-based layout', preview: 'bg-slate-100 text-slate-800' },
  { id: 'classic', name: 'Classic', description: 'Traditional style', preview: 'bg-amber-50 text-amber-900' },
];

export default function DemoPage() {
  const [selectedTemplate, setSelectedTemplate] = useState('minimal');

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Demo Header */}
      <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur-lg dark:border-gray-800 dark:bg-gray-900/80">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg shadow-indigo-500/25">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-white">
                <path d="m18 16 4-4-4-4"></path>
                <path d="m6 8-4 4 4 4"></path>
                <path d="m14.5 4-5 16"></path>
              </svg>
            </div>
            <span className="text-xl font-bold">PortfolioForge</span>
            <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">Demo</span>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/register"
              className="rounded-lg bg-indigo-500 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-600"
            >
              Create Your Portfolio
            </Link>
          </div>
        </div>
      </header>

      {/* Demo Controls */}
      <section className="border-b border-gray-200 bg-white py-8 dark:border-gray-800 dark:bg-gray-900">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="mb-2 text-center text-2xl font-bold">Template Demo</h2>
          <p className="mb-6 text-center text-gray-500">Click on a template to preview how your portfolio will look</p>
          <div className="flex flex-wrap justify-center gap-4">
            {templates.map((template) => (
              <button
                key={template.id}
                onClick={() => setSelectedTemplate(template.id)}
                className={`rounded-lg border-2 p-4 transition-all ${
                  selectedTemplate === template.id
                    ? 'border-indigo-500 ring-2 ring-indigo-500 ring-offset-2'
                    : 'border-gray-200 hover:border-gray-300 dark:border-gray-700'
                }`}
              >
                <div className={`mb-2 h-16 w-24 rounded ${template.preview}`}>
                  <div className="flex h-full items-center justify-center text-xs font-bold">
                    {template.name}
                  </div>
                </div>
                <p className="text-sm font-medium">{template.name}</p>
                <p className="text-xs text-gray-500">{template.description}</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Live Preview */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4">
          <div className="rounded-2xl border-4 border-dashed border-indigo-200 p-2 dark:border-indigo-800">
            <div className="overflow-hidden rounded-xl bg-white shadow-2xl">
              {selectedTemplate === 'minimal' && <MinimalTemplate {...demoData} />}
              {selectedTemplate === 'creative' && <CreativeTemplate user={demoUser} />}
              {selectedTemplate === 'dark' && <DarkTemplate user={demoUser} />}
              {selectedTemplate === 'card' && <CardTemplate user={demoUser} />}
              {selectedTemplate === 'classic' && <ClassicTemplate user={demoUser} />}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-indigo-600 py-16">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h2 className="mb-4 text-3xl font-bold text-white">Ready to Create Your Own?</h2>
          <p className="mb-8 text-lg text-indigo-100">
            Join thousands of developers who&apos;ve built stunning portfolios with PortfolioForge.
          </p>
          <Link
            href="/register"
            className="inline-flex items-center gap-2 rounded-xl bg-white px-8 py-4 text-lg font-semibold text-indigo-600 hover:bg-indigo-50"
          >
            Start Building Free
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
              <path d="M5 12h14"></path>
              <path d="m12 5 7 7-7 7"></path>
            </svg>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-8 dark:border-gray-800">
        <div className="mx-auto max-w-7xl px-4 text-center text-sm text-gray-500">
          © 2024 PortfolioForge. Built for developers.
        </div>
      </footer>
    </div>
  );
}

function CreativeTemplate({ user }: { user: typeof demoUser }) {
  return (
    <div className="min-h-[600px] bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 p-8 text-white">
      <div className="mx-auto max-w-4xl">
        <div className="flex items-center gap-6">
          <img src={user.avatar} alt={user.name} className="h-32 w-32 rounded-full border-4 border-white shadow-xl" />
          <div>
            <h1 className="text-4xl font-bold">{user.name}</h1>
            <p className="text-xl text-white/80">{user.title}</p>
            <div className="mt-2 flex flex-wrap gap-2">
              <span className="rounded-full bg-white/20 px-3 py-1 text-sm">📍 {user.location}</span>
              <span className="rounded-full bg-white/20 px-3 py-1 text-sm">📧 {user.email}</span>
            </div>
          </div>
        </div>
        <p className="mt-6 text-lg text-white/90">{user.bio}</p>
        <div className="mt-8 grid grid-cols-4 gap-4">
          {user.stats && Object.entries(user.stats).map(([key, value]) => (
            <div key={key} className="rounded-xl bg-white/10 p-4 text-center backdrop-blur">
              <div className="text-3xl font-bold">{value as number}</div>
              <div className="text-sm capitalize text-white/70">{key}</div>
            </div>
          ))}
        </div>
        <h2 className="mt-8 text-xl font-bold">Top Projects</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {user.projects?.slice(0, 2).map((project) => (
            <div key={project.id} className="rounded-xl bg-white/10 p-4 backdrop-blur">
              <h3 className="font-bold">{project.name}</h3>
              <p className="mt-1 text-sm text-white/80">{project.description}</p>
              <div className="mt-2 flex gap-4 text-sm">
                <span>⭐ {project.stars}</span>
                <span>🍴 {project.forks}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function DarkTemplate({ user }: { user: typeof demoUser }) {
  return (
    <div className="min-h-[600px] bg-gray-900 p-8 text-white">
      <div className="mx-auto max-w-4xl">
        <div className="flex items-center gap-6 border-b border-gray-700 pb-8">
          <img src={user.avatar} alt={user.name} className="h-24 w-24 rounded-full border-2 border-indigo-500" />
          <div>
            <h1 className="text-3xl font-bold">{user.name}</h1>
            <p className="text-indigo-400">{user.title}</p>
            <p className="mt-2 text-gray-400">{user.location}</p>
          </div>
        </div>
        <div className="mt-8 grid grid-cols-4 gap-6">
          {user.stats && Object.entries(user.stats).map(([key, value]) => (
            <div key={key} className="text-center">
              <div className="text-2xl font-bold text-indigo-400">{value as number}</div>
              <div className="text-sm capitalize text-gray-500">{key}</div>
            </div>
          ))}
        </div>
        <h2 className="mt-8 text-xl font-bold">Skills</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {user.skills?.map((skill) => (
            <span key={skill.name} className="rounded-full bg-gray-800 px-3 py-1 text-sm text-gray-300">
              {skill.name}
            </span>
          ))}
        </div>
        <h2 className="mt-8 text-xl font-bold">Projects</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {user.projects?.slice(0, 2).map((project) => (
            <div key={project.id} className="rounded-lg bg-gray-800 p-4">
              <h3 className="font-bold">{project.name}</h3>
              <p className="mt-1 text-sm text-gray-400">{project.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function CardTemplate({ user }: { user: typeof demoUser }) {
  return (
    <div className="min-h-[600px] bg-slate-100 p-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 flex items-center gap-6">
          <img src={user.avatar} alt={user.name} className="h-24 w-24 rounded-2xl shadow-lg" />
          <div>
            <h1 className="text-2xl font-bold text-slate-900">{user.name}</h1>
            <p className="text-slate-600">{user.title}</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {user.stats && Object.entries(user.stats).map(([key, value]) => (
            <div key={key} className="rounded-xl bg-white p-4 shadow">
              <div className="text-2xl font-bold text-indigo-600">{value as number}</div>
              <div className="text-sm capitalize text-slate-500">{key}</div>
            </div>
          ))}
        </div>
        <h2 className="mt-8 text-xl font-bold">Featured Projects</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {user.projects?.slice(0, 2).map((project) => (
            <div key={project.id} className="rounded-xl bg-white p-4 shadow">
              <h3 className="font-bold">{project.name}</h3>
              <p className="mt-1 text-sm text-slate-600">{project.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ClassicTemplate({ user }: { user: typeof demoUser }) {
  return (
    <div className="min-h-[600px] bg-amber-50 p-8">
      <div className="mx-auto max-w-3xl">
        <div className="border-b-4 border-amber-900 pb-4">
          <h1 className="text-4xl font-bold text-amber-900">{user.name}</h1>
          <p className="mt-2 text-xl text-amber-700">{user.title}</p>
        </div>
        <div className="mt-6 flex gap-8">
          <div className="flex-1">
            <h2 className="text-lg font-bold text-amber-900">About</h2>
            <p className="mt-2 text-amber-800">{user.bio}</p>
          </div>
          <div className="w-48">
            <h2 className="text-lg font-bold text-amber-900">Contact</h2>
            <p className="mt-2 text-amber-800">{user.email}</p>
            <p className="text-amber-800">{user.location}</p>
          </div>
        </div>
        <div className="mt-8 grid grid-cols-4 gap-4 border-t-2 border-amber-900 pt-4">
          {user.stats && Object.entries(user.stats).map(([key, value]) => (
            <div key={key} className="text-center">
              <div className="text-2xl font-bold text-amber-900">{value as number}</div>
              <div className="text-sm capitalize text-amber-700">{key}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
