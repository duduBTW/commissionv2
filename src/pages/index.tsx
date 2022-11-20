import type { GetServerSideProps, NextPage } from "next";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import services from "service";

// components
import OrderGrid from "components/order/grid";
import ArtistGrid from "components/artist/grid";
import Container from "components/container";

const Home: NextPage = () => {
  const { data: artists } = services.useArtistList();

  if (!artists) return <></>;
  return (
    <>
      <Container variant="content">
        <OrderGrid label="Meus pedidos" />
      </Container>
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
