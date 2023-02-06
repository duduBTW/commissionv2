import styled from "@emotion/styled";
import Typography from "components/typography";

export const container = styled.div`
  background-color: var(--color-content);
  border: 0.3rem solid var(--color-content);
  border-radius: 1.2rem;
  padding: 1.6rem;
  cursor: pointer;
  overflow: hidden;
`;

export const miniature = styled.img`
  height: 32rem;
  object-fit: cover;
  width: calc(100% + 3.2rem);
  margin: -1.6rem -1.6rem 1.6rem;
  border-radius: 1.2rem;
`;

export const prince = styled(Typography)`
  margin-top: 3.2rem;
`;
