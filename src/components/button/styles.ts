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
  padding: 0.8rem 1.6rem;
  width: ${({ fullWidth }) => (fullWidth ? "100%" : "auto")};
  border-radius: 0.8rem;
  border: 0.1rem solid transparent;
  font-family: "Poppins";
  font-style: normal;
  font-weight: 500;
  font-size: 1.6rem;
  line-height: 2rem;

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
      user-select: none;
    `};
`;

interface ContentProps {
  loading?: boolean;
}

export const content = styled.span<ContentProps>`
  opacity: ${({ loading }) => (loading ? 0 : 1)};
`;
