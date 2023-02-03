import * as Dialog from "@radix-ui/react-dialog";
import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";

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
  padding: 2.4rem 2rem;
  background-color: var(--color-content);
  z-index: 8;
  animation: ${drawerSlideIn} 540ms cubic-bezier(0.16, 1, 0.3, 1);
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  gap: 3.2rem;
`;
