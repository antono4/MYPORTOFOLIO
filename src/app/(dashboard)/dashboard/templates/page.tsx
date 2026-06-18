"use client";

import { useState } from "react";
import { Check, Palette, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import toast from "react-hot-toast";

const templates = [
  {
    id: "minimal",
    name: "Minimal",
    description: "Clean and simple design focused on content",
    color: "bg-white",
    features: ["Clean typography", "Minimal distractions", "Fast loading"],
  },
  {
    id: "creative",
    name: "Creative",
    description: "Bold and expressive layout for creative developers",
    color: "bg-gradient-to-br from-purple-500 to-pink-500",
    features: ["Bold colors", "Animated elements", "Modern look"],
  },
  {
    id: "dark",
    name: "Dark Mode",
    description: "Sleek dark theme for the night owls",
    color: "bg-gray-900",
    features: ["Easy on eyes", "High contrast", "Tech aesthetic"],
  },
  {
    id: "card",
    name: "Card Based",
    description: "Modern card layout for showcasing projects",
    color: "bg-slate-100",
    features: ["Project cards", "Grid layout", "Visual emphasis"],
  },
  {
    id: "classic",
    name: "Classic",
    description: "Traditional professional portfolio layout",
    color: "bg-blue-50",
    features: ["Professional", "Organized sections", "Conservative"],
  },
];

export default function TemplatesPage() {
  const [selectedTemplate, setSelectedTemplate] = useState("minimal");
  const [isApplying, setIsApplying] = useState(false);

  const handleApplyTemplate = async () => {
    setIsApplying(true);
    try {
      const response = await fetch("/api/user/template", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ template: selectedTemplate }),
      });

      if (!response.ok) throw new Error("Failed to save template");

      toast.success("Template applied successfully!");
    } catch (error) {
      toast.error("Failed to apply template");
    } finally {
      setIsApplying(false);
    }
  };

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Choose a Template</h1>
        <p className="mt-1 text-gray-600 dark:text-gray-400">
          Pick a design that best represents your style
        </p>
      </div>

      {/* Template Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {templates.map((template) => (
          <Card
            key={template.id}
            className={`cursor-pointer transition-all hover:shadow-lg ${
              selectedTemplate === template.id
                ? "ring-2 ring-primary"
                : ""
            }`}
            onClick={() => setSelectedTemplate(template.id)}
          >
            {/* Preview Area */}
            <div className={`h-48 ${template.color} relative`}>
              <div className="absolute inset-0 flex flex-col p-4">
                <div className="mb-2 h-6 w-20 rounded bg-gray-300 dark:bg-gray-700" />
                <div className="mb-4 h-2 w-32 rounded bg-gray-200 dark:bg-gray-600" />
                <div className="mt-auto flex gap-2">
                  <div className="h-16 flex-1 rounded bg-gray-200 dark:bg-gray-700" />
                  <div className="h-16 flex-1 rounded bg-gray-200 dark:bg-gray-700" />
                </div>
              </div>
              {selectedTemplate === template.id && (
                <div className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-white">
                  <Check className="h-4 w-4" />
                </div>
              )}
            </div>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-4 w-4 text-primary" />
                {template.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                {template.description}
              </p>
              <ul className="space-y-1">
                {template.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center gap-2 text-xs text-gray-500"
                  >
                    <Check className="h-3 w-3 text-secondary" />
                    {feature}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between rounded-lg border bg-gray-50 p-4 dark:bg-gray-800">
        <div>
          <p className="font-medium">
            Selected:{" "}
            <span className="text-primary">
              {templates.find((t) => t.id === selectedTemplate)?.name}
            </span>
          </p>
          <p className="text-sm text-gray-500">
            {templates.find((t) => t.id === selectedTemplate)?.description}
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Eye className="mr-2 h-4 w-4" />
            Preview
          </Button>
          <Button onClick={handleApplyTemplate} loading={isApplying}>
            Apply Template
          </Button>
        </div>
      </div>
    </div>
  );
}
