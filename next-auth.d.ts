import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    id: string;
  }

  interface JWT {
    id: string;
  }
  interface Profile {
    id: string; // Add the `id` property
    login: string;
    bio?: string;
  }
}
