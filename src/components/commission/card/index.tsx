import { useMemo } from "react";
import { CommissionListSchema } from "service/commission";

// components
import Link from "next/link";

// styles
import * as s from "./styles";

interface Props extends CommissionListSchema {
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
  const formattedPrice = useMemo(
    () =>
      Intl.NumberFormat("pt-br", {
        style: "currency",
        currency: "BRL",
      }).format(price),
    [price]
  );

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
