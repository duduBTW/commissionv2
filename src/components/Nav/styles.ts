import styled from "@emotion/styled";
import { mq } from "styles/theme";

export const nav = styled.nav`
  padding: 1.2rem 2rem;
  background: var(--color-content);
  display: flex;
  justify-content: space-between;

  ${mq.fromTabletSm} {
    padding: 1.2rem 2.4rem;
  }

  ${mq.fromDesktopSm} {
    padding-right: 4rem;
  }
`;

export const logo = styled.img`
  height: 4rem;
`;

export const user = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;
