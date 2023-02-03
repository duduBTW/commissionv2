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
