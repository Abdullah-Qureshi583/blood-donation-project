import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
      lastName: string;
      phone: string;
    };
  }

  interface User {
    id: string;
    email: string;
    name: string;
    lastName: string;
    phone: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    email: string;
    name: string;
    lastName: string;
    phone: string;
  }
} 