import NextAuth, { DefaultSession } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { createServerSupabaseClient } from "@/lib/supabase/server";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      github_username?: string;
    } & DefaultSession["user"];
  }
}

const handler = NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === "github" && profile) {
        const supabase = createServerSupabaseClient();
        const githubProfile = profile as { login: string; id: number; avatar_url: string; name?: string };

        // Check if user exists
        const { data: existingUser } = await supabase
          .from("users")
          .select("*")
          .eq("github_id", String(githubProfile.id))
          .single();

        if (!existingUser) {
          // Create new user
          await supabase.from("users").insert({
            email: user.email!,
            name: githubProfile.name || githubProfile.login,
            avatar_url: githubProfile.avatar_url,
            github_id: String(githubProfile.id),
            github_username: githubProfile.login,
            subscription_tier: "free",
          });
        }
      }
      return true;
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.id = token.sub!;
        session.user.github_username = token.github_username as string;
      }
      return session;
    },
    async jwt({ token, account, profile }) {
      if (account?.provider === "github" && profile) {
        const githubProfile = profile as { login: string };
        token.github_username = githubProfile.login;
      }
      return token;
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  session: {
    strategy: "jwt",
  },
});

export { handler as GET, handler as POST };
