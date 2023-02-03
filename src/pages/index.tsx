import type { GetStaticProps, NextPage } from "next";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import services from "service";
import styled from "@emotion/styled";

// components
import Grid from "components/grid";
import Container from "components/container";
import OrderCard from "components/order/card";
import ArtistCard from "components/artist/card";
import Typography from "components/typography";
import { useRouter } from "next/router";

export const getStaticProps: GetStaticProps = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(
    [services.useArtistListKey],
    services.getArtistList()
  );

  const revalidateTime = 5 * 60; // min, sec

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: revalidateTime,
  };
};

const padding = "3.2rem 2rem 2.4rem";
const Home: NextPage = () => {
  const { data: artists } = services.useArtistList();
  const { data: orders } = services.profile.useOrderList();
  const hasOrders = orders && Boolean(orders.length > 0);
  const hasArtists = artists && Boolean(artists.length > 0);
  const { data: session, isLoading: isLoadingProfile } =
    services.profile.useSession();
  const { push } = useRouter();

  if (!isLoadingProfile && session?.user?.admin) {
    push("/admin/dashboard/orders");
  }

  if (!hasArtists && !hasOrders)
    return (
      <s.empty_container>
        <s.empty_image src="https://pbs.twimg.com/media/FlEP5E5aYAUHsyR?format=jpg&name=900x900" />
        <Typography variant="title-03">Nenhum artista cadastrado</Typography>
      </s.empty_container>
    );

  return (
    <>
      {hasOrders && (
        <Container padding={padding} variant="content">
          <Grid orders={orders} label="Meus pedidos">
            {({ id, commission, type, artist }) => (
              <OrderCard
                href={`/profile/order/${id}`}
                backgroundImage={commission.images[0]?.url}
                type={type}
                name={commission.name}
                key={id}
                user={artist.user}
              />
            )}
          </Grid>
        </Container>
      )}
      {hasArtists && (
        <Container padding={padding}>
          <Grid orders={artists} label="Artistas">
            {(artist) => <ArtistCard {...artist} key={artist.id} />}
          </Grid>
        </Container>
      )}
    </>
  );
};

const s = {
  empty_container: styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2.4rem;
    margin: 4rem 0;
  `,
  empty_image: styled.img`
    max-width: 60rem;
    width: 100%;
    border-radius: 1.2rem;
  `,
};

export default Home;
