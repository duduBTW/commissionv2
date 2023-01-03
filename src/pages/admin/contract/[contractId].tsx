import { CreateContractSchema } from "pages/api/admin/contract";
import { useForm } from "react-hook-form";
import { dehydrate, QueryClient, useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import services from "service";

// styles
import * as g from "styles/globalStyles";

// components
import AdminHeader from "components/admin/title";
import InputEditor from "components/input/editor";
import Button from "components/button";
import { GetServerSideProps } from "next";
import Typography from "components/typography";
import { format } from "date-fns";
import { toast } from "react-hot-toast";

const ContractCreatePage = ({ contractId }: { contractId: string }) => {
  const { push } = useRouter();
  const { data: contract, refetch } = services.admin.useContract(
    String(contractId),
    {
      enabled: Boolean(contractId !== "create"),
    }
  );

  const { control, handleSubmit } = useForm<{
    content: CreateContractSchema;
  }>({
    defaultValues: contract
      ? {
          content: contract,
        }
      : undefined,
  });

  const { mutate: insertContract, isLoading } = useMutation(
    services.admin.insertContract,
    {
      onSuccess: ({ id }) => {
        refetch();
        push(`/admin/contract/${id}`);

        toast.success("Contrato atualizado com sucesso!");
      },
    }
  );

  return (
    <>
      <AdminHeader backHref="/admin/dashboard/contract">Contrato</AdminHeader>
      <form onSubmit={handleSubmit((d) => insertContract(d.content))}>
        <g.paper loading={isLoading}>
          {contract?.createdAt && (
            <Typography color="text.60">
              Atualizado dia{" "}
              {format(new Date(contract.createdAt), "dd/MM/yyyy 'as' mm:hh")}
            </Typography>
          )}
          <InputEditor control={control} name="content" />
          <Button fullWidth loading={isLoading}>
            Salvar
          </Button>
        </g.paper>
      </form>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  params,
  req,
}) => {
  const contractId = params?.["contractId"];
  if (typeof contractId !== "string")
    return {
      notFound: true,
    };

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(
    [services.admin.useContractKey, contractId],
    services.admin.getContrat(contractId, req.headers)
  );

  return {
    props: {
      contractId,
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default ContractCreatePage;
