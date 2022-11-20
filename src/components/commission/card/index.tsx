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
    <Link href={`${href}/${id}`}>
      <a>
        <s.container>
          <s.miniature src={miniature} />
          <s.title variant="title-04">{name}</s.title>
          <s.description color="text.40">{descriptionHtml}</s.description>
          <s.price color="success.main">{formattedPrice}</s.price>
        </s.container>
      </a>
    </Link>
  );
};

export default CommissionCard;
