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
  dense?: boolean;
  padding?: string;
  mdPadding?: string;
}

export const container = styled.div<ContainerProps>`
  padding: ${({ padding, mdPadding }) => mdPadding ?? padding};
  /* padding: ${({ dense }) => (dense ? "0" : "2.4rem 2rem")}; */
  background: ${({ variant }) => getBackgroundContainer(variant)};
  position: relative;

  ${mq.fromDesktopSm} {
    padding: ${({ padding }) => padding};
    /* padding: ${({ dense }) => (dense ? "0" : "2.4rem")}; */
  }
`;

export const content = styled.div`
  ${mq.fromDesktopSm} {
    width: 100%;
    max-width: 103.2rem;
    margin: 0 auto;
  }
`;
