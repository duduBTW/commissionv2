import styled from "@emotion/styled";
import Typography from "components/typography";
import * as g from "styles/globalStyles";
import { mq } from "styles/theme";

export const container = styled(g.paper_container)`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  background-color: var(--color-content);

  ${mq.fromTabletSm} {
    background-color: transparent;
    padding: 0;
    margin-top: 3.2rem;
  }
`;

export const title = styled(Typography)`
  flex: 1;
`;
