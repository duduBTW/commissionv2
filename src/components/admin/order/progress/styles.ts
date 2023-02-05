import { css } from "@emotion/css";
import styled from "@emotion/styled";
import { html } from "styles/globalStyles";

export const form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
`;

export const progress_content = styled.div`
  ${html}
`;

export const approve_message = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  margin-bottom: 1.6rem;
`;

export const approve_actions = styled.div`
  display: flex;
  gap: 0.8rem;
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
