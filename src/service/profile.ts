import { useQuery } from "@tanstack/react-query";
import { IncomingHttpHeaders } from "http";
import * as z from "zod";
import { Session } from "next-auth";
import { useRouter } from "next/router";
import api from "./api";

// -- Schemas
export const createProfileSchema = z.object({
  userName: z.string().min(1, { message: "Required" }),
  profilePicture: z.string().min(1, { message: "Required" }),
  banner: z.string(),
  discord: z.string().optional().nullable(),
  twitter: z.string().optional().nullable(),
});
export const profileSchema = z
  .object({
    id: z.string(),
  })
  .merge(createProfileSchema);

// -- Types
export type ProfileSchema = z.infer<typeof profileSchema>;
export type CreateProfileSchema = z.infer<typeof createProfileSchema>;

// -- Methods
// Get logged user
export const getProfile = (headers?: IncomingHttpHeaders) => async () => {
  const { data } = await api.get<ProfileSchema>(`/api/profile`, {
    headers: { Cookie: headers?.cookie },
  });

  return data;
};

// Update user
export const updateProfile = async (body: CreateProfileSchema) => {
  const { data } = await api.put<ProfileSchema>(`/api/profile`, body);

  return data;
};

const fetchSession = async () => {
  const { data: session } = await api.get<Session>("/api/auth/session");
  if (Object.keys(session).length) {
    return session;
  }
  return null;
};

// -- Hooks
export const useSessionKey = "session";
export function useSession<R extends boolean = false>({
  required,
  redirectTo = "/api/auth/signin?error=SessionExpired",
  queryConfig = {},
}: {
  /** If set to `true`, the returned session is guaranteed to not be `null` */
  required?: R;
  /** If `required: true`, the user will be redirected to this URL, if they don't have a session */
  redirectTo?: string;
  /** Configuration for `useQuery` */
  queryConfig?: Parameters<typeof useQuery<Session | null>>[2];
} = {}) {
  const router = useRouter();
  return useQuery([useSessionKey], fetchSession, {
    // ...queryConfig,
    onSettled: (data, error) => {
      if (queryConfig.onSettled) queryConfig.onSettled(data, error);
      if (data || !required) return;
      router.push(redirectTo);
    },
  });
}

export const useProfileKey = "profile-current-user";
export const useProfile = () => useQuery([useProfileKey], getProfile());
