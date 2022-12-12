import { useQuery } from "@tanstack/react-query";
import api from "service/api";
import { ProfileOrderListItemSchema } from "service/profile/order";
import { z } from "zod";

// -- Schema
export const adminOrderListItemSchema = z.object({
  id: z.string(),
  user: z.object({
    id: z.string(),
    userName: z.string(),
    profilePicture: z.string(),
  }),
  type: z.string(),
  commission: z.object({
    id: z.string(),
    name: z.string(),
    images: z.array(
      z.object({
        url: z.string(),
      })
    ),
  }),
});

// -- Types
export type AdminOrderListItemSchema = z.infer<typeof adminOrderListItemSchema>;

// -- Methods
interface GetOrderListParams {
  type?: string;
  exclude_type?: string;
}
export const getOrderList = (params: GetOrderListParams) => async () => {
  const { data } = await api.get<AdminOrderListItemSchema[]>(
    `/api/admin/order`,
    {
      params,
    }
  );

  return data;
};

// -- Hooks
export const useOrderListKey = "admin-order-list";
export const useOrderList = (params: GetOrderListParams) =>
  useQuery([useOrderListKey, params], getOrderList(params));
