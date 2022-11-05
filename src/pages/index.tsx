import type { NextPage } from "next";
import * as g from "styles/globalStyles";

// components
import OrderGrid from "components/order/grid";
import ArtistGrid from "components/artist/grid";

const Home: NextPage = () => {
  return (
    <>
      <g.container variant="content">
        <OrderGrid label="Meus pedidos" />
      </g.container>
      <g.container>
        <ArtistGrid label="Artistas populares" />
        <div style={{ height: "2rem" }}></div>
        <ArtistGrid label="Artistas novos" />
      </g.container>
    </>
  );
};

export default Home;
