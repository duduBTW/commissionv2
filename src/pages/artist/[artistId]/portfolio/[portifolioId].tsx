import { AristHeaderDense } from "components/artist/header";
import PortfolioArt from "components/portfolio/art";
import * as g from "styles/globalStyles";

const ArtistPortfolioPage = () => {
  return (
    <g.container>
      <AristHeaderDense />
      <PortfolioArt />
    </g.container>
  );
};

export default ArtistPortfolioPage;
