import { Rings } from "react-loader-spinner";

// styles
import * as s from "./styles";

export type ButtonVariants = "primary" | "secondary";
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariants;
  fullWidth?: boolean;
  loading?: boolean;
  children: React.ReactNode;
}

const Button = ({
  children,
  variant = "primary",
  loading = false,
  ...butonProps
}: ButtonProps) => {
  return (
    <s.button variant={variant} loading={loading} {...butonProps}>
      <s.content loading={loading}>{children}</s.content>
      <Rings
        height="40"
        width="40"
        color={
          variant === "primary"
            ? "var(--color-background)"
            : "var(--color-primary)"
        }
        wrapperStyle={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
        wrapperClass=""
        visible={loading}
        ariaLabel="icone-carregando"
      />
    </s.button>
  );
};

export default Button;
