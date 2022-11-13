// styles
import * as s from "./styles";

export type ButtonIconVariant = "default" | "primary" | "error";
export type ButtonIconSize = "default" | "small";
interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: ButtonIconVariant;
  size?: ButtonIconSize;
}

const ButtonIcon = ({ children, size = "default", ...buttonProps }: Props) => {
  return (
    <s.button size={size} {...buttonProps}>
      {children}
    </s.button>
  );
};

export default ButtonIcon;
