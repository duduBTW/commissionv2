import styled from "@emotion/styled";
import { mq } from "styles/theme";

export const container = styled.div`
  margin: -1.2rem -2rem -2rem;

  ${mq.fromDesktopSm} {
    margin-bottom: 0rem;
  }
`;
