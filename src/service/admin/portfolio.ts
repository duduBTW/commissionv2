import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { IncomingHttpHeaders } from "http";
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
  const { data } = await axios.post(
    `http://localhost:3000/api/admin/portfolio`,
    body
  );

  return data;
};

// Get portfolio list
export const getPortfolioList = (headers?: IncomingHttpHeaders) => async () => {
  const { data } = await axios.get<PortfolioSchema[]>(
    `http://localhost:3000/api/admin/portfolio`,
    {
      headers: { Cookie: headers?.cookie },
    }
  );

  return data;
};

// Update portfolio
export const updatePortfolio = async (body: PortfolioSchema) => {
  if (!body.id) return null;

  const { data } = await axios.put<PortfolioSchema>(
    `http://localhost:3000/api/admin/portfolio/${body.id}`,
    body
  );

  return data;
};

// Delete portfolio
export const deletePortfolio = async (portfolioId: string) => {
  const { data } = await axios.delete<PortfolioSchema>(
    `http://localhost:3000/api/admin/portfolio/${portfolioId}`
  );

  return data;
};

// -- Hooks
export const usePortfolioKey = "portfolio-list";
export const usePortfolio = () =>
  useQuery([usePortfolioKey], getPortfolioList());
