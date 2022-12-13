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

export const adminOrderSchema = z.object({
  id: z.string(),
  commission: z.object({
    id: z.string(),
    name: z.string(),
    price: z.number(),
    images: z.array(z.object({ url: z.string() })),
  }),
  user: z.object({
    id: z.string(),
    userName: z.string(),
    profilePicture: z.string(),
  }),
  type: z.string(),
  discord: z.string(),
  twitter: z.string(),
});

export const adminOrderMessagesSchema = z.object({
  content: z.record(
    z.array(
      z.object({
        id: z.string(),
        type: z.enum(["text", "image"]),
        value: z.string(),
      })
    )
  ),
  categorys: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      description: z.object({ html: z.null() }),
    })
  ),
});

// -- Types
export type AdminOrderListItemSchema = z.infer<typeof adminOrderListItemSchema>;
export type AdminOrderSchema = z.infer<typeof adminOrderSchema>;
export type AdminOrderMessagesSchema = z.infer<typeof adminOrderMessagesSchema>;

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

export const getOrder = (orderId: string) => async () => {
  const { data } = await api.get<AdminOrderSchema>(
    `/api/admin/order/${orderId}`
  );

  return data;
};

export const getOrderMessages = (orderId: string) => async () => {
  const { data } = await api.get<AdminOrderMessagesSchema>(
    `/api/admin/order/${orderId}/messages`
  );

  return data;
};

// -- Hooks
export const useOrderListKey = "admin-order-list";
export const useOrderList = (params: GetOrderListParams) =>
  useQuery([useOrderListKey, params], getOrderList(params));

export const useOrderKey = "admin-order";
export const useOrder = (orderId: string) =>
  useQuery([useOrderKey, orderId], getOrder(orderId));

export const useOrderMessagesKey = "admin-order-messages";
export const useOrderMessages = (orderId: string) =>
  useQuery([useOrderMessagesKey, orderId], getOrderMessages(orderId));
