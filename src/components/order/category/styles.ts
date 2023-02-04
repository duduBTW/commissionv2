import styled from "@emotion/styled";
import * as g from "styles/globalStyles";
import { mq } from "styles/theme";
import * as Dialog from "@radix-ui/react-dialog";
import { css, keyframes } from "@emotion/react";
import * as Tabs from "@radix-ui/react-tabs";

export const container = styled.div`
  gap: 2.4rem;
  width: 100%;
  display: flex;
  min-height: 100vh;
  min-height: 100dvh;
  max-width: 103.2rem;

  ${mq.fromTabletSm} {
    margin: 0 auto;
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

interface MessageListProps {
  hideContent?: boolean;
}
export const message_list_container = styled.div<MessageListProps>`
  ${({ hideContent }) => {
    if (hideContent) {
      return css`
        display: flex;
        flex-direction: column;
        height: 100%;
      `;
    }

    return css`
      flex: 1 1 0;
      margin: -2rem -2rem 0;
      padding: 2rem 2rem 0;
      overflow: auto;
      display: flex;
      flex-direction: column;
      gap: 2.4rem;
    `;
  }}
`;

export const footer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
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

export const category_list = styled(Tabs.List)`
  top: 0rem;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  ${mq.fromDesktopSm} {
    position: sticky;
  }
`;

export const category_item = styled(Tabs.Trigger)`
  padding: 0.4rem 1.2rem;
  margin: -0.4rem -1.2rem;
  border-radius: 0.8rem;

  &:hover,
  &:focus {
    background-color: var(--color-text-20);
  }

  &:focus {
    outline: 0.1rem solid var(--color-primary);
  }

  &[data-state="active"] {
    color: var(--color-primary);
    background-color: var(--color-primary-l);
  }
`;

// Message
export const message_container = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1.2rem;
`;

export const message_content = styled.div`
  font-family: "Nunito";
  font-style: normal;
  font-weight: 400;
  font-size: 1.6rem;
  line-height: 2.4rem;
  letter-spacing: 0.02em;
  color: var(--color-text-60);

  p {
    padding: 0.4rem 0;
  }

  ul {
    padding: 0;
    margin: 0;
  }

  img {
    margin-top: 0.8rem;
    max-width: 20rem;
    border-radius: 1.2rem;
    cursor: pointer;
  }
`;
