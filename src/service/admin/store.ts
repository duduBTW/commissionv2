import { useQuery } from "@tanstack/react-query";
import {
  AdminMerchInsertReturn,
  AdminMerchListReturn,
} from "pages/api/admin/store";
import {
  AdminMerchReturn,
  AdminMerchUpdateReturn,
} from "pages/api/admin/store/[storeId]";
import api from "service/api";
import * as z from "zod";

// -- Schema
export const createAdminMerchSchema = z.object({
  name: z.string(),
  active: z.boolean(),
  url: z.string(),
  miniature: z.string(),
  price: z.number(),
});

// -- Tyles
export type CreateAdminMerchSchema = z.infer<typeof createAdminMerchSchema>;

// -- Actions
export async function insertMerch(body: CreateAdminMerchSchema) {
  const { data } = await api.post<AdminMerchInsertReturn>(
    `/api/admin/store`,
    body
  );

  return data;
}

export function updateMerch(merchId: string) {
  return async (body: CreateAdminMerchSchema) => {
    const { data } = await api.put<AdminMerchUpdateReturn>(
      `/api/admin/store/${merchId}`,
      body
    );

    return data;
  };
}

export function getMerch(merchId: string) {
  return async () => {
    const { data } = await api.get<AdminMerchReturn>(
      `/api/admin/store/${merchId}`
    );

    return data;
  };
}

export async function getMerchList() {
  const { data } = await api.get<AdminMerchListReturn>(`/api/admin/store`);

  return data;
}

// -- Hooks
export const useMerchKey = "admin-merch";
export const useMerch = (merchId: string) =>
  useQuery([useMerchKey, merchId], getMerch(merchId));

export const useMerchListKey = "admin-merch-list";
export const useMerchList = () => useQuery([useMerchKey], getMerchList);
