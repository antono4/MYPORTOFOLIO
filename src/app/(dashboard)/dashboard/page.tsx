"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import {
  ArrowRight,
  Code2,
  Eye,
  Rocket,
  Sparkles,
  Star,
  TrendingUp,
  Zap,
} from "lucide-react";
import { Github } from "@/components/ui/icons";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function DashboardPage() {
  const { data: session } = useSession();

  const stats = [
    { label: "Portfolio Views", value: "0", icon: Eye, color: "text-blue-500" },
    { label: "GitHub Repos", value: "0", icon: Github, color: "text-gray-600" },
    { label: "Projects Featured", value: "0", icon: Star, color: "text-yellow-500" },
    { label: "Skills Listed", value: "0", icon: Zap, color: "text-purple-500" },
  ];

  const quickActions = [
    {
      title: "Edit Profile",
      description: "Update your personal information and bio",
      href: "/dashboard/profile",
      icon: Sparkles,
    },
    {
      title: "Add Projects",
      description: "Showcase your best work",
      href: "/dashboard/projects",
      icon: Code2,
    },
    {
      title: "Choose Template",
      description: "Pick a design that fits your style",
      href: "/dashboard/templates",
      icon: Rocket,
    },
    {
      title: "View Analytics",
      description: "Track your portfolio performance",
      href: "/dashboard/analytics",
      icon: TrendingUp,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            Welcome back, {session?.user?.name?.split(" ")[0] || "Developer"}
          </h1>
          <p className="mt-1 text-gray-600 dark:text-gray-400">
            Let&apos;s build something amazing today
          </p>
        </div>
        <div className="flex gap-3">
          <Link href="/dashboard/profile">
            <Button variant="outline">Preview Portfolio</Button>
          </Link>
          <Link href="/dashboard/templates">
            <Button>
              Customize Template
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="flex items-center gap-4 p-6">
              <div className={`rounded-lg bg-gray-100 p-3 dark:bg-gray-800 ${stat.color}`}>
                <stat.icon className="h-6 w-6" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-sm text-gray-500">{stat.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="mb-4 text-xl font-semibold">Quick Actions</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {quickActions.map((action) => (
            <Link key={action.title} href={action.href}>
              <Card className="group cursor-pointer transition-all hover:border-primary/30 hover:shadow-lg">
                <CardContent className="p-6">
                  <div className="mb-4 inline-flex rounded-lg bg-primary/10 p-3 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                    <action.icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-semibold">{action.title}</h3>
                  <p className="mt-1 text-sm text-gray-500">{action.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Getting Started Guide */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            Getting Started Guide
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="flex gap-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
                1
              </div>
              <div>
                <h4 className="font-semibold">Complete Your Profile</h4>
                <p className="mt-1 text-sm text-gray-500">
                  Add your name, bio, and social links to help visitors learn about you.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
                2
              </div>
              <div>
                <h4 className="font-semibold">Showcase Projects</h4>
                <p className="mt-1 text-sm text-gray-500">
                  Add your best work with descriptions, tech stack, and links.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
                3
              </div>
              <div>
                <h4 className="font-semibold">Deploy & Share</h4>
                <p className="mt-1 text-sm text-gray-500">
                  Choose a template, deploy with one click, and share your portfolio!
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
