import styled from "@emotion/styled";
import { InputVariant } from ".";

interface InputProps {
  variant?: InputVariant;
}
export const input = styled.input<InputProps>`
  transition: box-shadow 0.1s ease-in-out;
  border: ${({ variant }) =>
    variant === "outlined" ? "0.1rem solid var(--color-divider)" : "none"};
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
  line-height: 2rem;
  letter-spacing: 0.02em;

  &:focus {
    border-color: var(--color-primary);
    box-shadow: 0 0 0.2rem var(--color-primary);
  }
`;
