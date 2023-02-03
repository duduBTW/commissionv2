// styles
import * as s from "./styles";

// components
import Button from "components/button";
import Link from "next/link";
import * as tabs from "components/tabs";
import Container from "components/container";
import services from "service";
import Typography from "components/typography";
import { format } from "date-fns";

const DashboardContract = () => {
  const { data: contracts, isLoading } = services.admin.useContractList();
  const hasContracts = contracts && contracts.length > 0;

  if (isLoading) return <></>;
  return (
    <tabs.content value="contract" asChild>
      <Container padding="3.2rem 2rem">
        {hasContracts ? (
          <div>
            <Link href={`/admin/contract/create`}>
              <s.create_button variant="secondary">
                Novo contrato vazio
              </s.create_button>
            </Link>
            <s.contract_grid>
              {contracts.map((contract) => (
                <ContractCard {...contract} key={contract.id} />
              ))}
            </s.contract_grid>
          </div>
        ) : (
          <DashboardContractEmpty />
        )}
      </Container>
    </tabs.content>
  );
};

const ContractCard = ({
  id,
  createdAt,
  active,
}: {
  id: string;
  createdAt: string;
  active: boolean;
}) => {
  return (
    <Link href={`/admin/contract/${id}`} passHref>
      <a>
        <s.contract_card>
          <Typography variant="title-04">
            Salvo {format(new Date(createdAt), "dd/MM/yyyy")}
          </Typography>

          <Typography
            variant="subtitle-02"
            color={active ? "success.main" : "text.40"}
          >
            {active ? "Ativo" : "Inativo"}
          </Typography>
        </s.contract_card>
      </a>
    </Link>
  );
};

const DashboardContractEmpty = () => {
  return (
    <div>
      <s.empty_title variant="title-02">Nenhum contrato</s.empty_title>
      <s.empty_description variant="body-01" color="text.40">
        Adicione um contrato com os seus termos de serviço, esses termos serao
        exibidos antes do pedido de qualquer commission.
      </s.empty_description>
      <Link href="/admin/contract/create" passHref>
        <Button>Criar</Button>
      </Link>
    </div>
  );
};

export default DashboardContract;
