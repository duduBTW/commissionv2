// styles
import * as s from "./styles";

export type ButtonIconVariant = "default" | "primary" | "error";
interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: ButtonIconVariant;
}

const ButtonIcon = ({ children, ...buttonProps }: Props) => {
  return <s.button {...buttonProps}>{children}</s.button>;
};

export default ButtonIcon;
