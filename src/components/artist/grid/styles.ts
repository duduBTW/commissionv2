import styled from "@emotion/styled";
import { mq } from "styles/theme";

export const grid = styled.div`
  display: grid;
  gap: 1.2rem;
  margin-top: 1.2rem;

  ${mq.fromTabletSm} {
    grid-template-columns: repeat(2, 1fr);
  }

  ${mq.fromDesktopSm} {
    grid-template-columns: repeat(3, 1fr);
  }
`;
