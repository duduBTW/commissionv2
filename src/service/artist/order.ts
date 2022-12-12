import { Message } from "components/admin/commission/order";
import api from "service/api";
import { z } from "zod";

// -- Schema
export const messageCreateSchema = z.object({
  categoryId: z.string(),
  value: z.string(),
  type: z.enum(["text", "image"]),
});

export const orderUserCreateSchema = z.object({
  twitter: z.string().optional().nullable(),
  discord: z.string().optional().nullable(),
});

// -- Types
export type MessageCreateSchema = z.infer<typeof messageCreateSchema>;
export type UserCreateSchema = z.infer<typeof messageCreateSchema>;

export const newOrder =
  (artistId: string, commissionId: string) =>
  async ({
    user,
    messages: messageRecord,
  }: {
    messages: Record<string, Message[]>;
    user: {
      discord?: string | null;
      twitter?: string | null;
    };
  }) => {
    const messageList = Object.entries(messageRecord).flatMap(
      ([category, messages]) =>
        messages.map(
          (message): MessageCreateSchema => ({
            categoryId: category,
            ...message,
          })
        )
    );

    const { data } = await api.post<{
      id: string;
    }>(`/api/artist/${artistId}/commissions/${commissionId}/order`, {
      user,
      messages: messageList,
    });

    return data;
  };
