import styled from "@emotion/styled";
import * as g from "styles/globalStyles";
import { mq } from "styles/theme";
import * as Dialog from "@radix-ui/react-dialog";
import { contentShow } from "components/dialog";
import { keyframes } from "@emotion/react";

export const container = styled.div`
  gap: 2.4rem;
  display: flex;
  min-height: 100vh;

  ${mq.fromTabletSm} {
    margin: -2.4rem 0;
    padding: 2.4rem 0;
  }
`;

export const sidebar = styled.div`
  width: 22rem;
  display: none;

  ${mq.fromTabletMd} {
    display: block;
  }
`;

export const content = styled(g.paper)`
  width: 100% !important;
  max-width: 100% !important;
  flex: 1;
  margin: 0 !important;
`;

export const mobile_nav = styled.div`
  background-color: var(--color-content);
  display: flex;
  align-items: center;
  gap: 0.8rem;
  position: sticky;
  top: 0;
  margin: -2rem;
  padding: 2rem;

  ${mq.fromDesktopSm} {
    display: none;
  }
`;

export const message_list_container = styled.div`
  flex: 1 1 0;
  margin: -2rem -2rem 0;
  padding: 2rem 2rem 0;
  overflow: auto;
`;

export const footer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  position: sticky;
  bottom: 0rem;
  background-color: var(--color-content);
  margin: -2rem;
  padding: 2rem;

  ${mq.fromDesktopSm} {
    gap: 1.6rem;
  }
`;

export const actions = styled.form`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.2rem;
`;

const drawerSlideIn = keyframes`
  from {
    transform: translate(-60%, 0);
  }
  to {
    transform: translate(0, 0);
  }
`;

export const drawer_content = styled(Dialog.Content)`
  max-width: 28rem;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: var(--color-content);
  z-index: 2;
  animation: ${drawerSlideIn} 540ms cubic-bezier(0.16, 1, 0.3, 1);
  display: flex;
  flex-direction: column;
  overflow-y: auto;
`;

export const drawer_header = styled.div`
  padding: 2.4rem 1.6rem 0.4rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const drawer_footer = styled(drawer_header)`
  margin-top: auto;
  padding-top: 2rem;
  padding-bottom: 2rem;
`;
