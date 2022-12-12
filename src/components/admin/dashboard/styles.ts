import styled from "@emotion/styled";
import Container from "components/container";

export const tabs_container = styled(Container)`
  margin: 0 auto -2.4rem;
`;

export const portfolio_container = styled(Container)`
  margin: -2rem auto 0;

  .content {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }
`;
