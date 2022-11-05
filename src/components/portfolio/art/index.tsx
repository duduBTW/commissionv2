// styles
import * as s from "./styles";

// components
import CommissionCard from "components/commission/card";

const PortfolioArt = () => {
  return (
    <s.container>
      <s.art src="https://pbs.twimg.com/media/FZNGHRbacAAo5sy?format=jpg&name=large" />
      <s.card>
        <CommissionCard />
      </s.card>
    </s.container>
  );
};

export default PortfolioArt;
