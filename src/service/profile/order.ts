import { useQuery } from "@tanstack/react-query";
import api from "service/api";
import { z } from "zod";

// -- Schema
export const profileOrderSchema = z.object({
  id: z.string(),
  discord: z.string(),
  commission: z.object({
    id: z.string(),
    images: z.array(
      z.object({
        id: z.string(),
        url: z.string(),
        hash: z.string(),
        width: z.number(),
        height: z.number(),
        commissionId: z.string(),
      })
    ),
    name: z.string(),
    price: z.number(),
  }),
  artist: z.object({ id: z.string() }),
  messages: z.array(
    z.object({
      id: z.string(),
      type: z.string(),
      content: z.string(),
      orderId: z.string(),
      commissionCategoryId: z.string(),
    })
  ),
});

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

// -- Types
export type ProfileOrderSchema = z.infer<typeof profileOrderSchema>;
export type ProfileOrderListItemSchema = z.infer<
  typeof profileOrderListItemSchema
>;

// -- Methods
export const getOrder = (orderId: string) => async () => {
  const { data } = await api.get<ProfileOrderSchema>(
    `/api/profile/order/${orderId}`
  );

  return data;
};

export const getOrderList = async () => {
  const { data } = await api.get<ProfileOrderListItemSchema[]>(
    `/api/profile/order`
  );

  return data;
};

// -- Hooks
export const useOrderKey = "profile-order-item";
export const useOrder = (orderId: string) =>
  useQuery([useOrderKey, orderId], getOrder(orderId));

export const useOrderListKey = "profile-order-list-item";
export const useOrderList = () => useQuery([useOrderKey], getOrderList);
