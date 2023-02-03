import { useQuery } from "@tanstack/react-query";
import { ProfileOrderList } from "pages/api/profile/order";
import { ProfileOrder } from "pages/api/profile/order/[orderId]";
import { ProfileOrderMessages } from "pages/api/profile/order/[orderId]/messages";
import api from "service/api";
import { z } from "zod";

// -- Schema
export const profileOrderListItemSchema = z.object({
  id: z.string(),
  artist: z.object({
    id: z.string(),
    users: z.array(
      z.object({
        id: z.string(),
        userName: z.string(),
        profilePicture: z.string(),
      })
    ),
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

export const profileOrderMessagesSchema = z.object({
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
export type ProfileOrderListItemSchema = z.infer<
  typeof profileOrderListItemSchema
>;
export type ProfileOrderMessagesSchema = z.infer<
  typeof profileOrderMessagesSchema
>;

// -- Methods
export const getOrder = (orderId: string) => async () => {
  const { data } = await api.get<ProfileOrder>(`/api/profile/order/${orderId}`);

  return data;
};

export const getOrderList = async () => {
  const { data } = await api.get<ProfileOrderList>(`/api/profile/order`);

  return data;
};

export const getOrderMessages = (orderId: string) => async () => {
  const { data } = await api.get<ProfileOrderMessages>(
    `/api/profile/order/${orderId}/messages`
  );

  return data;
};

// -- Hooks
export const useOrderKey = "profile-order-item";
export const useOrder = (orderId: string) =>
  useQuery([useOrderKey, orderId], getOrder(orderId));

export const useOrderListKey = "profile-order-list-item";
export const useOrderList = () => useQuery([useOrderKey], getOrderList);

export const useOrderMessagesKey = "profile-order-messages";
export const useOrderMessages = (orderId: string) =>
  useQuery([useOrderMessagesKey, orderId], getOrderMessages(orderId));
