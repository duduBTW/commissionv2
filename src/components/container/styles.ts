import styled from "@emotion/styled";
import { mq } from "styles/theme";
import { ContainerVariant } from ".";

const getBackgroundContainer = (variant: ContainerVariant | undefined) => {
  switch (variant) {
    case "content":
      return "var(--color-content)";
    case "background":
      return "var(--color-background)";
    case "transparent":
      return "transparent";
    default:
      return "var(--color-background)";
  }
};

interface ContainerProps {
  variant?: ContainerVariant;
}

export const container = styled.div<ContainerProps>`
  width: 100vw;
  padding: 2rem;
  background: ${({ variant }) => getBackgroundContainer(variant)};
  position: relative;
`;

export const content = styled.div`
  ${mq.fromDesktopSm} {
    width: 100%;
    max-width: 103.2rem;
    margin: 0 auto;
  }
`;
