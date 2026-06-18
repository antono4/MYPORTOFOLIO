import Link from "next/link";
import {
  ArrowRight,
  Code2,
  Palette,
  Rocket,
  Shield,
  Sparkles,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-gray-100 bg-white/80 backdrop-blur-lg dark:border-gray-800 dark:bg-gray-900/80">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/70 shadow-lg shadow-primary/25">
              <Code2 className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold">PortfolioForge</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost" size="sm">
                Log in
              </Button>
            </Link>
            <Link href="/register">
              <Button size="sm">Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
            <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-secondary/10 blur-3xl" />
          </div>
          
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
              <Sparkles className="h-4 w-4" />
              AI-Powered Portfolio Generator
            </div>
            
            <h1 className="mb-6 text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
              Build Your Developer{" "}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Portfolio
              </span>{" "}
              in Minutes
            </h1>
            
            <p className="mx-auto mb-10 max-w-2xl text-xl text-gray-600 dark:text-gray-400">
              Stop spending weeks building your portfolio. Import your GitHub,
              pick a template, and deploy a stunning developer portfolio in under 5 minutes.
            </p>
            
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/register">
                <Button size="lg" className="gap-2">
                  Start Building Free
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Link href="/demo">
                <Button variant="outline" size="lg">
                  View Demo
                </Button>
              </Link>
            </div>

            <p className="mt-4 text-sm text-gray-500">
              No credit card required • Free tier available • 5 templates
            </p>
          </div>

          {/* Hero Image */}
          <div className="mt-16 rounded-2xl border border-gray-200 bg-white p-2 shadow-2xl dark:border-gray-800 dark:bg-gray-800">
            <div className="overflow-hidden rounded-xl bg-gradient-to-br from-gray-100 to-gray-50 dark:from-gray-700 dark:to-gray-800">
              <div className="flex gap-1 p-3">
                <div className="h-3 w-3 rounded-full bg-red-500" />
                <div className="h-3 w-3 rounded-full bg-yellow-500" />
                <div className="h-3 w-3 rounded-full bg-green-500" />
              </div>
              <div className="aspect-[16/9] bg-gradient-to-br from-primary/20 via-secondary/20 to-primary/10 p-8">
                <div className="grid h-full grid-cols-3 gap-4">
                  <div className="rounded-lg bg-white/80 p-4 shadow-sm dark:bg-gray-900/80">
                    <div className="mb-2 h-8 w-8 rounded-full bg-primary/20" />
                    <div className="h-3 w-24 rounded bg-gray-300 dark:bg-gray-600" />
                    <div className="mt-2 h-2 w-16 rounded bg-gray-200 dark:bg-gray-700" />
                  </div>
                  <div className="rounded-lg bg-white/80 p-4 shadow-sm dark:bg-gray-900/80">
                    <div className="mb-2 h-8 w-8 rounded-full bg-secondary/20" />
                    <div className="h-3 w-20 rounded bg-gray-300 dark:bg-gray-600" />
                    <div className="mt-2 h-2 w-12 rounded bg-gray-200 dark:bg-gray-700" />
                  </div>
                  <div className="rounded-lg bg-white/80 p-4 shadow-sm dark:bg-gray-900/80">
                    <div className="mb-2 h-8 w-8 rounded-full bg-primary/20" />
                    <div className="h-3 w-28 rounded bg-gray-300 dark:bg-gray-600" />
                    <div className="mt-2 h-2 w-20 rounded bg-gray-200 dark:bg-gray-700" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
              Everything You Need to Stand Out
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Powerful features designed specifically for developers who want to
              showcase their work professionally.
            </p>
          </div>

          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: <Zap className="h-6 w-6" />,
                title: "GitHub Import",
                description:
                  "Automatically import your repositories, contributions, and profile data from GitHub.",
              },
              {
                icon: <Palette className="h-6 w-6" />,
                title: "5 Beautiful Templates",
                description:
                  "Choose from minimal, creative, dark, card-based, and classic designs.",
              },
              {
                icon: <Rocket className="h-6 w-6" />,
                title: "One-Click Deploy",
                description:
                  "Publish your portfolio to a custom domain with automatic SSL.",
              },
              {
                icon: <Code2 className="h-6 w-6" />,
                title: "Code-First Design",
                description:
                  "Built with Next.js and Tailwind CSS for lightning-fast performance.",
              },
              {
                icon: <Shield className="h-6 w-6" />,
                title: "Analytics Built-in",
                description:
                  "Track visitors, views, and referrals with your integrated analytics.",
              },
              {
                icon: <Sparkles className="h-6 w-6" />,
                title: "AI Suggestions",
                description:
                  "Get smart suggestions to improve your portfolio content.",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="group rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 dark:border-gray-800 dark:bg-gray-800"
              >
                <div className="mb-4 inline-flex rounded-lg bg-primary/10 p-3 text-primary">
                  {feature.icon}
                </div>
                <h3 className="mb-2 text-xl font-semibold">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
              Simple, Transparent Pricing
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Start free, upgrade when you&apos;re ready to go pro.
            </p>
          </div>

          <div className="mt-12 grid gap-8 lg:grid-cols-2 lg:px-16">
            {/* Free Tier */}
            <div className="rounded-2xl border-2 border-gray-200 bg-white p-8 dark:border-gray-800 dark:bg-gray-800">
              <div className="mb-4">
                <h3 className="text-2xl font-bold">Free</h3>
                <p className="mt-2 text-4xl font-bold">$0</p>
                <p className="text-gray-500">forever</p>
              </div>
              <ul className="mb-8 space-y-3">
                {[
                  "1 Portfolio website",
                  "5 Templates",
                  "GitHub import",
                  "Basic analytics",
                  "PortfolioForge watermark",
                ].map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <div className="rounded-full bg-secondary/20 p-1">
                      <svg
                        className="h-4 w-4 text-secondary"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    {feature}
                  </li>
                ))}
              </ul>
              <Link href="/register" className="block">
                <Button variant="outline" className="w-full">
                  Get Started Free
                </Button>
              </Link>
            </div>

            {/* Premium Tier */}
            <div className="relative rounded-2xl border-2 border-primary bg-gradient-to-br from-primary/5 to-secondary/5 p-8">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-1 text-sm font-medium text-white">
                Most Popular
              </div>
              <div className="mb-4">
                <h3 className="text-2xl font-bold">Pro</h3>
                <p className="mt-2 text-4xl font-bold">$9</p>
                <p className="text-gray-500">per month</p>
              </div>
              <ul className="mb-8 space-y-3">
                {[
                  "Unlimited portfolios",
                  "All templates + future ones",
                  "Custom domain",
                  "Advanced analytics",
                  "No watermark",
                  "Priority support",
                  "Export data",
                ].map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <div className="rounded-full bg-primary/20 p-1">
                      <svg
                        className="h-4 w-4 text-primary"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    {feature}
                  </li>
                ))}
              </ul>
              <Link href="/register?plan=pro" className="block">
                <Button className="w-full">Start Pro Trial</Button>
              </Link>
              <p className="mt-4 text-center text-sm text-gray-500">
                7-day free trial • Cancel anytime
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h2 className="mb-6 text-4xl font-bold">
            Ready to Build Your Portfolio?
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-xl text-gray-600 dark:text-gray-400">
            Join thousands of developers who&apos;ve built stunning portfolios with
            PortfolioForge.
          </p>
          <Link href="/register">
            <Button size="lg" className="gap-2">
              Start Building Now
              <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-12 dark:border-gray-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary/70">
                <Code2 className="h-4 w-4 text-white" />
              </div>
              <span className="font-bold">PortfolioForge</span>
            </div>
            <p className="text-sm text-gray-500">
              &copy; 2024 PortfolioForge. Built for developers.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
