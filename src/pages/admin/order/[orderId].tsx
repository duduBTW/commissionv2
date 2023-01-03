import { GetServerSideProps } from "next";
import { z } from "zod";

// components
import AdminOrderCategorys from "components/admin/order/category";
import AdminOrderInformation from "components/admin/order/information";
import AdminOrderProgress from "components/admin/order/progress";
import Container from "components/container";
import * as tabs from "components/tabs";

export interface AdminOrderItemPageParams {
  orderId: string;
}

const AdminOrderItemPage = ({
  params,
}: {
  params: AdminOrderItemPageParams;
}) => {
  return (
    <tabs.root defaultValue="informacoes">
      <Container dense variant="content">
        <tabs.list>
          <tabs.trigger value="informacoes">Informações</tabs.trigger>
          <tabs.trigger value="categorias">Categorias</tabs.trigger>
          <tabs.trigger value="progresso">Progresso</tabs.trigger>
        </tabs.list>
      </Container>
      <tabs.content value="informacoes">
        <AdminOrderInformation {...params} />
      </tabs.content>
      <tabs.content asChild value="categorias">
        <AdminOrderCategorys {...params} />
      </tabs.content>
      <tabs.content value="progresso">
        <AdminOrderProgress {...params} />
      </tabs.content>
    </tabs.root>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  return {
    props: {
      params: {
        orderId: z.string().parse(params?.orderId),
      },
    },
  };
};

export default AdminOrderItemPage;
