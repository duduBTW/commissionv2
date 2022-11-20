import { useQuery } from "@tanstack/react-query";
import { IncomingHttpHeaders } from "http";
import api from "service/api";
import * as z from "zod";

export const portfolioListSchema = z.object({
  id: z.string().optional(),
  url: z.string(),
  hash: z.string(),
  width: z.number(),
  height: z.number(),
});

export const portfolioItemSchema = portfolioListSchema;

// -- Types
export type PortfolioListSchema = z.infer<typeof portfolioListSchema>;
export type PortfolioItemSchema = z.infer<typeof portfolioItemSchema>;

// -- Hooks
// Get list of portoflio
export const getPortfolioList =
  (artistId: string, headers?: IncomingHttpHeaders) => async () => {
    const { data } = await api.get<PortfolioListSchema[]>(
      `/api/artist/${artistId}/portfolio`,
      {
        headers: { Cookie: headers?.cookie },
      }
    );

    return data;
  };

// Get portoflio by id
export const getPortfolio =
  (artistId: string, portfolioId: string, headers?: IncomingHttpHeaders) =>
  async () => {
    const { data } = await api.get<PortfolioItemSchema>(
      `/api/artist/${artistId}/portfolio/${portfolioId}`,
      {
        headers: { Cookie: headers?.cookie },
      }
    );

    return data;
  };

// -- Hooks
export const usePortfolioListKey = "portoflio-list";
export const usePortfolioList = (artistId: string) =>
  useQuery([usePortfolioListKey, artistId], getPortfolioList(artistId));

export const usePortfolioKey = "portoflio-item";
export const usePortfolio = (artistId: string, portfolioId: string) =>
  useQuery(
    [usePortfolioKey, artistId, portfolioId],
    getPortfolio(artistId, portfolioId)
  );
