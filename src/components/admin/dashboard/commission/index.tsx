import services from "service";

// styles
import * as s from "./styles";

// components
import * as tabs from "components/tabs";
import Container from "components/container";
import CommissionsGrid from "components/commission/grid";
import Button from "components/button";
import Link from "next/link";

const DashboardCommission = () => {
  const { data: commissions } = services.admin.useCommissionList();
  const hasCommissions = commissions && Boolean(commissions.length > 0);

  return (
    <Container padding="0 2rem">
      <tabs.content value="commissions" asChild>
        {hasCommissions ? (
          <>
            <s.admin_search createHref={"/admin/commissions/create"} />
            <CommissionsGrid
              href="/admin/commissions"
              commissions={commissions}
            />
          </>
        ) : (
          <DashboardCommissionEmpty />
        )}
      </tabs.content>
    </Container>
  );
};

const DashboardCommissionEmpty = () => {
  return (
    <div>
      <s.empty_title variant="title-02">Nenhuma commission</s.empty_title>
      <s.empty_description variant="body-01" color="text.40">
        Adicione uma commission para comecar a receber pedidos
      </s.empty_description>
      <Link href="/admin/commissions/create" passHref>
        <Button>Criar</Button>
      </Link>
    </div>
  );
};

export default DashboardCommission;
