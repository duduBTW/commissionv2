// styles
import * as s from "./styles";

const Grid = <T,>({
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
      {label ? <s.title variant="title-04">{label}</s.title> : null}
      <s.grid>{orders.map(children)}</s.grid>
    </>
  );
};

export default Grid;
