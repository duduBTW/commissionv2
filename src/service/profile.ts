import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { IncomingHttpHeaders } from "http";
import * as z from "zod";

// -- Schemas
export const createProfileSchema = z.object({
  userName: z.string().min(1, { message: "Required" }),
  profilePicture: z.string().min(1, { message: "Required" }),
  banner: z.string(),
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
  const { data } = await axios.get<ProfileSchema>(
    `http://localhost:3000/api/profile`,
    {
      headers: { Cookie: headers?.cookie },
    }
  );

  return data;
};

// Update user
export const updateProfile = async (body: CreateProfileSchema) => {
  const { data } = await axios.put<ProfileSchema>(
    `http://localhost:3000/api/profile`,
    body
  );

  return data;
};

// -- Hooks
export const useProfileKey = "profile-current-user";
export const useProfile = () => useQuery([useProfileKey], getProfile());
