import { useQuery } from "@tanstack/react-query";
import { IncomingHttpHeaders } from "http";
import { AdminUpdateCommissionMiniature } from "pages/api/admin/commission/[commissionId]/images/[imageId]/miniature";
import { AdminCommissionList } from "pages/api/artist/[artistId]/commissions";
import { AdminCommission } from "pages/api/artist/[artistId]/commissions/[commissionId]";
import api from "service/api";
import * as z from "zod";

// -- Schemas
export const commissionSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, { message: "Required" }),
  active: z.boolean(),
  steps: z.string().min(1, { message: "Required" }),
  description: z.object({
    json: z.string(),
    html: z.string(),
  }),
  price: z.number().min(1, { message: "Required" }),
});

export const commissionImageSchema = z.object({
  id: z.string().optional(),
  url: z.string().min(1, { message: "Required" }),
  hash: z.string().min(1, { message: "Required" }),
  width: z.number(),
  height: z.number(),
});
export const commissionCategoryCreateSchema = z.object({
  name: z.string().min(1, { message: "Required" }),
  description: z
    .object({
      json: z.string().nullable(),
      html: z.string().nullable(),
    })
    .nullable()
    .optional(),
});

export const commissionCategorySchema = z
  .object({
    id: z.string(),
  })
  .merge(commissionCategoryCreateSchema);

// -- Types
export type CommissionSchema = z.infer<typeof commissionSchema>;
export type CommissionImageSchema = z.infer<typeof commissionImageSchema>;
export type CommissionCategoryCreateSchema = z.infer<
  typeof commissionCategoryCreateSchema
>;
export type CommissionCategorySchema = z.infer<typeof commissionCategorySchema>;

// -- Methods
// Create commission
export const insertCommission = async (data: CommissionSchema) =>
  await api.post<{
    id: string;
  }>("/api/admin/commission", data);

// Get commission by id
export const getCommission =
  (id: string, headers?: IncomingHttpHeaders) => async () => {
    const data = await api.get<AdminCommission>(`/api/admin/commission/${id}`, {
      headers: { Cookie: headers?.cookie },
    });

    return data.data;
  };

// Get list of commissions
export const getCommissionList =
  (headers?: IncomingHttpHeaders) => async () => {
    const { data } = await api.get<AdminCommissionList>(
      `/api/admin/commission`,
      {
        headers: { Cookie: headers?.cookie },
      }
    );

    return data;
  };

// Update commissions
export const updateCommission =
  (commissionId: string) => async (body: CommissionSchema) => {
    const { data } = await api.put(
      `/api/admin/commission/${commissionId}`,
      body
    );

    return data;
  };

// Insert image
export const insertImageCommission =
  (id: string) => async (body: CommissionImageSchema) => {
    const { data } = await api.post<CommissionImageSchema>(
      `/api/admin/commission/${id}/images`,
      body
    );

    return data;
  };

// Update image
export const updateImageCommission =
  (commissionId: string) => async (body: CommissionImageSchema) => {
    const { data } = await api.put<CommissionImageSchema>(
      `/api/admin/commission/${commissionId}/images`,
      body
    );

    return data;
  };

// Delete image
export const deleteImageCommission =
  (commissionId: string) => async (id: string) => {
    const { data } = await api.delete<CommissionImageSchema>(
      `/api/admin/commission/${commissionId}/images/${id}`
    );

    return data;
  };

// Make commission image a miniature
export const setImageCommissionMiniature =
  (commissionId: string) => async (id: string) => {
    const { data } = await api.put<AdminUpdateCommissionMiniature>(
      `/api/admin/commission/${commissionId}/images/${id}/miniature`
    );

    return data;
  };

// Get images of a commission
export const getCommissionImageList = (id: string) => async () => {
  const { data } = await api.get<CommissionImageSchema[]>(
    `/api/admin/commission/${id}/images`
  );

  return data;
};

// Insert category
export const insertCategoryCommission =
  (id: string) => async (body: CommissionCategoryCreateSchema) => {
    const { data } = await api.post<CommissionCategoryCreateSchema>(
      `/api/admin/commission/${id}/categorys`,
      body
    );

    return data;
  };

// Get category list
export const getCommissionCategoryList = (commissionId: string) => async () => {
  const { data } = await api.get<CommissionCategorySchema[]>(
    `/api/admin/commission/${commissionId}/categorys`
  );

  return data;
};

// Insert category
export const updateCommissionCategory =
  (id: string) =>
  async ({
    body,
    categoryId,
  }: {
    body: CommissionCategoryCreateSchema;
    categoryId: string;
  }) => {
    const { data } = await api.put<CommissionCategorySchema[]>(
      `/api/admin/commission/${id}/categorys/${categoryId}`,
      body
    );

    return data;
  };

// Insert category
export const deleteCommissionCategory =
  (id: string) => async (categoryId: string) => {
    const { data } = await api.delete<CommissionCategorySchema[]>(
      `/api/admin/commission/${id}/categorys/${categoryId}`
    );

    return data;
  };

// -- Hooks
export const useCommissionListKey = "admin-commission-list";
export const useCommissionList = () =>
  useQuery([useCommissionListKey], getCommissionList());

export const useCommissionKey = "admin-commission-item";
export const useCommission = (id: string) =>
  useQuery([useCommissionKey, id], getCommission(id));

export const useCommissionImageListKey = "admin-commission-image-list";
export const useCommissionImageList = (id: string) =>
  useQuery([useCommissionImageListKey, id], getCommissionImageList(id));

export const useCommissionCategoryListKey = "admin-commission-category-list";
export const useCommissionCategoryList = (
  id: string,
  queryConfig?: Parameters<typeof useQuery<CommissionCategorySchema[]>>[2]
) =>
  useQuery(
    [useCommissionCategoryListKey, id],
    getCommissionCategoryList(id),
    queryConfig
  );
