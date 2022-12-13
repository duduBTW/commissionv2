import styled from "@emotion/styled";
import { mq } from "styles/theme";

export const container = styled.div`
  display: flex;
  flex-direction: column;

  ${mq.fromTabletSm} {
    flex-direction: row;
    align-items: flex-start;
    gap: 2rem;
    margin-top: 2rem;
  }
`;

export const art = styled.img`
  margin: 2rem -2rem 2rem;
  width: calc(100% + 4rem);

  ${mq.fromTabletSm} {
    margin: 0;
    border-radius: 1.2rem;
    width: calc(70% - 2rem);

    //                       min-w card  padding
    //                            |      |
    max-width: calc(100% - calc(28rem + 4rem));
  }
`;

export const card = styled.div`
  width: calc(30% - 2rem);
  min-width: 28rem;
`;
