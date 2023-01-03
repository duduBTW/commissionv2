import styled from "@emotion/styled";

export const current_step = styled.div`
  display: flex;
  gap: 0.4rem;
`;

export const steps = styled.div`
  display: flex;
  gap: 0.8rem;
`;

interface Step {
  active?: boolean;
}
export const step = styled.div<Step>`
  height: 0.4rem;
  flex: 1;
  background-color: ${({ active }) =>
    active ? "var(--color-success)" : "var(--color-text-20)"};
  border-radius: 222rem;
`;

export const container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;
