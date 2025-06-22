import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "@/lib/mongodb";
import { connectDB } from "@/lib/connectDB";
import User from "@/models/User";
import { comparePassword } from "@/lib/hash";
import GitHubProvider from "next-auth/providers/github";

export const authOptions = {
  // adapter: MongoDBAdapter(clientPromise),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!
    })
    // CredentialsProvider({
    //   name: "Credentials",
    //   credentials: {
    //     email: { label: "Email", type: "email" },
    //     password: { label: "Password", type: "password" },
    //   },
    //   async authorize(credentials: Record<string, string> | undefined) {
    //     if (!credentials) return null;
    //     await connectDB();
    //     const user = await User.findOne({ email: credentials.email });
    //     if (!user) return null;
    //     const isValid = await comparePassword(credentials.password, user.password);
    //     if (!isValid) return null;
    //     return { id: user._id, email: user.email, name: user.name };
    //   },
    // }),
  ],
  session: { strategy: "jwt" as const },
  callbacks: {
    async signIn({ user, account, profile }: any) {
      console.log("🔐 [NEXTAUTH] Sign in attempt:", {
        provider: account?.provider,
        userEmail: user?.email,
        userName: user?.name,
        hasProfile: !!profile
      });
      return true;
    },
    async jwt({ token, user, account }: any) {
      console.log("🎫 [NEXTAUTH] JWT callback:", {
        hasToken: !!token,
        hasUser: !!user,
        hasAccount: !!account,
        tokenSub: token?.sub,
        userEmail: user?.email
      });
      
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }: any) {
      console.log("📋 [NEXTAUTH] Session callback:", {
        hasSession: !!session,
        hasToken: !!token,
        tokenSub: token?.sub,
        sessionUser: session?.user?.email
      });
      
      if (token) {
        session.user.id = token.sub;
        session.user.email = token.email;
        session.user.name = token.name;
      }
      
      console.log("✅ [NEXTAUTH] Final session:", {
        userId: session?.user?.id,
        userEmail: session?.user?.email,
        userName: session?.user?.name
      });
      
      return session;
    },
  },
  pages: {
    signIn: "/authentication/login",
    error: "/authentication/login",
  },
  debug: process.env.NODE_ENV === "development",
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
