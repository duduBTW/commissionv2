import styled from "@emotion/styled";
import { EditorContent } from "@tiptap/react";
import { mq } from "styles/theme";
import { InputVariant } from "../base";

interface InputProps {
  variant?: InputVariant;
}
export const container = styled.div<InputProps>`
  margin: 0;
  border: ${({ variant }) =>
    variant === "outlined" ? "0.1rem solid var(--color-divider)" : "none"};
  border-radius: 1.2rem;
`;

export const content = styled(EditorContent)`
  .ProseMirror {
    background-color: var(--color-content);
    outline: none;
    padding: 1rem 1.2em;
    border-radius: 1.2rem;
    min-height: 8rem;
    cursor: text;

    p {
      font-family: "Nunito";
      font-style: normal;
      font-weight: 400;
      font-size: 1.4rem;
      line-height: 2.2rem;
      letter-spacing: 0.02em;
      padding: 0.4rem 0;
      color: var(--color-text-80);
    }
  }
`;
