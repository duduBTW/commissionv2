import styled from "@emotion/styled";
import { EditorContent } from "@tiptap/react";
import { html } from "styles/globalStyles";
import { InputVariant } from "../base";

interface InputProps {
  variant?: InputVariant;
  error?: boolean;
}
export const container = styled.div<InputProps>`
  min-width: 100%;
  margin: 0;
  border-radius: 0.8rem;
  border: ${({ variant, error }) => {
    if (variant === "outlined") {
      const borderColor = error ? "var(--color-error)" : "var(--color-divider)";
      return `0.1rem solid ${borderColor}`;
    }

    return "none";
  }};
`;

export const content = styled(EditorContent)`
  .ProseMirror {
    background-color: var(--color-content);
    outline: none;
    padding: 1rem 1.2em;
    border-radius: 0.8rem;
    min-height: 8rem;
    cursor: text;

    ${html}
  }
`;

export const nav_container = styled.div`
  border-bottom: 0.1rem solid var(--color-divider);
  padding: 1rem 1.8rem;
  gap: 1.6rem;
  display: flex;
  align-items: center;
  position: sticky;
  z-index: 2;
  top: 0;
  background: var(--color-content);
  border-top-right-radius: 1.2rem;
  border-top-left-radius: 1.2rem;
`;

export const nav_divider = styled.div`
  width: 0.1rem;
  height: 1.8rem;
  background: var(--color-divider);
`;
