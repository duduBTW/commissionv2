import { css } from "@emotion/css";
import { useState } from "react";
import services from "service";
import { mq } from "styles/theme";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import { GetServerSideProps } from "next";
import MobileDetect from "mobile-detect";

// components
import { AristHeaderDense } from "components/artist/header";
import CommissionItem from "components/commission/order";
import LoginCommissionDialog from "components/login/commissionDialog";

// styles
import * as g from "styles/globalStyles";
import styled from "@emotion/styled";

const ArtistCommissionPage = ({
  artistId,
  commissionId,
  isMobile,
}: {
  artistId: string;
  commissionId: string;
  isMobile: boolean;
}) => {
  const [loginDialogOpen, setLoginDialogOpen] = useState(false);
  const { data: artist } = services.useArtist(artistId);
  const { data: commission } = services.artist.useCommission(
    artistId,
    commissionId
  );

  if (!artist || !commission) return <div>:(</div>;
  return (
    <>
      <s.paper_container>
        <AristHeaderDense
          {...artist}
          hrefBack={`/artist/${artistId}/commissions`}
        />
      </s.paper_container>
      <CommissionItem
        isMobile={isMobile}
        commission={commission}
        onLoginDialogOpenChange={setLoginDialogOpen}
      />
      <LoginCommissionDialog
        open={loginDialogOpen}
        onOpenChange={setLoginDialogOpen}
      />
    </>
  );
};

const s = {
  paper_container: styled(g.paper_container)`
    background-color: var(--color-content);
    margin-bottom: -2rem;

    ${mq.fromTabletSm} {
      margin-bottom: 0;
      background-color: var(--color-background);
    }
  `,
};

export const getServerSideProps: GetServerSideProps = async ({
  params,
  req,
}) => {
  const artistId = String(params?.artistId);
  const commissionId = String(params?.commissionId);
  const queryClient = new QueryClient();
  const md = new MobileDetect(req.headers["user-agent"] ?? "");

  await queryClient.prefetchQuery(
    [services.artist.useCommissionKey, artistId, commissionId],
    services.artist.getCommission(artistId, commissionId, req.headers)
  );

  await queryClient.prefetchQuery(
    [services.useArtistKey, artistId],
    services.getArtist(artistId, req.headers)
  );

  return {
    props: {
      artistId,
      commissionId,
      dehydratedState: dehydrate(queryClient),
      isMobile: md.phone() !== null || md.mobile() === "UnknownMobile",
    },
  };
};

export default ArtistCommissionPage;
