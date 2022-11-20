import { DefaultSession } from "next-auth";

export interface UserSession {
  id: string;
  profilePicture?: string;
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
    adminId: string | null;
    profilePicture?: string;
  }
}
