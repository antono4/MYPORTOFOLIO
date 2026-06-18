"use client";

import { useState } from "react";
import {
  Code2,
  ExternalLink,
  Image,
  Plus,
  Star,
  Trash2,
  X,
} from "lucide-react";
import { Github } from "@/components/ui/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import toast from "react-hot-toast";

interface Project {
  id: string;
  title: string;
  description: string;
  tech_stack: string[];
  github_url: string;
  live_url: string;
  is_featured: boolean;
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    tech_stack: "",
    github_url: "",
    live_url: "",
    is_featured: false,
  });

  const handleAddProject = () => {
    if (!newProject.title.trim()) {
      toast.error("Project title is required");
      return;
    }

    const project: Project = {
      id: Date.now().toString(),
      ...newProject,
      tech_stack: newProject.tech_stack.split(",").map((s) => s.trim()).filter(Boolean),
    };

    setProjects([...projects, project]);
    setNewProject({
      title: "",
      description: "",
      tech_stack: "",
      github_url: "",
      live_url: "",
      is_featured: false,
    });
    setIsAdding(false);
    toast.success("Project added!");
  };

  const handleDeleteProject = (id: string) => {
    setProjects(projects.filter((p) => p.id !== id));
    toast.success("Project removed");
  };

  const handleToggleFeatured = (id: string) => {
    setProjects(
      projects.map((p) =>
        p.id === id ? { ...p, is_featured: !p.is_featured } : p
      )
    );
  };

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Projects</h1>
          <p className="mt-1 text-gray-600 dark:text-gray-400">
            Showcase your best work ({projects.length}/6)
          </p>
        </div>
        {!isAdding && projects.length < 6 && (
          <Button onClick={() => setIsAdding(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Project
          </Button>
        )}
      </div>

      {/* Add Project Form */}
      {isAdding && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Add New Project</CardTitle>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsAdding(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Project Title *</Label>
                <Input
                  value={newProject.title}
                  onChange={(e) =>
                    setNewProject({ ...newProject, title: e.target.value })
                  }
                  placeholder="My Awesome Project"
                />
              </div>
              <div className="space-y-2">
                <Label>Tech Stack</Label>
                <Input
                  value={newProject.tech_stack}
                  onChange={(e) =>
                    setNewProject({ ...newProject, tech_stack: e.target.value })
                  }
                  placeholder="React, TypeScript, Node.js"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea
                value={newProject.description}
                onChange={(e) =>
                  setNewProject({ ...newProject, description: e.target.value })
                }
                placeholder="Describe what this project does..."
                className="min-h-[100px]"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>GitHub URL</Label>
                <div className="relative">
                  <Github className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <Input
                    value={newProject.github_url}
                    onChange={(e) =>
                      setNewProject({ ...newProject, github_url: e.target.value })
                    }
                    placeholder="https://github.com/username/repo"
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Live Demo URL</Label>
                <div className="relative">
                  <ExternalLink className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <Input
                    value={newProject.live_url}
                    onChange={(e) =>
                      setNewProject({ ...newProject, live_url: e.target.value })
                    }
                    placeholder="https://myproject.com"
                    className="pl-10"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="featured"
                checked={newProject.is_featured}
                onChange={(e) =>
                  setNewProject({ ...newProject, is_featured: e.target.checked })
                }
                className="h-4 w-4 rounded border-gray-300"
              />
              <Label htmlFor="featured" className="cursor-pointer">
                Mark as featured project
              </Label>
            </div>

            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setIsAdding(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddProject}>Add Project</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Projects List */}
      {projects.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16">
            <Code2 className="mb-4 h-16 w-16 text-gray-300" />
            <h3 className="mb-2 text-lg font-semibold">No projects yet</h3>
            <p className="mb-4 text-center text-gray-500">
              Add your best projects to showcase your work
            </p>
            <Button onClick={() => setIsAdding(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Add Your First Project
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {projects.map((project) => (
            <Card key={project.id} className="relative">
              {project.is_featured && (
                <div className="absolute -top-2 -right-2 rounded-full bg-yellow-500 px-3 py-1 text-xs font-medium text-white">
                  Featured
                </div>
              )}
              <CardContent className="p-6">
                <div className="mb-4 flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">{project.title}</h3>
                    <p className="mt-1 text-sm text-gray-500 line-clamp-2">
                      {project.description || "No description"}
                    </p>
                  </div>
                </div>

                {project.tech_stack.length > 0 && (
                  <div className="mb-4 flex flex-wrap gap-2">
                    {project.tech_stack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}

                <div className="flex items-center gap-2">
                  {project.github_url && (
                    <a
                      href={project.github_url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button variant="outline" size="sm">
                        <Github className="mr-1 h-4 w-4" />
                        Code
                      </Button>
                    </a>
                  )}
                  {project.live_url && (
                    <a
                      href={project.live_url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button variant="outline" size="sm">
                        <ExternalLink className="mr-1 h-4 w-4" />
                        Demo
                      </Button>
                    </a>
                  )}
                </div>

                <div className="mt-4 flex items-center justify-between border-t pt-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleToggleFeatured(project.id)}
                  >
                    <Star
                      className={`mr-1 h-4 w-4 ${
                        project.is_featured ? "fill-yellow-500 text-yellow-500" : ""
                      }`}
                    />
                    {project.is_featured ? "Unfeature" : "Feature"}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteProject(project.id)}
                    className="text-red-500 hover:text-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="mr-1 h-4 w-4" />
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
