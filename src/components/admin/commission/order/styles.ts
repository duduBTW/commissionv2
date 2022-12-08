import Button from "components/button";
import styled from "@emotion/styled";
import { mq } from "styles/theme";
import * as Dialog from "@radix-ui/react-dialog";
import { contentShow } from "components/dialog";
import { keyframes } from "@emotion/react";
import * as Tabs from "@radix-ui/react-tabs";

export const mobile_nav = styled.div`
  position: sticky;
  top: 0;
  background-color: var(--color-content);
  padding: 0.8rem 0;
  margin-bottom: 1.6rem;
  display: flex;
  align-items: center;
  gap: 0.8rem;
  width: calc(100% + 4rem);

  ${mq.fromDesktopSm} {
    display: none;
    padding: 1.2rem 0;
  }
`;

export const container = styled.div`
  padding: 0rem 2rem;
  background-color: var(--color-content);
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  width: 100%;
  position: relative;
  border-top: 0.1rem solid var(--color-divider);

  ${mq.fromDesktopSm} {
    width: 100%;
    max-width: 80rem;
    margin: 0 auto;
  }
`;

export const content = styled.div`
  min-height: 100vh;
  /* margin: -1.6rem 0rem; */
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  gap: 2rem;

  ${mq.fromDesktopSm} {
    /* min-height: 100vh; */
    min-height: 100vh;
    margin: 0;
    padding: 2rem 0rem;
  }
`;

// export const input = styled(InputText)`
//   align-self: center;
//   justify-self: center;
// `;

export const divider = styled.div`
  margin: 0 -2rem;
  width: calc(100% + 4rem);
  height: 0.1rem;
  background-color: var(--color-primary-l);
`;

export const actions = styled.form`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.2rem;
`;

export const footer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  position: sticky;
  bottom: 0;
  background-color: var(--color-content);
  padding: 0.8rem 0 1.2rem;

  ${mq.fromDesktopSm} {
    gap: 1.6rem;
  }
`;

export const button_next = styled(Button)`
  ${mq.fromDesktopSm} {
    margin-left: auto;
  }
`;

export const side_nav = styled.div`
  width: 21.6rem;
  position: absolute;
  top: 0;
  left: -21.6rem;
  height: 100%;
  background-color: var(--color-content);
  border-right: 0.1rem solid var(--color-primary-l);
  display: none;

  ${mq.fromDesktopSm} {
    display: block;
  }
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
    border-radius: 0.8rem;
    cursor: pointer;
  }
`;

export const nav = styled.nav`
  /* border-bottom: 0.1rem solid var(--color-divider); */
  margin: -2rem -2rem 0;
  display: none;
  position: sticky;
  top: 0;
  background-color: var(--color-content);
  padding: 0 2rem;
  align-items: center;
  justify-content: space-between;
  height: 4.8rem;

  ${mq.fromDesktopSm} {
    display: flex;
  }
`;

export const logo = styled.img`
  height: 2.4rem;
`;

export const dialog_content = styled(Dialog.Content)``;
export const image_content = styled.img`
  position: fixed;
  height: min-content;
  border-radius: 0.8rem;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
  object-fit: contain;
  max-height: 85vh;
  max-width: 85vw;

  height: auto;
  width: auto;
  animation: ${contentShow} 150ms cubic-bezier(0.16, 1, 0.3, 1);
`;

export const tutorial_iniciar = styled(Button)`
  width: 100%;
  margin-top: auto;

  ${mq.fromMobileLg} {
    margin-top: 4rem;
    width: min-content;
  }
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
  padding: 0.8rem 1.6rem 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const drawer_footer = styled(drawer_header)`
  margin-top: auto;
  padding-top: 2rem;
  padding-bottom: 2rem;
`;

export const mobile_logo = styled.img`
  height: 2rem;
`;
