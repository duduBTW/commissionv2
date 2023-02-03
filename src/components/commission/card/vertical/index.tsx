import usePrice from "utils/usePrice";

// styles
import * as s from "./styles";

export const CommissionCardVertical = ({
  name,
  price,
  image,
}: {
  price: number;
  image?: string;
  name: string;
}) => {
  const priceFormatted = usePrice(price);

  return (
    <s.container>
      {image && <s.image src={image} />}
      <s.figure_name variant="title-02">{name}</s.figure_name>
      <s.figure_price variant="price" color="success.main">
        {priceFormatted}
      </s.figure_price>
    </s.container>
  );
};

export const CommissionCardVerticalDense = ({
  name,
  price,
  image,
}: {
  price: number;
  image?: string;
  name: string;
}) => {
  const priceFormatted = usePrice(price);

  return (
    <s.container_dense>
      <s.figure_name variant="title-04">{name}</s.figure_name>
      <s.figure_price variant="body-01" color="success.main">
        {priceFormatted}
      </s.figure_price>
      <s.dense_spacer />
      {image && <s.image_dense src={image} />}
    </s.container_dense>
  );
};

export default CommissionCardVertical;
