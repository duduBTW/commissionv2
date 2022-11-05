import { useRouter } from "next/router";
import services from "service";

// components
import { useMutation } from "@tanstack/react-query";
import AdminCommissionForm from "components/admin/commission/form";
import AdmindHeader from "components/admin/title";

const CommissionsCreatePage = () => {
  const { push } = useRouter();
  const { mutate, isLoading } = useMutation(services.insertCommission, {
    onSuccess: ({ data: { id } }) => push(id),
  });

  return (
    <>
      <AdmindHeader backHref="/admin/dashboard/commissions">
        Nova commission
      </AdmindHeader>
      <AdminCommissionForm onSubmit={(d) => mutate(d)} loading={isLoading} />
    </>
  );
};

export default CommissionsCreatePage;