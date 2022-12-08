import { usePortfolio } from "service/admin/portfolio";
import { useMutation } from "@tanstack/react-query";
import services from "service";

// styles
import * as t from "components/tabs";
import * as s from "./styles";

// components
import OrderGrid from "components/order/grid";
import AdminSearch from "components/admin/search";
import CommissionsGrid from "components/commission/grid";
import AdminImages from "components/admin/images";
import Container from "components/container";
import Button from "components/button";
import FileCopy2LineIcon from "remixicon-react/FileCopy2LineIcon";

const AdminDashboard = ({ defaultValue }: { defaultValue: string }) => {
  const handleValueChange = (value: string) =>
    window.history.replaceState(
      window.history.state,
      "",
      `/admin/dashboard/${value}`
    );

  return (
    <t.root defaultValue={defaultValue} onValueChange={handleValueChange}>
      <s.tabs_container variant="content">
        <t.list dense>
          <t.trigger value="home">Dashboard</t.trigger>
          <t.trigger value="commissions">Commissions</t.trigger>
          <t.trigger value="portfolio">Portfolio</t.trigger>
        </t.list>
      </s.tabs_container>
      <DashBoard />
      <Portfolio />
      <Commission />
    </t.root>
  );
};

const DashBoard = () => {
  return (
    <t.content value="home">
      <Container variant="content">
        <OrderGrid label="Novos pedidos" />
      </Container>
      <Container>
        <OrderGrid header={<AdminSearch />} />
      </Container>
    </t.content>
  );
};

const Commission = () => {
  const { data: commissions } = services.admin.useCommissionList();

  return (
    <Container>
      <t.content value="commissions" asChild>
        <>
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
        </>
      </t.content>
    </Container>
  );
};

const Portfolio = () => {
  const { data: images, refetch } = usePortfolio();
  const { mutate: insertPortfolio, isLoading: isInserting } = useMutation(
    services.admin.insertPortfolio,
    {
      onSuccess: () => {
        refetch();

        setTimeout(() => {
          window.scrollTo(0, document.body.scrollHeight);
        }, 100);
      },
    }
  );

  const { mutate: updatePortfolio, isLoading: isUpdating } = useMutation(
    services.admin.updatePortfolio,
    {
      onSuccess: () => {
        refetch();
      },
    }
  );

  const { mutate: deletePortfolio, isLoading: isDeleting } = useMutation(
    services.admin.deletePortfolio,
    {
      onSuccess: () => {
        refetch();
      },
    }
  );

  const { mutate: copyCommToPort, isLoading: isCopyingCommToPort } =
    useMutation(services.admin.copyCommToPort, {
      onSuccess: () => {
        refetch();
      },
    });

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
    >
      <Button
        disabled={isInserting || isUpdating || isDeleting}
        loading={isCopyingCommToPort}
        type="button"
        variant="secondary"
        onClick={() => copyCommToPort()}
      >
        <FileCopy2LineIcon />
      </Button>
    </AdminImages>
  );
};

const PortfolioContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <t.content asChild value="portfolio">
      <s.portfolio_container>{children}</s.portfolio_container>
    </t.content>
  );
};

export default AdminDashboard;
