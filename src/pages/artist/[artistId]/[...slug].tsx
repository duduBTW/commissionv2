import services from "service";
import { GetServerSideProps } from "next";
import { dehydrate, QueryClient } from "@tanstack/react-query";

// components
import AristHeader from "components/artist/header";
import ArtistProfile from "components/artist/profile";

const AristPage = ({
  defaultValue,
  artistId,
}: {
  defaultValue: string;
  artistId: string;
}) => {
  const { data: artist } = services.useArtist(artistId);

  if (!artist) return <></>;
  return (
    <>
      <AristHeader {...artist} />
      <ArtistProfile artistId={artistId} defaultValue={defaultValue} />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  query,
  params,
  req,
}) => {
  const artistId = String(params?.artistId);
  const selectedTab = String(query.slug?.[0] ?? "commissions");
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(
    [services.useArtistKey, artistId],
    services.getArtist(artistId, req.headers)
  );

  if (selectedTab === "commissions") {
    await queryClient.prefetchQuery(
      [services.artist.useCommissionListKey, artistId],
      services.artist.getCommissionList(artistId, req.headers)
    );
  }

  if (selectedTab === "portfolio") {
    await queryClient.prefetchQuery(
      [services.artist.usePortfolioListKey, artistId],
      services.artist.getPortfolioList(artistId, req.headers)
    );
  }

  return {
    props: {
      artistId,
      defaultValue: selectedTab,
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default AristPage;
