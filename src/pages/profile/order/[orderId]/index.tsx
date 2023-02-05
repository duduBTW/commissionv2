import services from "service";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import { GetServerSideProps } from "next";

// components
import Container from "components/container";
import * as tabs from "components/tabs";
import OrderProgress from "components/order/progress";
import Typography from "components/typography";
import { AristHeaderDense } from "components/artist/header";
import { Editor } from "components/commission/categorys";

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

  console.log(order?.type);

  switch (order?.type) {
    case "not_approved":
      content = (
        <Typography>
          {order.artist?.user?.userName} entrará em contato com você no{" "}
          <strong>{order?.contact}</strong> para aprovar o pedido.
        </Typography>
      );
      break;

    case "approved":
      content = (
        <>
          <Typography>Pedido aprovado!</Typography>
          <Typography>Utilize essa pagina para checar atualizações.</Typography>
        </>
      );
      break;

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
      <Container mdPadding="0 2rem" variant="content">
        {/* <Typography>{order.commission.name}</Typography> */}
        <tabs.list>
          <tabs.trigger value="progresso">Progresso</tabs.trigger>
          {messages && messages.length > 0 ? (
            <tabs.trigger value="informacoes">Informações</tabs.trigger>
          ) : null}
        </tabs.list>
      </Container>
      <tabs.content desktopMargin="3.2rem 0" asChild value="progresso">
        <Container>
          <g.paper align="left" dense>
            {order.type && <OrderProgress currentStep={order.type} />}
            <div
              style={{
                padding: "0.8rem 0",
              }}
            >
              {content}
            </div>
            {order.artist?.user && (
              <AristHeaderDense
                userName={order.artist.user.userName ?? "Artist"}
                profilePicture={order.artist.user.profilePicture ?? ""}
                hrefBack={`/artist/${order.artist.user.id}/commissions`}
              />
            )}
          </g.paper>
        </Container>
      </tabs.content>
      <tabs.content desktopMargin="1.2rem 0" asChild value="informacoes">
        <Container>
          {messages?.map((message) => (
            <g.paper key={message.id} align="left">
              <div>
                <Typography variant="subtitle-01" color="primary.main">
                  {message.category.name}
                </Typography>
                <div
                  style={{
                    height: "1.2rem",
                  }}
                />
                <Editor
                  content={JSON.parse(message.content)}
                  editable={false}
                />
              </div>
            </g.paper>
          ))}
        </Container>
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
