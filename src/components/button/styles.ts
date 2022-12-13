import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { ButtonVariants } from ".";

interface ButtonProps {
  variant?: ButtonVariants;
  fullWidth?: boolean;
  loading?: boolean;
}

export const button = styled.button<ButtonProps>`
  position: relative;
  cursor: pointer;
  box-sizing: border-box;
  text-align: center;
  padding: 1rem 1.6rem;
  width: ${({ fullWidth }) => (fullWidth ? "100%" : "min-content")};
  border-radius: 1.2rem;
  border: 0.1rem solid transparent;
  font-family: "Poppins";
  font-style: normal;
  font-weight: 500;
  font-size: 1.7rem;
  line-height: 1.7rem;
  user-select: none;

  ${({ variant }) => {
    switch (variant) {
      case "primary":
        return css`
          background: var(--color-primary);
          color: var(--color-content);

          &:hover {
            background: var(--color-primary-d);
          }

          &:focus {
            background: var(--color-primary-d);
            box-shadow: 0 0 0.4rem var(--color-primary);
          }
        `;
      case "secondary":
        return css`
          background: var(--color-primary-l);
          color: var(--color-primary);

          &:hover {
            border-color: var(--color-primary);
          }

          &:focus {
            border-color: var(--color-primary);
            box-shadow: 0 0 0.2rem var(--color-primary);
          }
        `;
    }
  }}

  ${({ loading }) =>
    loading &&
    css`
      pointer-events: none;
      z-index: 3;
    `};

  &:disabled,
  &[disabled] {
    cursor: default;
    border: 1px solid transparent;
    background-color: var(--color-text-20);
    color: var(--color-text-40);
  }
`;

interface ContentProps {
  loading?: boolean;
}

export const content = styled.span<ContentProps>`
  opacity: ${({ loading }) => (loading ? 0 : 1)};
`;
