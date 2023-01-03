import { forwardRef } from "react";

// styles
import * as s from "./styles";

export type InputVariant = "contained" | "outlined";
export interface InputBaseProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: InputVariant;
  error?: boolean;
}

const InputBase = forwardRef<HTMLInputElement, InputBaseProps>(
  ({ variant = "contained", error, ...inputProps }, ref) => {
    return (
      <s.input variant={variant} error={error} {...inputProps} ref={ref} />
    );
  }
);

InputBase.displayName = "InputBase";

export default InputBase;
