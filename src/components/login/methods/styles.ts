import styled from "@emotion/styled";

export const container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

export const card = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
  padding: 0.8rem 2rem;
  border: 0.2rem solid var(--color-background);
  border-radius: 1.2rem;
  cursor: pointer;

  &:hover,
  &:focus {
    background-color: var(--color-background);
  }
`;
export const cardIcon = styled.img`
  width: 1.8rem;
  height: 1.8rem;
  object-fit: cover;
  object-position: center;
`;
