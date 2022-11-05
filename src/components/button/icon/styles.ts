import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { ButtonIconVariant } from ".";

interface ButtonProps {
  variant?: ButtonIconVariant;
}
export const button = styled.button<ButtonProps>`
  padding: 0.8rem;
  margin: -0.8rem;
  border-radius: 222rem;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover,
  &:focus {
    ${({ variant }) => {
      switch (variant) {
        case "primary":
          return css`
            background-color: var(--color-primary-l);
            color: var(--color-primary);
          `;
        case "error":
          return css`
            background-color: var(--color-error-l);
            color: var(--color-error);
          `;

        default:
          return css`
            background-color: var(--color-text-20);
            color: var(--color-text-80);
          `;
      }
    }}
  }
`;
