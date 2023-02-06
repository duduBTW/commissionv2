import { useMutation } from "@tanstack/react-query";
import services from "service";
import { useRouter } from "next/router";

// components
import AdminStoreForm from "components/admin/store/form";
import AdminHeader from "components/admin/title";
import { toast } from "react-hot-toast";

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
      <AdminStoreForm loading={isLoading} onSubmit={(d) => insertMerch(d)} />
    </>
  );
};

export default AdminStoreCreatePage;
