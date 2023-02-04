import styled from "@emotion/styled";
import { mq } from "styles/theme";
import * as Tabs from "@radix-ui/react-tabs";

export const mobile_nav = styled.div`
  background-color: var(--color-content);
  display: flex;
  align-items: center;
  gap: 1.6rem;
  padding: 1.2rem 2rem;
  max-width: 100%;
  overflow-x: scroll;

  ${mq.fromDesktopSm} {
    display: none;
  }
`;

export const mobile_nav_conent = styled(Tabs.List)`
  display: flex;
  align-items: center;
  gap: 0.8rem;
`;

export const mobile_nav_tab = styled(Tabs.Trigger)`
  white-space: nowrap;
  &:focus {
    text-decoration: underline;
  }
`;
