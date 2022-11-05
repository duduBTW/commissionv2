import { GetServerSideProps } from "next";

// components
import AristHeader from "components/artist/header";
import ArtistProfile from "components/artist/profile";

const AristPage = ({ defaultValue }: { defaultValue: string }) => {
  return (
    <>
      <AristHeader />
      <ArtistProfile defaultValue={defaultValue} />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  return {
    props: {
      defaultValue: String(query.slug?.[0] ?? "commissions"),
    },
  };
};

export default AristPage;
