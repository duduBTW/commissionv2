import styled from "@emotion/styled";
import Typography from "components/typography";

export const container = styled.div`
  padding: 1.2rem;
  border-radius: 0.8rem;
  border: 0.1rem solid var(--color-divider);
  background: var(--color-content);
`;
export const status = styled(Typography)``;
export const title = styled(Typography)`
  margin-top: 0.4rem;
`;
export const user = styled.div`
  margin-top: 4rem;
  display: grid;
  align-items: center;
  grid-template-columns: auto 1fr;
  gap: 0.8rem;
`;
