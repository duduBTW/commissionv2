import type { GetServerSideProps, NextPage } from "next";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import services from "service";
import AdminDashboard from "components/admin/dashboard";

const AdminDashboardPage: NextPage<{ defaultValue: string }> = ({
  defaultValue,
}) => {
  return <AdminDashboard defaultValue={defaultValue} />;
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const selectedTab = String(query.slug?.[0] ?? "home");

  const queryClient = new QueryClient();
  if (selectedTab === "portfolio") {
    await queryClient.prefetchQuery(
      [services.usePortfolioKey],
      services.getPortfolioList
    );
  }

  if (selectedTab === "commissions") {
    await queryClient.prefetchQuery(
      [services.useCommissionListKey],
      services.getCommissionList
    );
  }

  return {
    props: {
      defaultValue: selectedTab,
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default AdminDashboardPage;
