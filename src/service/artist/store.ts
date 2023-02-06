import { useQuery } from "@tanstack/react-query";
import { IncomingHttpHeaders } from "http";
import { ArtistStoreList } from "pages/api/artist/[artistId]/store";
import api from "service/api";

export function getStoreList(artistId: string, headers?: IncomingHttpHeaders) {
  return async () => {
    const { data } = await api.get<ArtistStoreList>(
      `/api/artist/${artistId}/store`,
      {
        headers: { Cookie: headers?.cookie },
      }
    );

    return data;
  };
}

// -- Hooks
export const useStoreListKey = "store-list";
export const useStoreList = (artistId: string) =>
  useQuery([useStoreListKey, artistId], getStoreList(artistId));
