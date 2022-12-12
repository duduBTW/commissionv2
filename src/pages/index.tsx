import type { GetServerSideProps, NextPage } from "next";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import services from "service";

// components
import OrderGrid from "components/order/grid";
import ArtistGrid from "components/artist/grid";
import Container from "components/container";
import OrderCard from "components/order/card";

const Home: NextPage = () => {
  const { data: artists } = services.useArtistList();
  const { data: orders } = services.profile.useOrderList();

  if (!artists) return <></>;

  return (
    <>
      {orders && Boolean(orders.length > 0) && (
        <Container variant="content">
          <OrderGrid orders={orders} label="Meus pedidos">
            {({ id, commission, type, artist }) => (
              <OrderCard
                href={`/profile/order/${id}`}
                backgroundImage={commission.images[0]?.url}
                type={type}
                name={commission.name}
                key={id}
                user={artist.users[0]}
              />
            )}
          </OrderGrid>
        </Container>
      )}
      <Container>
        <ArtistGrid artists={artists} label="Artistas" />
      </Container>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(
    [services.useArtistListKey],
    services.getArtistList(req.headers)
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default Home;
