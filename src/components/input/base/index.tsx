import { forwardRef } from "react";

// styles
import * as s from "./styles";

export type InputVariant = "contained" | "outlined";
export interface InputBaseProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: InputVariant;
}

const InputBase = forwardRef<HTMLInputElement, InputBaseProps>(
  ({ variant = "contained", ...inputProps }, ref) => {
    return <s.input variant={variant} {...inputProps} ref={ref} />;
  }
);

InputBase.displayName = "InputBase";

export default InputBase;
