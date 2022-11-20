import { PortfolioListSchema } from "service/artist/portfolio";

// components
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import Link from "next/link";
import { LazyImage } from "components/admin/images";

// styles
import * as s from "./styles";

const PortfolioGrid = ({
  header,
  portfolio,
  artistId,
}: {
  header?: React.ReactNode;
  portfolio: PortfolioListSchema[];
  artistId: string;
}) => {
  return (
    <s.container value="portfolio">
      {header ? <s.header>{header}</s.header> : null}
      <ResponsiveMasonry columnsCountBreakPoints={{ 546: 2, 768: 3, 900: 3 }}>
        <Masonry gutter="1.2rem">
          {portfolio.map((portfolioImage) => (
            <Link
              key={portfolioImage.id}
              href={`/artist/${artistId}/portfolio/${portfolioImage.id}`}
            >
              <a>
                <LazyImage variant="background" image={portfolioImage} />
              </a>
            </Link>
          ))}
        </Masonry>
      </ResponsiveMasonry>
    </s.container>
  );
};

export default PortfolioGrid;
