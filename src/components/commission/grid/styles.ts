import styled from "@emotion/styled";
import { mq } from "styles/theme";

export const container = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 0.8rem;

  ${mq.fromTabletSm} {
    gap: 1.2rem;
    grid-template-columns: repeat(2, 1fr);
  }

  ${mq.fromDesktopSm} {
    grid-template-columns: repeat(3, 1fr);
  }
`;

export const header = styled.div`
  margin-bottom: 2rem;
`;
