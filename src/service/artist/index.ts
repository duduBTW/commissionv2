import { ArtistList } from "pages/api/artist";
import { Artist } from "pages/api/artist/[artistId]";
import { useQuery } from "@tanstack/react-query";
import { IncomingHttpHeaders } from "http";
import api from "service/api";

// -- Methods
// Get list of artists
export const getArtistList = () => async () => {
  const { data } = await api.get<ArtistList>(`/api/artist`);

  return data;
};

// Get artist by id
export const getArtist =
  (id: string, headers?: IncomingHttpHeaders) => async () => {
    const { data } = await api.get<Artist>(`/api/artist/${id}`, {
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
