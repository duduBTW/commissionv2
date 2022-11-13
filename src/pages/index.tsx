import type { NextPage } from "next";

// components
import OrderGrid from "components/order/grid";
import ArtistGrid from "components/artist/grid";
import Container from "components/container";

const Home: NextPage = () => {
  return (
    <>
      <Container variant="content">
        <OrderGrid label="Meus pedidos" />
      </Container>
      <Container>
        <ArtistGrid label="Artistas populares" />
        <div style={{ height: "2rem" }}></div>
        <ArtistGrid label="Artistas novos" />
      </Container>
    </>
  );
};

export default Home;
