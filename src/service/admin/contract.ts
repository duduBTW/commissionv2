import { useQuery } from "@tanstack/react-query";
import { IncomingHttpHeaders } from "http";
import {
  ContractList,
  CreateContractReturn,
  CreateContractSchema,
} from "pages/api/admin/contract";
import { AdminContract } from "pages/api/admin/contract/[contractId]";
import api from "service/api";

export const insertContract = async (body: CreateContractSchema) => {
  const { data } = await api.post<CreateContractReturn>(
    "/api/admin/contract",
    body
  );

  return data;
};

export const getContrat =
  (contractId: string, headers?: IncomingHttpHeaders) => async () => {
    const { data } = await api.get<AdminContract>(
      `/api/admin/contract/${contractId}`,
      {
        headers: { Cookie: headers?.cookie },
      }
    );

    return data;
  };

export const getContratList = (headers?: IncomingHttpHeaders) => async () => {
  const { data } = await api.get<ContractList>(`/api/admin/contract`, {
    headers: { Cookie: headers?.cookie },
  });

  return data;
};

// -- Hooks
export const useContractKey = "admin-contract-item";
export const useContract = (
  contractId: string,
  config?: Parameters<typeof useQuery<AdminContract>>[2]
) => useQuery([useContractKey, contractId], getContrat(contractId), config);

export const useContractListKey = "admin-contract-list";
export const useContractList = (
  config?: Parameters<typeof useQuery<ContractList>>[2]
) => useQuery([useContractListKey], getContratList(), config);
