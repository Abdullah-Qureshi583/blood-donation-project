import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "@/lib/mongodb";
import { connectDB } from "@/lib/dbConnect";
import Donor from "@/models/Donor";
import { comparePassword } from "@/lib/hash";

export const authOptions = {
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: Record<string, string> | undefined) {
        if (!credentials) return null;
        await connectDB();
        const user = await Donor.findOne({ email: credentials.email });
        if (!user) return null;
        const isValid = await comparePassword(credentials.password, user.password);
        if (!isValid) return null;
        return { id: user._id, email: user.email, name: user.name };
      },
    }),
  ],
  session: { strategy: "jwt" as const },
  callbacks: {
    async session({ session, token }: any) {
      session.user.id = token.sub;
      return session;
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST }; 