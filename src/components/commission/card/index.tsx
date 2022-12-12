import { AdminCommissionListSchema } from "service/admin/commission";

// components
import Link from "next/link";

// styles
import * as s from "./styles";
import usePrice from "utils/usePrice";

interface Props extends AdminCommissionListSchema {
  href: string;
}

const CommissionCard = ({
  id,
  descriptionHtml,
  price,
  name,
  miniature,
  href,
}: Props) => {
  const formattedPrice = usePrice(price);

  return (
    <Link href={`${href}/${id}`} passHref>
      <s.container>
        <s.miniature src={miniature} />
        <s.title variant="title-03" color="primary.main">
          {name}
        </s.title>
        <s.description color="text.40">{descriptionHtml}</s.description>
        <s.price variant="title-04" color="text.60">
          {formattedPrice}
        </s.price>
      </s.container>
    </Link>
  );
};

export default CommissionCard;
