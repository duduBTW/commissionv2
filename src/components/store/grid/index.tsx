// styles
import * as s from "./styles";

// components
import StoreCard from "../card";
import type { Merch } from "../card";

const StoreGrid = ({
  store,
  getHref,
}: {
  getHref?: (id: string) => string;
  store: Merch[];
}) => {
  return (
    <s.container>
      {store.map((merch) => (
        <StoreCard getHref={getHref} key={merch.id} {...merch} />
      ))}
    </s.container>
  );
};

export default StoreGrid;
