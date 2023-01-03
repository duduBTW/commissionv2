import { useQuery } from "@tanstack/react-query";
import { Message } from "components/admin/commission/order";
import { IncomingHttpHeaders } from "http";
import { Contract } from "pages/api/artist/[artistId]/contract";
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

export const getContract = async (
  artistId: string,
  headers?: IncomingHttpHeaders
) => {
  const { data } = await api.get<Contract>(`/api/artist/${artistId}/contract`, {
    headers: { Cookie: headers?.cookie },
  });

  return data;
};

// -- Hooks
export const useContractKey = "contract-item";
export const useContract = (artistId: string) =>
  useQuery([useContractKey, artistId], () => getContract(artistId));
