// styles
import Typography from "components/typography";
import Link from "next/link";
import usePrice from "utils/usePrice";
import * as s from "./styles";

export interface Merch {
  id: string;
  name: string;
  active: boolean;
  price: number;
  url: string;
  miniature: string;
}

const StoreCard = ({
  getHref,
  url,
  id,
  name,
  miniature,
  price,
}: {
  getHref?: (id: string) => string;
} & Merch) => {
  const formattedPrice = usePrice(price);

  return (
    <Link href={getHref ? getHref(id) : url}>
      <a target={getHref ? undefined : "_blank"}>
        <s.container>
          <s.miniature src={miniature} alt="" />
          <Typography center variant="title-03">
            {name}
          </Typography>
          <s.prince center variant="subtitle-01" color="success.main">
            {formattedPrice}
          </s.prince>
        </s.container>
      </a>
    </Link>
  );
};

export default StoreCard;
