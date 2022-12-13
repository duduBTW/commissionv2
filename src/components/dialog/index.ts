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
    transform: translate(0, 32%);
  }
  to {
    transform: translate(0, 0);
  }
`;

export const contentShow = keyframes`
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
  backdrop-filter: blur(0.4rem);

  animation: ${overlayShow} 150ms cubic-bezier(0.16, 1, 0.3, 1);
`;

interface ContentProps {
  size?: "small" | "medium";
}

export const content = styled(Dialog.Content)<ContentProps>`
  overflow-y: auto;
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
  animation: ${contentShowMobile} 600ms cubic-bezier(0.16, 1, 0.3, 1);

  &:focus {
    outline: none;
  }

  ${mq.fromMobileLg} {
    max-width: ${({ size }) => {
      switch (size) {
        case "small":
          return "40rem";
        case "medium":
          return "64rem";

        default:
          return "40rem";
      }
    }};
    max-height: 85vh;
    height: min-content;
    border-radius: 1.2rem;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    animation: ${contentShow} 150ms cubic-bezier(0.16, 1, 0.3, 1);
  }
`;

export const close = styled(Dialog.Close)``;
export const portal = styled(Dialog.Portal)``;
export const root = styled(Dialog.Root)``;
export const trigger = styled(Dialog.Trigger)``;

export const header = styled.div`
  display: flex;
  gap: 1.2rem;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;
