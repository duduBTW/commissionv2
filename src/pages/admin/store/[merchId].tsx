import services from "service";
import { GetServerSideProps } from "next";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";

// components
import AdminStoreForm from "components/admin/store/form";
import AdminHeader from "components/admin/title";
import { toast } from "react-hot-toast";

const AdminStoreUpdatePage = ({ merchId }: { merchId: string }) => {
  const { data: merch, refetch } = services.admin.useMerch(merchId);
  const { mutate: updateMerch, isLoading } = useMutation(
    services.admin.updateMerch(merchId),
    {
      onSuccess: () => {
        refetch();
        toast.success(`Merch atualizada com sucesso!`);
      },
    }
  );

  return (
    <>
      <AdminHeader backHref="/admin/dashboard/store">
        Atualizar merch
      </AdminHeader>
      {merch && (
        <AdminStoreForm
          defaultValues={merch}
          loading={isLoading}
          onSubmit={(d) => updateMerch(d)}
          submitLabel="Salvar"
        />
      )}
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const merchId = z.string().parse(params?.["merchId"]);

  return {
    props: {
      merchId,
    },
  };
};

export default AdminStoreUpdatePage;
