import { dehydrate, QueryClient } from "@tanstack/react-query";
import { GetServerSideProps } from "next";
import services from "service";

// components
import { AristHeaderDense } from "components/artist/header";
import Container from "components/container";
import PortfolioArt from "components/portfolio/art";

const ArtistPortfolioPage = ({
  artistId,
  portifolioId,
}: {
  artistId: string;
  portifolioId: string;
}) => {
  const { data: artist } = services.useArtist(artistId);
  const { data: portfolio } = services.artist.usePortfolio(
    artistId,
    portifolioId
  );

  if (!artist || !portfolio) return <div>:(</div>;
  return (
    <Container padding="2rem">
      <AristHeaderDense
        {...artist}
        hrefBack={`/artist/${artistId}/portfolio`}
      />
      <PortfolioArt portfolio={portfolio} />
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  params,
  req,
}) => {
  const artistId = String(params?.artistId);
  const portifolioId = String(params?.portifolioId);
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(
    [services.useArtistKey, artistId],
    services.getArtist(artistId, req.headers)
  );

  await queryClient.prefetchQuery(
    [services.artist.usePortfolioKey, artistId, portifolioId],
    services.artist.getPortfolio(artistId, portifolioId, req.headers)
  );

  return {
    props: {
      artistId,
      portifolioId,
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default ArtistPortfolioPage;
