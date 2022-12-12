import styled from "@emotion/styled";
import Container from "components/container";
import { mq } from "styles/theme";

export const container = styled(Container)`
  margin: -2.4rem 0;

  .content {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }
`;

export const tab_content = styled.div`
  margin: 0 -2rem;

  ${mq.fromTabletMd} {
    margin: 0;
  }
`;
