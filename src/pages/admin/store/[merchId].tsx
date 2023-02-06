import { useMutation } from "@tanstack/react-query";
import services from "service";
import { useRouter } from "next/router";

// components
import AdminStoreForm from "components/admin/store/form";
import AdminHeader from "components/admin/title";
import { z } from "zod";
import { GetServerSideProps } from "next";

const AdminStoreUpdatePage = ({ merchId }: { merchId: string }) => {
  const router = useRouter();
  const { data: merch } = services.admin.useMerch(merchId);
  const { mutate: insertMerch, isLoading } = useMutation(
    services.admin.insertMerch,
    {
      onSuccess: ({ id }) => {
        router.push(`/admin/store/${id}`);
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
          onSubmit={(d) => insertMerch(d)}
        />
      )}
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  params,
  req,
}) => {
  const merchId = z.string().parse(params?.["merchId"]);

  return {
    props: {
      merchId,
    },
  };
};

export default AdminStoreUpdatePage;
