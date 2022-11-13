// components
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import Link from "next/link";

// styles
import * as s from "./styles";

const PortfolioGrid = ({ header }: { header?: React.ReactNode }) => {
  return (
    <s.container value="portfolio">
      {header ? <s.header>{header}</s.header> : null}
      <ResponsiveMasonry columnsCountBreakPoints={{ 546: 2, 768: 3, 900: 3 }}>
        <Masonry gutter="1.2rem">
          <Link href="/artist/1/portfolio/1">
            <s.imagem_container>
              <s.img
                src="https://pbs.twimg.com/media/FgDXlq2agAA6uq6?format=jpg&name=large"
                alt=""
              />
            </s.imagem_container>
          </Link>
          {/* <s.imagem_container>
            <s.img
              src="https://pbs.twimg.com/media/FgOI12paAAEENhV?format=jpg&name=medium"
              alt=""
            />
          </s.imagem_container>
          <s.imagem_container>
            <s.img
              src="https://pbs.twimg.com/media/FgDslOYUUAEphsv?format=jpg&name=4096x4096"
              alt=""
            />
          </s.imagem_container>
          <s.imagem_container>
            <s.img
              src="https://pbs.twimg.com/media/FfRFlKhUoAEV22U?format=jpg&name=large"
              alt=""
            />
          </s.imagem_container>
          <s.imagem_container>
            <s.img
              src="https://pbs.twimg.com/media/FaHDtjlacAA9fnU?format=png&name=900x900"
              alt=""
            />
          </s.imagem_container>
          <s.imagem_container>
            <s.img
              src="https://pbs.twimg.com/media/FgJdQG-UUAIBY03?format=jpg&name=4096x4096"
              alt=""
            />
          </s.imagem_container>
          <s.imagem_container>
            <s.img
              src="https://pbs.twimg.com/media/FfnzfNoVEAASnQ-?format=jpg&name=medium"
              alt=""
            />
          </s.imagem_container> */}
        </Masonry>
      </ResponsiveMasonry>
    </s.container>
  );
};

export default PortfolioGrid;
