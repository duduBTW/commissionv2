import { useQuery } from "@tanstack/react-query";
import { AdminOrder } from "pages/api/admin/order/[orderId]";
import { AdminOrderMessages } from "pages/api/admin/order/[orderId]/messages";
import {
  OrderProgressCreateReturn,
  OrderProgressCreateSchema,
  OrderProgressList,
} from "pages/api/admin/order/[orderId]/progress";
import api from "service/api";
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
  const { data } = await api.get<AdminOrder>(`/api/admin/order/${orderId}`);

  return data;
};

export const getOrderMessages = (orderId: string) => async () => {
  const { data } = await api.get<AdminOrderMessages>(
    `/api/admin/order/${orderId}/messages`
  );

  return data;
};

export const updateOrderType = (orderId: string) => async (type: string) => {
  const { data } = await api.put(`/api/admin/order/${orderId}`, {
    type,
  });

  return data;
};

export const getProgress = (orderId: string) => async () => {
  const { data } = await api.get<OrderProgressList>(
    `/api/admin/order/${orderId}/progress`
  );

  return data;
};

export const postProgress =
  (orderId: string) => async (body: OrderProgressCreateSchema) => {
    const { data } = await api.post<OrderProgressCreateReturn>(
      `/api/admin/order/${orderId}/progress`,
      body
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

export const useOrderProgressKey = "admin-order-progress";
export const useOrderProgress = (orderId: string) =>
  useQuery([useOrderProgressKey, orderId], getProgress(orderId));
