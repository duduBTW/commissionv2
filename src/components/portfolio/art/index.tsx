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
      <s.card>
        <CommissionCard
          descriptionHtml=""
          id="1"
          name="Teste"
          price={100}
          href="/"
          miniature="https://pbs.twimg.com/media/FUuGgyaaQAAGCfu?format=jpg&name=large"
        />
      </s.card>
    </s.container>
  );
};

export default PortfolioArt;
