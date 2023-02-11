import styled from "@emotion/styled";
import Container from "components/container";
import Typography from "components/typography";
import { mq } from "styles/theme";

export const container = styled(Container)`
  .content {
    margin-left: 2rem;
    margin-right: 2rem;
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  ${mq.fromDesktopSm} {
    margin: 0;

    .content {
      margin-left: auto;
      margin-right: auto;
    }
  }
`;

export const tab_content = styled.div`
  margin: 0 -2rem;

  ${mq.fromTabletMd} {
    margin: 0;
  }
`;

export const not_found = styled(Typography)`
  margin-top: 2.4rem;
`;

export const footer = styled.div`
  height: 6rem;
`;
