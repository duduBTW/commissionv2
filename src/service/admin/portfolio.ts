import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { IncomingHttpHeaders } from "http";
import api from "service/api";
import * as z from "zod";

// -- Schemas
export const portfolioSchema = z.object({
  id: z.string().optional(),
  url: z.string().min(1, { message: "Required" }),
  hash: z.string().min(1, { message: "Required" }),
  width: z.number(),
  height: z.number(),
});

// -- Types
export type PortfolioSchema = z.infer<typeof portfolioSchema>;

// -- Methods
// Create portfolio
export const insertPortfolio = async (body: PortfolioSchema) => {
  const { data } = await api.post(`/api/admin/portfolio`, body);

  return data;
};

// Get portfolio list
export const getPortfolioList = (headers?: IncomingHttpHeaders) => async () => {
  const { data } = await api.get<PortfolioSchema[]>(`/api/admin/portfolio`, {
    headers: { Cookie: headers?.cookie },
  });

  return data;
};

// Update portfolio
export const updatePortfolio = async (body: PortfolioSchema) => {
  if (!body.id) return null;

  const { data } = await api.put<PortfolioSchema>(
    `/api/admin/portfolio/${body.id}`,
    body
  );

  return data;
};

// Delete portfolio
export const deletePortfolio = async (portfolioId: string) => {
  const { data } = await api.delete<PortfolioSchema>(
    `/api/admin/portfolio/${portfolioId}`
  );

  return data;
};

// -- Hooks
export const usePortfolioKey = "portfolio-list";
export const usePortfolio = () =>
  useQuery([usePortfolioKey], getPortfolioList());
