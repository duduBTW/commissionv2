import services from "service";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import { GetServerSideProps } from "next";

// components
import Container from "components/container";
import * as tabs from "components/tabs";
import OrderCategotys from "components/order/category";
import OrderProgress from "components/order/progress";
import Typography from "components/typography";
import { AristHeaderDense } from "components/artist/header";

// styles
import * as g from "styles/globalStyles";
import styled from "@emotion/styled";

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const orderId = String(params?.orderId);
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(
    [services.profile.useOrderKey, orderId],
    services.profile.getOrder(orderId)
  );

  return {
    props: {
      params: { orderId },
      dehydratedState: dehydrate(queryClient),
    },
  };
};

const OrderPage = ({
  params,
}: {
  params: {
    orderId: string;
  };
}) => {
  const { data: order } = services.profile.useOrder(params.orderId);
  const { data: messages } = services.profile.useOrderMessages(params.orderId);
  let content = <></>;
  if (!order || !order.commission || !order.artist) return <></>;

  switch (order?.type) {
    case "not_approved":
      content = (
        <Typography>
          {order.artist?.users[0]?.userName} entrará em contato com você no
          discord <strong>{order?.discord}####</strong> para aprovar o pedido.
        </Typography>
      );
    case "approved":
      content = (
        <>
          <Typography>Pedido aprovado!</Typography>
          <Typography>Utilize essa pagina para checar atualizações.</Typography>
        </>
      );

    default:
      content = (
        <s.progress_content
          dangerouslySetInnerHTML={{
            __html:
              order?.progress?.find(
                (progressItem) => progressItem.id === order.currentTypeId
              )?.html ?? "",
          }}
        />
      );
  }

  return (
    <tabs.root defaultValue="progresso">
      <Container variant="content">
        <Typography>{order.commission.name}</Typography>
        <tabs.list>
          <tabs.trigger value="progresso">Progresso</tabs.trigger>
          {messages?.categorys && messages?.categorys.length > 0 ? (
            <tabs.trigger value="informacoes">Informações</tabs.trigger>
          ) : null}
        </tabs.list>
      </Container>
      <tabs.content asChild value="progresso">
        <Container>
          <g.paper align="left" dense>
            {order.type && order.commission?.steps && (
              <OrderProgress
                currentStep={order.type}
                steps={order.commission.steps}
              />
            )}
            <div
              style={{
                padding: "0.8rem 0",
              }}
            >
              {content}
            </div>
            {order.artist?.users[0] && (
              <AristHeaderDense
                userName={order.artist.users[0].userName ?? "Artist"}
                profilePicture={order.artist.users[0].profilePicture ?? ""}
                hrefBack={`/artist/${order.artist.users[0].id}/commissions`}
              />
            )}
          </g.paper>
        </Container>
      </tabs.content>
      <tabs.content value="informacoes">
        {messages && (
          <OrderCategotys
            categorys={messages.categorys}
            content={messages.content}
            defaultValue={messages.categorys[0]?.id}
          />
        )}
      </tabs.content>
    </tabs.root>
  );
};

const s = {
  progress_content: styled.div`
    ${g.html}
  `,
};

export default OrderPage;
