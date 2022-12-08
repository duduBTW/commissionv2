import ArtistCommissionOrder from "components/admin/commission/order";
import { GetServerSideProps } from "next";

const ArtistCommissionOrderPage = ({
  commissionId,
}: {
  commissionId: string;
}) => {
  return <ArtistCommissionOrder commissionId={commissionId} />;
};

ArtistCommissionOrderPage.layout = false;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const commissionId = String(params?.commissionId);

  return {
    props: {
      commissionId,
    },
  };
};

export default ArtistCommissionOrderPage;
