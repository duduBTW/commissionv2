import styled from "@emotion/styled";
import * as g from "styles/globalStyles";
import { mq } from "styles/theme";

interface ContainerProps {
  noPadding?: boolean;
}
export const container = styled(g.paper)<ContainerProps>`
  padding: ${({ noPadding }) => (noPadding ? "0 !important" : "2.4rem")};
  margin: 0rem 0rem 1.6rem !important;
  overflow: hidden;
  max-width: 80rem !important;
  width: 100%;
`;

export const container_user = styled(container)`
  display: flex;
  align-items: flex-start;
  gap: 2.4rem;

  ${mq.fromTabletMd} {
    flex-direction: row;
  }
`;

export const information_grid = styled.ul`
  display: grid;
  gap: 1.6rem;
  padding: 0;
  grid-template-columns: repeat(1, 1fr);
  margin: 0;

  ${mq.fromTabletSm} {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export const information_item = styled.li`
  list-style: none;
  max-width: 100%;
  overflow: hidden;
`;
