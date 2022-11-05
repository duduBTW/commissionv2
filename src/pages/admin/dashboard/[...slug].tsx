import type { GetServerSideProps, NextPage } from "next";
import { usePortfolio } from "service/portfolio";
import { dehydrate, QueryClient, useMutation } from "@tanstack/react-query";
import services from "service";

// styles
import * as t from "components/tabs";
import * as g from "styles/globalStyles";

// components
import OrderGrid from "components/order/grid";
import AdminSearch from "components/admin/search";
import CommissionsGrid from "components/commission/grid";
import AdminImages from "components/admin/images";

const AdminDashboardPage: NextPage<{ defaultValue: string }> = ({
  defaultValue,
}) => {
  const handleValueChange = (value: string) =>
    window.history.replaceState(
      window.history.state,
      "",
      `/admin/dashboard/${value}`
    );

  return (
    <t.root defaultValue={defaultValue} onValueChange={handleValueChange}>
      <g.container
        style={{
          margin: "-2rem auto",
        }}
      >
        <t.list dense>
          <t.trigger value="home">Dashboard</t.trigger>
          <t.trigger value="commissions">Commissions</t.trigger>
          <t.trigger value="portfolio">Portfolio</t.trigger>
        </t.list>
      </g.container>
      <DashBoard />
      <Portfolio />
      <Commission />
    </t.root>
  );
};

const DashBoard = () => {
  return (
    <t.content value="home">
      <g.container variant="content">
        <OrderGrid label="Novos pedidos" />
      </g.container>
      <g.container>
        <OrderGrid header={<AdminSearch />} />
      </g.container>
    </t.content>
  );
};

const Commission = () => {
  const { data: commissions } = services.useCommissionList();

  return (
    <g.container>
      <t.content value="commissions">
        <AdminSearch createHref={"/admin/commissions/create"} />
        <div
          style={{
            height: "2rem",
          }}
        />
        {commissions && (
          <CommissionsGrid
            href="/admin/commissions"
            commissions={commissions}
          />
        )}
      </t.content>
    </g.container>
  );
};

const Portfolio = () => {
  const { data: images, refetch } = usePortfolio();
  const { mutate: insertPortfolio, isLoading: isInserting } = useMutation(
    services.insertPortfolio,
    {
      onSuccess: () => {
        refetch();
      },
    }
  );

  const { mutate: updatePortfolio, isLoading: isUpdating } = useMutation(
    services.updatePortfolio,
    {
      onSuccess: () => {
        refetch();
      },
    }
  );

  const { mutate: deletePortfolio, isLoading: isDeleting } = useMutation(
    services.deletePortfolio,
    {
      onSuccess: () => {
        refetch();
      },
    }
  );

  if (!images) return <div></div>;
  return (
    <AdminImages
      images={images}
      loading={isInserting || isUpdating || isDeleting}
      insertImage={(d) => insertPortfolio(d)}
      onUpdate={(d) => updatePortfolio(d)}
      onDelete={(id) => deletePortfolio(id)}
      columnsCountBreakPoints={{ 400: 1, 680: 2, 1000: 3 }}
      variant="content"
      container={PortfolioContainer}
    />
  );
};

const PortfolioContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <t.content value="portfolio">
      <g.container
        style={{
          margin: "-2rem auto 0",
          display: "flex",
          flexDirection: "column",
          gap: "2rem",
        }}
      >
        {children}
      </g.container>
    </t.content>
  );
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
