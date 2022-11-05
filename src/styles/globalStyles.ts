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
  background: ${({ variant }) => getBackgroundContainer(variant)};
  position: relative;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    height: 100%;
    left: -50vw;
    right: -50vw;
    background: ${({ variant }) => getBackgroundContainer(variant)};
    z-index: -1;
  }
`;

export const container = styled(with_background)<ContainerProps>`
  width: 100vw;
  padding: 2rem;

  ${mq.fromDesktopSm} {
    max-width: 103.2rem;
    margin: 0 auto;
  }
`;

export const paper_container = styled.div`
  display: flex;
  max-width: 64rem;
  margin: 2rem 2rem 0;
  width: calc(100% - 4rem);

  ${mq.fromMobileLg} {
    width: 100%;
    margin: 2rem auto 0;
  }
`;

interface PaperProps {
  loading?: boolean;
}

export const paper = styled(paper_container)<PaperProps>`
  background: var(--color-content);
  border-radius: 0.8rem;
  padding: 2.4rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;

  ${({ loading }) =>
    loading &&
    css`
      pointer-events: none;
      user-select: none;
      position: relative;

      &::before {
        content: "";
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
