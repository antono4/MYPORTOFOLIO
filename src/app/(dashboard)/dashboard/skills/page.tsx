"use client";

import { useState } from "react";
import { Plus, X, Trash2, GripVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { skillCategories, proficiencyLevels } from "@/lib/utils";
import toast from "react-hot-toast";

interface Skill {
  id: string;
  name: string;
  proficiency: "beginner" | "intermediate" | "expert";
  category: string;
}

export default function SkillsPage() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [newSkill, setNewSkill] = useState({
    name: "",
    proficiency: "intermediate" as Skill["proficiency"],
    category: "Frontend",
  });

  const handleAddSkill = () => {
    if (!newSkill.name.trim()) {
      toast.error("Skill name is required");
      return;
    }

    if (skills.length >= 20) {
      toast.error("Maximum 20 skills allowed");
      return;
    }

    const skill: Skill = {
      id: Date.now().toString(),
      ...newSkill,
    };

    setSkills([...skills, skill]);
    setNewSkill({
      name: "",
      proficiency: "intermediate",
      category: "Frontend",
    });
    setIsAdding(false);
    toast.success("Skill added!");
  };

  const handleDeleteSkill = (id: string) => {
    setSkills(skills.filter((s) => s.id !== id));
    toast.success("Skill removed");
  };

  const getProficiencyColor = (level: string) => {
    switch (level) {
      case "expert":
        return "bg-emerald-100 text-emerald-700 border-emerald-200";
      case "intermediate":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "beginner":
        return "bg-gray-100 text-gray-700 border-gray-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getProficiencyBar = (level: string) => {
    switch (level) {
      case "expert":
        return "w-full bg-emerald-500";
      case "intermediate":
        return "w-2/3 bg-blue-500";
      case "beginner":
        return "w-1/3 bg-gray-500";
      default:
        return "w-0";
    }
  };

  const groupedSkills = skillCategories.reduce((acc, category) => {
    acc[category] = skills.filter((s) => s.category === category);
    return acc;
  }, {} as Record<string, Skill[]>);

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Skills</h1>
          <p className="mt-1 text-gray-600 dark:text-gray-400">
            Showcase your technical expertise ({skills.length}/20)
          </p>
        </div>
        {!isAdding && skills.length < 20 && (
          <Button onClick={() => setIsAdding(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Skill
          </Button>
        )}
      </div>

      {/* Add Skill Form */}
      {isAdding && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Add New Skill</CardTitle>
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
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="space-y-2 sm:col-span-2">
                <Label>Skill Name</Label>
                <Input
                  value={newSkill.name}
                  onChange={(e) =>
                    setNewSkill({ ...newSkill, name: e.target.value })
                  }
                  placeholder="e.g., React, Python, AWS"
                />
              </div>
              <div className="space-y-2">
                <Label>Category</Label>
                <Select
                  value={newSkill.category}
                  onValueChange={(value) =>
                    setNewSkill({ ...newSkill, category: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {skillCategories.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Proficiency Level</Label>
              <Select
                value={newSkill.proficiency}
                onValueChange={(value) =>
                  setNewSkill({ ...newSkill, proficiency: value as Skill["proficiency"] })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {proficiencyLevels.map((level) => (
                    <SelectItem key={level.value} value={level.value}>
                      {level.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setIsAdding(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddSkill}>Add Skill</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Skills by Category */}
      {skills.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16">
            <div className="mb-4 text-6xl">🎯</div>
            <h3 className="mb-2 text-lg font-semibold">No skills added</h3>
            <p className="mb-4 text-center text-gray-500">
              Add your technical skills to showcase your expertise
            </p>
            <Button onClick={() => setIsAdding(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Add Your First Skill
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {skillCategories.map((category) => {
            const categorySkills = groupedSkills[category];
            if (categorySkills.length === 0) return null;

            return (
              <Card key={category}>
                <CardHeader>
                  <CardTitle>{category}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-3">
                    {categorySkills.map((skill) => (
                      <div
                        key={skill.id}
                        className={`flex items-center gap-2 rounded-full border px-4 py-2 ${getProficiencyColor(
                          skill.proficiency
                        )}`}
                      >
                        <GripVertical className="h-4 w-4 cursor-pointer text-gray-400" />
                        <span className="font-medium">{skill.name}</span>
                        <span className="text-xs opacity-75">
                          ({skill.proficiency})
                        </span>
                        <button
                          onClick={() => handleDeleteSkill(skill.id)}
                          className="ml-1 hover:text-red-600"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
