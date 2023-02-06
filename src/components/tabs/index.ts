import styled from "@emotion/styled";
import * as Tabs from "@radix-ui/react-tabs";
import { ContainerVariant } from "styles/globalStyles";
import { mq } from "styles/theme";

interface ListProps {
  dense?: boolean;
  variant?: ContainerVariant;
}

const getBackgroundContainer = (variant: ContainerVariant | undefined) => {
  switch (variant) {
    case "content":
      return "var(--color-content)";
    case "background":
      return "var(--color-background)";
    default:
      return "var(--color-content)";
  }
};

export const list = styled(Tabs.List)<ListProps>`
  display: flex;
  /* margin: -2rem -2rem ${({ dense }) => (dense ? "-2rem" : "2rem")}; */
  margin: 0 -2rem;
  background: ${({ variant }) => getBackgroundContainer(variant)};

  ${mq.fromDesktopSm} {
    position: relative;

    &::before {
      content: "";
      position: absolute;
      top: 0;
      height: 100%;
      left: -100vw;
      right: -100vw;
      z-index: -1;
      background: ${({ variant }) => getBackgroundContainer(variant)};
    }
  }
`;

export const trigger = styled(Tabs.Trigger)`
  all: unset;
  padding: 0.8rem 2rem;
  position: relative;
  font-family: "Poppins";
  font-style: normal;
  font-weight: 700;
  font-size: 1.4rem;
  line-height: 2.2rem;
  color: var(--color-text-40);
  border-radius: 1.2rem;

  &:hover,
  &:focus {
    background: var(--color-primary-l);
  }

  &[data-state="active"] {
    color: var(--color-primary);

    &::before {
      content: "";
      position: absolute;
      width: 4rem;
      bottom: -0.2rem;
      height: 0.2rem;
      left: 1.2rem;
      border-radius: 222rem;
      background-color: var(--color-primary);
      z-index: 2;
    }
  }
`;

interface ContentProps {
  desktopMargin?: string;
  mobileMargin?: string;
}
export const content = styled(Tabs.Content)<ContentProps>`
  height: 100%;
  margin: ${({ mobileMargin }) => mobileMargin ?? "0rem"};

  ${mq.fromTabletMd} {
    margin: ${({ desktopMargin }) => desktopMargin};
  }
`;
export const root = styled(Tabs.Root)`
  height: 100%;
`;
