import type { GetServerSideProps, NextPage } from "next";
import { useSyncTabUrl } from "utils/useTabValue";
import { mq } from "styles/theme";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import services from "service";
import styled from "@emotion/styled";
import { z } from "zod";

// styles
import * as t from "components/tabs";

// components
import DashBoardOrders from "components/admin/dashboard/orders";
import Container from "components/container";
import DashBoardPortfolio from "components/admin/dashboard/portfolio";
import DashboardCommission from "components/admin/dashboard/commission";
import DashboardContract from "components/admin/dashboard/contract";
import DashboardStore from "components/admin/dashboard/store";
import ArtistProfile from "components/artist/profile";
import AristHeader from "components/artist/header";

export const getServerSideProps: GetServerSideProps = async ({
  params,
  req,
}) => {
  const selectedTab = z.string().parse(params?.selectedTab);

  const queryClient = new QueryClient();
  if (selectedTab === "portfolio") {
    await queryClient.prefetchQuery(
      [services.admin.usePortfolioKey],
      services.admin.getPortfolioList(req.headers)
    );
  }

  if (selectedTab === "commissions") {
    await queryClient.prefetchQuery(
      [services.admin.useCommissionListKey],
      services.admin.getCommissionList(req.headers)
    );
  }

  if (selectedTab === "contract") {
    await queryClient.prefetchQuery(
      [services.admin.useContractListKey],
      services.admin.getContratList(req.headers)
    );
  }

  return {
    props: {
      defaultValue: selectedTab,
      dehydratedState: dehydrate(queryClient),
    },
  };
};

const AdminDashboardPage: NextPage<{ defaultValue: string }> = ({
  defaultValue,
}) => {
  const { data: session } = services.profile.useSession();
  const handleValueChange = useSyncTabUrl("/admin/dashboard/");

  return (
    <t.root defaultValue={defaultValue} onValueChange={handleValueChange}>
      <s.tabs_container variant="content">
        <t.list dense>
          <t.trigger value="orders">Orders</t.trigger>
          <t.trigger value="commissions">Commissions</t.trigger>
          <t.trigger value="portfolio">Portfolio</t.trigger>
          <t.trigger value="contract">Contrato</t.trigger>
          <t.trigger value="store">Loja</t.trigger>
          {session?.user && <t.trigger value="profile">Meu perfil</t.trigger>}
        </t.list>
      </s.tabs_container>
      <DashBoardOrders />
      <DashboardCommission />
      <DashBoardPortfolio />
      <DashboardContract />
      <DashboardStore />
      {session?.user && (
        <t.content value="profile">
          <AristHeader artistId={session.user.id} />
          <ArtistProfile artistId={session.user.id} selectedTab="commissions" />
        </t.content>
      )}
    </t.root>
  );
};

const s = {
  tabs_container: styled(Container)`
    margin: 0 2rem 0;

    ${mq.fromDesktopSm} {
      margin: 0;
    }
  `,
};

export default AdminDashboardPage;
