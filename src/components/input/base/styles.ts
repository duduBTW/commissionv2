import { css } from "@emotion/css";
import styled from "@emotion/styled";
import { InputVariant } from ".";

interface InputProps {
  variant?: InputVariant;
  error?: boolean;
}
export const input = styled.input<InputProps>`
  transition: box-shadow 0.1s ease-in-out;
  border: ${({ variant, error }) => {
    if (variant === "outlined") {
      const borderColor = error ? "var(--color-error)" : "var(--color-divider)";

      return `0.1rem solid ${borderColor}`;
    }

    return "none";
  }};
  outline: none;
  box-sizing: border-box;
  width: 100%;
  padding: 0.8rem 1.2em;
  border-radius: 0.8rem;
  background-color: var(--color-content);
  color: var(--color-text-80);

  font-family: "Nunito";
  font-style: normal;
  font-weight: 400;
  font-size: 1.4rem;
  line-height: 1.4rem;
  letter-spacing: 0.02em;

  &:focus {
    border-color: var(--color-primary);
    box-shadow: 0 0 0.2rem var(--color-primary);
  }
`;
