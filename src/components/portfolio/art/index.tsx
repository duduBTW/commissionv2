// styles
import { PortfolioItemSchema } from "service/artist/portfolio";

//
import * as s from "./styles";

// components
import CommissionCard from "components/commission/card";

const PortfolioArt = ({ portfolio }: { portfolio: PortfolioItemSchema }) => {
  return (
    <s.container>
      <s.art src={portfolio.url} />
      {/* <s.card>
        <CommissionCard />
      </s.card> */}
    </s.container>
  );
};

export default PortfolioArt;
