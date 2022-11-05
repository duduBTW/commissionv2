import styled from "@emotion/styled";
import Typography from "components/typography";
import * as g from "styles/globalStyles";
import { mq } from "styles/theme";

export const container = styled(g.paper_container)`
  display: flex;
  align-items: center;
  gap: 1.2rem;

  ${mq.fromMobileLg} {
    padding: 0;
  }
`;

export const title = styled(Typography)`
  flex: 1;
  text-align: right;
`;
