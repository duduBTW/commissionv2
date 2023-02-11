import services from "service";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";

// components
import AdminStoreForm from "components/admin/store/form";
import AdminHeader from "components/admin/title";

const AdminStoreCreatePage = () => {
  const router = useRouter();
  const { mutate: insertMerch, isLoading } = useMutation(
    services.admin.insertMerch,
    {
      onSuccess: ({ id }) => {
        toast.success("Merch adicionada com sucesso!");

        router.push(`/admin/store/${id}`);
      },
    }
  );

  return (
    <>
      <AdminHeader backHref="/admin/dashboard/store">Nova merch</AdminHeader>
      <AdminStoreForm
        loading={isLoading}
        onSubmit={(d) => insertMerch(d)}
        submitLabel="Criar"
      />
    </>
  );
};

export default AdminStoreCreatePage;
