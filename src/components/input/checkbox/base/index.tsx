import { CheckboxProps } from "@radix-ui/react-checkbox";

// styles
import * as s from "./styles";

// components
import CheckLineIcon from "remixicon-react/CheckLineIcon";

const CheckBoxBase = (checkboxProps: CheckboxProps) => {
  return (
    <s.root {...checkboxProps}>
      <s.indicator>
        <CheckLineIcon />
      </s.indicator>
    </s.root>
  );
};

export default CheckBoxBase;
