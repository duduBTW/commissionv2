import { css } from "@emotion/react";
import styled from "@emotion/styled";
import * as Tabs from "@radix-ui/react-tabs";

export const container = styled(Tabs.List)`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  position: relative;
  &::before {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0.8rem;
    width: 0.2rem;
    left: 0.3rem;
    background-color: var(--color-divider);
  }
`;

export const item = styled(Tabs.Trigger)`
  display: flex;
  align-items: center;
  gap: 1.6rem;
  padding: 0.4rem;
  margin: -0.4rem;
  border-radius: 1.2rem;
  cursor: pointer;

  &:hover {
    background-color: var(--color-text-20);
  }
`;

interface IndicatorProps {
  variant: "selected" | "filled" | "default";
}
export const indicator = styled.div<IndicatorProps>`
  z-index: 2;
  width: 0.8rem;
  border-radius: 2222rem;
  height: 0.8rem;
  border: 0.1rem solid transparent;

  ${({ variant }) => {
    switch (variant) {
      case "filled":
        return css`
          background-color: var(--color-content);
          border-color: var(--color-success);
        `;
      case "selected":
        return css`
          background-color: var(--color-primary);
        `;

      default:
        return css`
          border-color: var(--color-divider);
          background-color: var(--color-primary-l);
        `;
    }
  }}
`;
