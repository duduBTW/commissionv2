// styles
import * as s from "./styles";

const OrderGrid = <T,>({
  label,
  header,
  orders,
  children,
}: {
  label?: string;
  header?: React.ReactNode;
  orders: T[];
  children: (order: T) => React.ReactElement;
}) => {
  return (
    <>
      {header ? <s.header>{header}</s.header> : null}
      {label ? <s.title variant="subtitle-01">{label}</s.title> : null}
      <s.grid>{orders.map(children)}</s.grid>
    </>
  );
};

export default OrderGrid;
