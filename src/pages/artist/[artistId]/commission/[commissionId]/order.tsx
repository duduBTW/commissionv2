import { GetServerSideProps, NextPage } from "next";

// components
import ArtistCommissionOrder from "components/admin/commission/order";

interface ArtistCommissionOrderPageProps {
  params: ArtistCommissionOrderParams;
}

export interface ArtistCommissionOrderParams {
  commissionId: string;
  artistId: string;
}

const ArtistCommissionOrderPage = ({
  params,
}: ArtistCommissionOrderPageProps) => {
  return <ArtistCommissionOrder {...params} />;
};

export const getServerSideProps: GetServerSideProps<
  ArtistCommissionOrderPageProps
> = async ({ params }) => {
  const commissionId = String(params?.commissionId);
  const artistId = String(params?.artistId);

  return {
    props: {
      params: { commissionId, artistId },
    },
  };
};

export default ArtistCommissionOrderPage;
