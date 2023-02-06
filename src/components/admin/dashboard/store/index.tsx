import services from "service";

// styles
import * as s from "./styles";

// components
import * as tabs from "components/tabs";
import Container from "components/container";
import Button from "components/button";
import Link from "next/link";
import { Rings } from "react-loader-spinner";
import StoreGrid from "components/store/grid";

const DashboardStore = () => {
  const { data: store, isLoading } = services.admin.useMerchList();
  const hasStore = store && store.length > 0;

  function getContent() {
    if (isLoading) {
      return <Rings height="60" width="60" visible />;
    }

    if (!hasStore) {
      return <DashboardStoreEmpty />;
    }

    return (
      <>
        <s.admin_search createHref={"/admin/store/create"} />
        <StoreGrid getHref={(id) => `/admin/store/${id}`} store={store} />
      </>
    );
  }

  return (
    <tabs.content value="store">
      <Container padding="3.2rem 2rem">{getContent()}</Container>
    </tabs.content>
  );
};

const DashboardStoreEmpty = () => {
  return (
    <div>
      <s.empty_title variant="title-02">Nenhum item na loja</s.empty_title>
      <s.empty_description variant="body-01" color="text.40">
        Adicione uma item para mostrar sua merch!
      </s.empty_description>
      <Link href="/admin/store/create" passHref>
        <Button>Criar</Button>
      </Link>
    </div>
  );
};

export default DashboardStore;
