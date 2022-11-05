import styled from "@emotion/styled";
import { EditorContent } from "@tiptap/react";
import { mq } from "styles/theme";

export const container = styled.div`
  margin: 0 -2rem;
  border-top: 0.1rem solid var(--color-divider);

  ${mq.fromMobileLg} {
    margin: 0;
    border: 0.1rem solid var(--color-divider);
    border-radius: 0.8rem;
  }
`;

export const content = styled(EditorContent)`
  .ProseMirror {
    outline: none;
    padding: 1rem 1.2em;
    border-radius: 0.8rem;
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
