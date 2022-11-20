import { useMemo } from "react";

const usePrice = (price: number) =>
  useMemo(
    () =>
      Intl.NumberFormat("pt-br", {
        style: "currency",
        currency: "BRL",
      }).format(price),
    [price]
  );

export default usePrice;
