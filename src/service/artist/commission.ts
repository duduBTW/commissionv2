import { useQuery } from "@tanstack/react-query";
import { IncomingHttpHeaders } from "http";
import { ArtistCommissionList } from "pages/api/artist/[artistId]/commissions";
import { ArtistCommissionItem } from "pages/api/artist/[artistId]/commissions/[commissionId]";
import api from "service/api";
import * as z from "zod";

export const commissionListSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  descriptionHtml: z.string(),
  price: z.number(),
  miniature: z.string().optional(),
});

export const commissionItemSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  price: z.number(),
  descriptionHtml: z.string(),
  images: z.array(
    z.object({
      id: z.string(),
      hash: z.string(),
      url: z.string(),
      height: z.number(),
      width: z.number(),
    })
  ),
});

// -- Types
export type CommissionListSchema = z.infer<typeof commissionListSchema>;
export type CommissionItemSchema = z.infer<typeof commissionItemSchema>;

// -- Hooks
// Get list of commissions
export const getCommissionList =
  (artistId: string, headers?: IncomingHttpHeaders) => async () => {
    const { data } = await api.get<ArtistCommissionList>(
      `/api/artist/${artistId}/commissions`,
      {
        headers: { Cookie: headers?.cookie },
      }
    );

    return data;
  };

// Get commissions by id
export const getCommission =
  (artistId: string, commissionId: string, headers?: IncomingHttpHeaders) =>
  async () => {
    const { data } = await api.get<ArtistCommissionItem>(
      `/api/artist/${artistId}/commissions/${commissionId}`,
      {
        headers: { Cookie: headers?.cookie },
      }
    );

    return data;
  };

// -- Hooks
export const useCommissionListKey = "commission-list";
export const useCommissionList = (artistId: string) =>
  useQuery([useCommissionListKey, artistId], getCommissionList(artistId));

export const useCommissionKey = "commission-item";
export const useCommission = (artistId: string, commissionId: string) =>
  useQuery(
    [useCommissionKey, artistId, commissionId],
    getCommission(artistId, commissionId)
  );
