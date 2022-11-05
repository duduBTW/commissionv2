import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import * as z from "zod";

// -- Schemas
export const commissionSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, { message: "Required" }),
  description: z.object({
    json: z.string(),
    html: z.string(),
  }),
  price: z.number().min(1, { message: "Required" }),
});
export const commissionListSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  descriptionHtml: z.string(),
  price: z.number(),
  miniature: z.string().optional(),
});
export const commissionImageSchema = z.object({
  id: z.string().optional(),
  url: z.string().min(1, { message: "Required" }),
  hash: z.string().min(1, { message: "Required" }),
  width: z.number(),
  height: z.number(),
});

// -- Types
export type CommissionSchema = z.infer<typeof commissionSchema>;
export type CommissionListSchema = z.infer<typeof commissionListSchema>;
export type CommissionImageSchema = z.infer<typeof commissionImageSchema>;

// -- Methods
// Create commission
export const insertCommission = async (data: CommissionSchema) =>
  await axios.post<{
    id: string;
  }>("http://localhost:3000/api/commission", data);

// Get commission by id
export const getCommission = (id: string) => async () => {
  const data = await axios.get<CommissionSchema>(
    `http://localhost:3000/api/commission/${id}`
  );

  return data.data;
};

// Get list of commissions
export const getCommissionList = async () => {
  const { data } = await axios.get<CommissionListSchema[]>(
    `http://localhost:3000/api/commission`
  );

  return data;
};

// Update commissions
export const updateCommission =
  (commissionId: string) => async (body: CommissionSchema) => {
    const { data } = await axios.put<CommissionListSchema[]>(
      `http://localhost:3000/api/commission/${commissionId}`,
      body
    );

    return data;
  };

// Insert image
export const insertImageCommission =
  (id: string) => async (body: CommissionImageSchema) => {
    const { data } = await axios.post<CommissionImageSchema>(
      `http://localhost:3000/api/commission/${id}/images`,
      body
    );

    return data;
  };

// Update image
export const updateImageCommission =
  (commissionId: string) => async (body: CommissionImageSchema) => {
    const { data } = await axios.put<CommissionImageSchema>(
      `http://localhost:3000/api/commission/${commissionId}/images`,
      body
    );

    return data;
  };

// Delete image
export const deleteImageCommission =
  (commissionId: string) => async (id: string) => {
    const { data } = await axios.delete<CommissionImageSchema>(
      `http://localhost:3000/api/commission/${commissionId}/images/${id}`
    );

    return data;
  };

// Get images of a commission
export const getCommissionImageList = (id: string) => async () => {
  const { data } = await axios.get<CommissionImageSchema[]>(
    `http://localhost:3000/api/commission/${id}/images`
  );

  return data;
};

// -- Hooks
export const useCommissionListKey = "commission-list";
export const useCommissionList = () =>
  useQuery([useCommissionListKey], getCommissionList);

export const useCommissionKey = "commission-item";
export const useCommission = (id: string) =>
  useQuery([useCommissionKey, id], getCommission(id));

export const useCommissionImageListKey = "commission-image-list";
export const useCommissionImageList = (id: string) =>
  useQuery([useCommissionImageListKey, id], getCommissionImageList(id));
