// components
import AdminOrderCategorys from "components/admin/order/category";
import AdminOrderInformation from "components/admin/order/information";
import Container from "components/container";
import * as tabs from "components/tabs";

const AdminOrderItemPage = () => {
  return (
    <tabs.root defaultValue="informacoes">
      <Container variant="content">
        <tabs.list>
          <tabs.trigger value="informacoes">Informações</tabs.trigger>
          <tabs.trigger value="categorias">Categorias</tabs.trigger>
          <tabs.trigger value="progresso">Progresso</tabs.trigger>
        </tabs.list>
      </Container>
      <tabs.content value="informacoes">
        <AdminOrderInformation />
      </tabs.content>
      <tabs.content value="categorias">
        <AdminOrderCategorys />
      </tabs.content>
    </tabs.root>
  );
};

export default AdminOrderItemPage;
