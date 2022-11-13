// components
import { css } from "@emotion/css";
import { AristHeaderDense } from "components/artist/header";
import CommissionOrder from "components/commission/order";

// styles
import * as g from "styles/globalStyles";
import { mq } from "styles/theme";

const ArtistCommissionPage = () => {
  return (
    <>
      <g.paper_container
        className={css`
          background-color: var(--color-content);
          margin-bottom: -2rem;

          ${mq.fromTabletSm} {
            margin-bottom: 0;
            background-color: var(--color-background);
          }
        `}
      >
        <AristHeaderDense hrefBack="/artist/1/commissions" />
      </g.paper_container>
      <CommissionOrder />
    </>
  );
};

export default ArtistCommissionPage;
