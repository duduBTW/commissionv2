import { dehydrate, QueryClient } from "@tanstack/react-query";
import ProfileOrderComplete from "components/profile/order/complete";
import { GetServerSideProps } from "next";
import services from "service";

const OrderPage = ({
  params,
}: {
  params: {
    orderId: string;
  };
}) => {
  return <ProfileOrderComplete orderId={params.orderId} />;
};

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

export default OrderPage;
