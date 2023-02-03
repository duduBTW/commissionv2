import { useQuery } from "@tanstack/react-query";
import { JSONContent } from "@tiptap/react";
import { IncomingHttpHeaders } from "http";
import { CommissionCategorys } from "pages/api/artist/[artistId]/commissions/[commissionId]/categorys";
import { Contract } from "pages/api/artist/[artistId]/contract";
import api from "service/api";
import { z } from "zod";

// -- Schema
export const confirmationSchema = z.object({
  name: z.string().min(1, { message: "Required" }),
  brith: z.string().min(1, { message: "Required" }),
  contact: z.string().min(1, { message: "Required" }),
  paying: z.string().min(1, { message: "Required" }),
});

// -- Types
export type Confirmation = z.infer<typeof confirmationSchema>;

export const newOrder =
  (artistId: string, commissionId: string) =>
  async ({
    user,
    messages,
  }: {
    messages: Record<string, string>;
    user: Confirmation;
  }) => {
    const { data } = await api.post<{
      id: string;
    }>(`/api/artist/${artistId}/commissions/${commissionId}/order`, {
      user,
      messages,
    });

    return data;
  };

export const getContract = async (
  artistId: string,
  headers?: IncomingHttpHeaders
) => {
  const { data } = await api.get<Contract>(`/api/artist/${artistId}/contract`, {
    headers: { Cookie: headers?.cookie },
  });

  return data;
};

export const getCategorys = async (
  artistId: string,
  commissionId: string,
  headers?: IncomingHttpHeaders
) => {
  const { data } = await api.get<CommissionCategorys>(
    `/api/artist/${artistId}/commissions/${commissionId}/categorys`,
    {
      headers: { Cookie: headers?.cookie },
    }
  );

  return data;
};

// -- Hooks
export const useContractKey = "contract-item";
export const useContract = (artistId: string) =>
  useQuery([useContractKey, artistId], () => getContract(artistId));

export const useCategorysKey = "categor-list";
export const useCategorys = (artistId: string, commissionId: string) =>
  useQuery([useContractKey, artistId, commissionId], () =>
    getCategorys(artistId, commissionId)
  );
