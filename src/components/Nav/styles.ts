import styled from "@emotion/styled";
import { mq } from "styles/theme";
import { LogoSize } from ".";

export const nav = styled.nav`
  height: 6rem;
  padding: 0.4rem 2rem;
  align-items: center;
  background: var(--color-content);
  display: flex;
  justify-content: space-between;
  align-items: center;

  ${mq.fromTabletSm} {
    padding: 1.2rem 2rem;
  }

  ${mq.fromDesktopSm} {
    padding-right: 2.4rem;
  }
`;

interface LogoProps {
  size: LogoSize;
}
export const logo = styled.img<LogoProps>`
  height: ${({ size }) => {
    switch (size) {
      case "medium":
        return "2.8rem";

      case "small":
        return "2.4rem";

      default:
        break;
    }
  }};
`;

export const user = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;
