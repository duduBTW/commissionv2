import styled from "@emotion/styled";

import * as g from "styles/globalStyles";
import { mq } from "styles/theme";

export const container = styled.div`
  position: relative;
`;
export const background_order_finished = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 12rem;
  background-image: url("/background_order_finished.svg");
  background-size: 100% 100%;
  z-index: -1;
`;

export const commission_container = styled(g.paper)`
  padding: 0 !important;
  overflow: hidden;
`;
