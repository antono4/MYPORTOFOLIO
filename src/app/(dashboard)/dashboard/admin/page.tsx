"use client";

import { useState, useEffect } from "react";
import {
  Users,
  FileText,
  AlertTriangle,
  TrendingUp,
  Shield,
  Search,
  Ban,
  Eye,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import toast from "react-hot-toast";

interface User {
  id: string;
  email: string;
  name: string;
  subscription_tier: string;
  created_at: string;
}

interface Portfolio {
  id: string;
  user_id: string;
  slug: string;
  is_published: boolean;
  created_at: string;
}

export default function AdminPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  const stats = [
    { label: "Total Users", value: "0", icon: Users, color: "text-blue-500" },
    { label: "Active Portfolios", value: "0", icon: FileText, color: "text-green-500" },
    { label: "Flagged Content", value: "0", icon: AlertTriangle, color: "text-yellow-500" },
    { label: "Premium Users", value: "0", icon: TrendingUp, color: "text-purple-500" },
  ];

  const filteredUsers = users.filter(
    (user) =>
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSuspendUser = async (userId: string) => {
    try {
      const response = await fetch(`/api/admin/users/${userId}/suspend`, {
        method: "PUT",
      });

      if (!response.ok) throw new Error("Failed to suspend user");

      setUsers(users.map((u) => (u.id === userId ? { ...u } : u)));
      toast.success("User suspended");
    } catch (error) {
      toast.error("Failed to suspend user");
    }
  };

  const handleDeletePortfolio = async (portfolioId: string) => {
    try {
      const response = await fetch(`/api/admin/portfolios/${portfolioId}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete portfolio");

      setPortfolios(portfolios.filter((p) => p.id !== portfolioId));
      toast.success("Portfolio deleted");
    } catch (error) {
      toast.error("Failed to delete portfolio");
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="mt-1 text-gray-600 dark:text-gray-400">
            Monitor and manage the platform
          </p>
        </div>
        <Badge variant="outline" className="flex items-center gap-2 px-4 py-2">
          <Shield className="h-4 w-4" />
          Admin Access
        </Badge>
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

      {/* Users Management */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              User Management
            </CardTitle>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="pb-3 text-left text-sm font-medium text-gray-500">User</th>
                  <th className="pb-3 text-left text-sm font-medium text-gray-500">Email</th>
                  <th className="pb-3 text-left text-sm font-medium text-gray-500">Plan</th>
                  <th className="pb-3 text-left text-sm font-medium text-gray-500">Joined</th>
                  <th className="pb-3 text-right text-sm font-medium text-gray-500">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-gray-500">
                      No users found
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map((user) => (
                    <tr key={user.id} className="group">
                      <td className="py-4">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                            <span className="text-sm font-medium text-primary">
                              {user.name?.[0]?.toUpperCase() || "?"}
                            </span>
                          </div>
                          <span className="font-medium">{user.name || "Anonymous"}</span>
                        </div>
                      </td>
                      <td className="py-4 text-sm text-gray-500">{user.email}</td>
                      <td className="py-4">
                        <Badge
                          variant={user.subscription_tier === "premium" ? "default" : "outline"}
                          className={user.subscription_tier === "premium" ? "bg-secondary" : ""}
                        >
                          {user.subscription_tier}
                        </Badge>
                      </td>
                      <td className="py-4 text-sm text-gray-500">
                        {new Date(user.created_at).toLocaleDateString()}
                      </td>
                      <td className="py-4 text-right">
                        <div className="flex justify-end gap-2 opacity-0 transition-opacity group-hover:opacity-100">
                          <Button variant="ghost" size="icon" title="View details">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-red-500 hover:text-red-600"
                            title="Suspend user"
                            onClick={() => handleSuspendUser(user.id)}
                          >
                            <Ban className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Portfolio Moderation */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Portfolio Moderation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="pb-3 text-left text-sm font-medium text-gray-500">Portfolio</th>
                  <th className="pb-3 text-left text-sm font-medium text-gray-500">Status</th>
                  <th className="pb-3 text-left text-sm font-medium text-gray-500">Created</th>
                  <th className="pb-3 text-right text-sm font-medium text-gray-500">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {portfolios.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="py-8 text-center text-gray-500">
                      No portfolios to moderate
                    </td>
                  </tr>
                ) : (
                  portfolios.map((portfolio) => (
                    <tr key={portfolio.id} className="group">
                      <td className="py-4 font-medium">/{portfolio.slug}</td>
                      <td className="py-4">
                        <Badge variant={portfolio.is_published ? "default" : "outline"}>
                          {portfolio.is_published ? "Published" : "Draft"}
                        </Badge>
                      </td>
                      <td className="py-4 text-sm text-gray-500">
                        {new Date(portfolio.created_at).toLocaleDateString()}
                      </td>
                      <td className="py-4 text-right">
                        <div className="flex justify-end gap-2 opacity-0 transition-opacity group-hover:opacity-100">
                          <Button variant="ghost" size="icon" title="View">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-red-500 hover:text-red-600"
                            title="Delete"
                            onClick={() => handleDeletePortfolio(portfolio.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
