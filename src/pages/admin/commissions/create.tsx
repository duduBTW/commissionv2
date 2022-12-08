import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import services from "service";

// components
import AdminCommissionForm from "components/admin/commission/form";
import AdminHeader from "components/admin/title";

const CommissionsCreatePage = () => {
  const { push } = useRouter();
  const { mutate, isLoading } = useMutation(services.admin.insertCommission, {
    onSuccess: ({ data: { id } }) => push(id),
  });

  return (
    <>
      <AdminHeader backHref="/admin/dashboard/commissions">
        Nova commission
      </AdminHeader>
      <AdminCommissionForm onSubmit={(d) => mutate(d)} loading={isLoading} />
    </>
  );
};

export default CommissionsCreatePage;
