import { css } from "@emotion/react";
import styled from "@emotion/styled";
import Typography from "components/typography";

interface FormContainerProps {
  variant?: "content" | "background";
}
export const form_container = styled.form<FormContainerProps>`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;

  ${({ variant }) =>
    variant === "content" &&
    css`
      border-bottom: 0.2rem solid var(--color-background);
      padding: 0.8rem 0 2.4rem;
    `}
`;

export const form_footer = styled.div`
  display: flex;
  gap: 0.8rem;
  justify-content: space-between;
  align-items: center;
`;

export const empty_title = styled(Typography)`
  margin-bottom: 1.2rem;
`;

export const empty_description = styled(Typography)`
  margin-bottom: 4rem;
`;
