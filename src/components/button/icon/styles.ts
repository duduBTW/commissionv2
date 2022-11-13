import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { ButtonIconSize, ButtonIconVariant } from ".";

interface ButtonProps {
  variant?: ButtonIconVariant;
  size?: ButtonIconSize;
}
export const button = styled.button<ButtonProps>`
  ${({ size }) => {
    switch (size) {
      case "small":
        return css`
          padding: 0.4rem;
          margin: -0.4rem;
        `;

      default:
        return css`
          padding: 0.8rem;
          margin: -0.8rem;
        `;
    }
  }}
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
