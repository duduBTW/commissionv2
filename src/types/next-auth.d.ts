import { DefaultSession } from "next-auth";

export interface UserSession {
  id: string;
  profilePicture?: string;
  discord?: string;
  twitter?: string;
  admin: boolean;
}

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user?: UserSession & DefaultSession["user"];
  }

  interface User {
    role: string;
    discord: string | null;
    twitter: string | null;
    profilePicture?: string;
  }
}
