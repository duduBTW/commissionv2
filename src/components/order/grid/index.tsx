// styles
import * as g from "styles/globalStyles";
import * as s from "./styles";

// components
import OrderCard from "../card";

const OrderGrid = ({
  label,
  header,
}: {
  label?: string;
  header?: React.ReactNode;
}) => {
  return (
    <>
      {header ? <s.header>{header}</s.header> : null}
      {label ? <s.title variant="subtitle-01">{label}</s.title> : null}
      <s.grid>
        <OrderCard />
      </s.grid>
    </>
  );
};

export default OrderGrid;
