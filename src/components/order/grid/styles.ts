import styled from "@emotion/styled";
import { mq } from "styles/theme";
import Typography from "components/typography";

export const grid = styled.div`
  display: grid;
  gap: 1.2rem;

  ${mq.fromTabletSm} {
    grid-template-columns: repeat(2, 1fr);
  }

  ${mq.fromDesktopSm} {
    grid-template-columns: repeat(3, 1fr);
  }
`;

export const header = styled.div`
  margin-bottom: 2rem;
`;

export const title = styled(Typography)`
  margin-bottom: 1.2rem;
`;
