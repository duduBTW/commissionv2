import { keyframes } from "@emotion/css";
import styled from "@emotion/styled";
import * as Dialog from "@radix-ui/react-dialog";
import { mq } from "styles/theme";

const overlayShow = keyframes`
    from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;
const contentShowMobile = keyframes`
   from {
    transform: translate(0, 8%);
  }
  to {
    transform: translate(0, 0);
  }
`;

const contentShow = keyframes`
  from {
    opacity: 0;
    transform: translate(-50%, -48%) scale(0.96);
  }
  to {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
`;

export const overlay = styled(Dialog.Overlay)`
  background-color: var(--color-text-40);
  position: fixed;
  inset: 0;
  z-index: 2;
  animation: ${overlayShow} 150ms cubic-bezier(0.16, 1, 0.3, 1);
  backdrop-filter: blur(0.4rem);
`;

export const content = styled(Dialog.Content)`
  background-color: white;
  box-shadow: hsl(206 22% 7% / 35%) 0px 10px 38px -10px,
    hsl(206 22% 7% / 20%) 0px 10px 20px -15px;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: calc(100% - 2rem);
  padding: 2rem;
  z-index: 2;
  border-top-right-radius: 0.8rem;
  border-top-left-radius: 0.8rem;
  animation: ${contentShowMobile} 150ms cubic-bezier(0.16, 1, 0.3, 1);

  &:focus {
    outline: none;
  }

  ${mq.fromMobileLg} {
    max-width: 40rem;
    max-height: 85vh;
    height: min-content;
    border-radius: 0.8rem;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    animation: ${contentShow} 150ms cubic-bezier(0.16, 1, 0.3, 1);
  }
`;

export const close = styled(Dialog.Close)``;
export const portal = styled(Dialog.Portal)``;
export const root = styled(Dialog.Root)``;
