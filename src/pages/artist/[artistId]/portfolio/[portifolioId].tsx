// components
import { AristHeaderDense } from "components/artist/header";
import Container from "components/container";
import PortfolioArt from "components/portfolio/art";

const ArtistPortfolioPage = () => {
  return (
    <Container>
      <AristHeaderDense hrefBack="/artist/1/portfolio" />
      <PortfolioArt />
    </Container>
  );
};

export default ArtistPortfolioPage;
