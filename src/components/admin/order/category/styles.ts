import styled from "@emotion/styled";
import Container from "components/container";
import { mq } from "styles/theme";

export const container = styled(Container)`
  margin: 0;
  padding: 0;

  ${mq.fromTabletLg} {
    margin: 0 auto;
    padding: 2.4rem;
  }
`;
