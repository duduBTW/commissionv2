import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { colors, mq } from "./theme";

const globalStyles = css`
  :root {
    --color-primary: ${colors.primary.main};
    --color-primary-d: ${colors.primary.dark};
    --color-primary-l: ${colors.primary.light};
    --color-background: ${colors.background};
    --color-content: ${colors.content};
    --color-divider: ${colors.divider};
    --color-success: ${colors.success.main};

    --color-error: ${colors.error.main};
    --color-error-d: ${colors.error.dark};
    --color-error-l: ${colors.error.light};

    --color-text-80: ${colors.text["80"]};
    --color-text-60: ${colors.text["60"]};
    --color-text-40: ${colors.text["40"]};
    --color-text-20: ${colors.text["20"]};
  }
`;

export type ContainerVariant = "content" | "background";

const getBackgroundContainer = (variant: ContainerVariant | undefined) => {
  switch (variant) {
    case "content":
      return "var(--color-content)";
    case "background":
      return "var(--color-background)";
    default:
      return "var(--color-background)";
  }
};

interface ContainerProps {
  variant?: ContainerVariant;
}

export const with_background = styled.div<ContainerProps>`
  position: relative;
`;

export const container = styled.div<ContainerProps>`
  width: 100vw;
  padding: 2rem;
  background: ${({ variant }) => getBackgroundContainer(variant)};

  ${mq.fromDesktopSm} {
    padding: 2rem 20rem;
  }
`;

export const paper_divider = styled.div`
  height: 0.1rem;
  width: calc(100% + 4rem);
  margin: 0 -2rem;
  background-color: var(--color-divider);

  ${mq.fromTabletSm} {
    width: calc(100% + 4.8rem);
    margin: 0 -2.4rem;
  }
`;

interface PaperProps {
  loading?: boolean;
  size?: "small" | "medium";
}

export const paper_container = styled.div<PaperProps>`
  display: flex;
  margin: 0;
  width: 100%;
  padding: 2rem 2rem;

  ${mq.fromMobileLg} {
    width: 100%;
  }

  ${mq.fromTabletSm} {
    padding: 0;
    max-width: ${({ size }) => {
      switch (size) {
        case "medium":
          return "64rem";
        case "small":
          return "40rem";

        default:
          return "64rem";
      }
    }};
    margin: 2rem auto;
  }
`;

export const paper = styled(paper_container)<PaperProps>`
  background: var(--color-content);
  border-radius: 0.8rem;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;

  ${mq.fromTabletSm} {
    padding: 2rem 2.4rem;
  }

  ${({ loading }) =>
    loading &&
    css`
      pointer-events: none;
      user-select: none;
      position: relative;

      &::before {
        content: "";
        z-index: 2;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: var(--color-content);
        opacity: 0.6;
      }
    `};
`;

export default globalStyles;
