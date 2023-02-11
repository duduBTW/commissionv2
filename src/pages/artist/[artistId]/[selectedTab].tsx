import services from "service";
import { GetServerSideProps } from "next";
import { dehydrate, QueryClient } from "@tanstack/react-query";

// components
import AristHeader from "components/artist/header";
import ArtistProfile from "components/artist/profile";
import styled from "@emotion/styled";

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const artistId = String(params?.artistId);
  const selectedTab = String(params?.selectedTab ?? "commissions");
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(
    [services.useArtistKey, artistId],
    services.getArtist(artistId)
  );

  if (selectedTab === "commissions") {
    await queryClient.prefetchQuery(
      [services.artist.useCommissionListKey, artistId],
      services.artist.getCommissionList(artistId)
    );
  }

  if (selectedTab === "portfolio") {
    await queryClient.prefetchQuery(
      [services.artist.usePortfolioListKey, artistId],
      services.artist.getPortfolioList(artistId)
    );
  }

  return {
    props: {
      artistId,
      selectedTab: selectedTab,
      dehydratedState: dehydrate(queryClient),
    },
  };
};
// export const getStaticPaths = async () => {
//   const getArtistList = services.getArtistList();

//   const artists = await getArtistList();

//   return {
//     paths: artists.flatMap((artist) =>
//       ["commissions", "portfolio"].map((selectedTab) => ({
//         params: {
//           artistId: artist.id,
//           selectedTab,
//         },
//       }))
//     ),
//     fallback: false,
//   };
// };

// export const getStaticProps: GetStaticProps = async ({ params }) => {
//   const artistId = String(params?.artistId);
//   const selectedTab = String(params?.selectedTab ?? "commissions");
//   const queryClient = new QueryClient();

//   await queryClient.prefetchQuery(
//     [services.useArtistKey, artistId],
//     services.getArtist(artistId)
//   );

//   if (selectedTab === "commissions") {
//     await queryClient.prefetchQuery(
//       [services.artist.useCommissionListKey, artistId],
//       services.artist.getCommissionList(artistId)
//     );
//   }

//   if (selectedTab === "portfolio") {
//     await queryClient.prefetchQuery(
//       [services.artist.usePortfolioListKey, artistId],
//       services.artist.getPortfolioList(artistId)
//     );
//   }

//   const revalidateTime = 5 * 60; // min, sec
//   return {
//     props: {
//       artistId,
//       selectedTab: selectedTab,
//       dehydratedState: dehydrate(queryClient),
//     },
//     revalidate: revalidateTime,
//   };
// };

const AristPage = ({
  selectedTab,
  artistId,
}: {
  selectedTab: string;
  artistId: string;
}) => {
  return (
    <>
      <AristHeader artistId={artistId} />
      <ArtistProfile artistId={artistId} selectedTab={selectedTab} />
    </>
  );
};

export default AristPage;
