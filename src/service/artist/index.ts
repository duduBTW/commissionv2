import { useQuery } from "@tanstack/react-query";
import { IncomingHttpHeaders } from "http";
import api from "service/api";
import * as z from "zod";

// -- Schemas
export const artistListItem = z.object({
  id: z.string(),
  userName: z.string(),
  profilePicture: z.string(),
  banner: z.string(),
});

// -- Types
export type ArtistListItemSchema = z.infer<typeof artistListItem>;

// -- Methods
// Get list of artists
export const getArtistList = (headers?: IncomingHttpHeaders) => async () => {
  const { data } = await api.get<ArtistListItemSchema[]>(`/api/artist`, {
    headers: { Cookie: headers?.cookie },
  });

  return data;
};

// Get artist by id
export const getArtist =
  (id: string, headers?: IncomingHttpHeaders) => async () => {
    const { data } = await api.get<ArtistListItemSchema>(`/api/artist/${id}`, {
      headers: { Cookie: headers?.cookie },
    });

    return data;
  };

// -- Hooks
export const useArtistListKey = "artist-list";
export const useArtistList = () =>
  useQuery([useArtistListKey], getArtistList());

export const useArtistKey = "artist-item";
export const useArtist = (id: string) =>
  useQuery([useArtistKey, id], getArtist(id));
