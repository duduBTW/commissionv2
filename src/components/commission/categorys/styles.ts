import styled from "@emotion/styled";
import * as Tabs from "@radix-ui/react-tabs";
import { EditorContent } from "@tiptap/react";
import { loadingStyles } from "styles/globalStyles";
import { mq } from "styles/theme";

export const container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  flex-direction: column;
  display: flex;
  background-color: var(--color-content);

  ${mq.fromDesktopSm} {
    background-color: transparent;
  }
`;

export const sidebar_container = styled.div`
  display: none;
  position: sticky;
  top: 1.2rem;
  margin-top: 1.2rem;
  flex: 1;

  ${mq.fromDesktopSm} {
    display: block;
  }
`;

export const sidebar = styled.div`
  width: 20rem;
  margin-left: auto;
`;

export const desktop_empty = styled.div`
  display: none;
  flex: 1;

  ${mq.fromDesktopSm} {
    display: block;
  }
`;

export const tab_content = styled(Tabs.Content)`
  flex: 1;
  padding: 2.4rem 2rem;
  position: relative;

  ${mq.fromDesktopSm} {
    width: 80rem;
    max-width: 80rem;
    min-width: 80rem;
    margin-right: auto;
    background-color: var(--color-content);
    margin: 1.2rem 0 0;
    border-top-left-radius: 1.2rem;
    border-top-right-radius: 1.2rem;
  }
`;

export const actions = styled.div`
  margin-top: auto;
  padding: 1.2rem 2rem;
  display: flex;
  gap: 1.2rem;

  ${mq.fromDesktopSm} {
    width: 100%;
    max-width: 80rem;
    background-color: var(--color-content);
    margin: 0 auto 2.4rem;
    border-bottom-left-radius: 1.2rem;
    border-bottom-right-radius: 1.2rem;
  }
`;

export const editor = styled(EditorContent)`
  font-family: "Nunito";
  font-style: normal;
  font-weight: 400;
  font-size: 1.6rem;
  line-height: 2.4rem;

  .ProseMirror {
    outline: none;
    max-height: 52rem;
    overflow: auto;
    padding-right: 1.2rem;
  }

  .ProseMirror p.is-editor-empty:first-child::before {
    content: attr(data-placeholder);
    float: left;
    color: #adb5bd;
    pointer-events: none;
    height: 0;
  }
`;

interface ContainerDesktopProps {
  loading: boolean;
}
export const container_desktop = styled.div<ContainerDesktopProps>`
  flex: 1;
  display: flex;
  gap: 2rem;

  ${({ loading }) => loading && loadingStyles};
`;

export const card_desktop = styled.div`
  margin: 0 auto;
  width: 80rem;
  margin-top: 2.4rem;
  display: none;

  ${mq.fromDesktopSm} {
    display: block;
  }
`;

export const finish_form = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 2.4rem;
  gap: 2.4rem;
`;
