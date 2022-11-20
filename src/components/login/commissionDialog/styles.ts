import styled from "@emotion/styled";
import * as dialog from "components/dialog";

export const content = styled(dialog.content)`
  min-height: 40rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const header = styled.div`
  display: flex;
  gap: 1.2rem;
  justify-content: space-between;
  align-items: center;
`;

export const login_methods_container = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

export const divider = styled.div`
  width: calc(100% + 4rem);
  display: flex;
  align-items: center;
  gap: 1.2rem;
  margin: 0 -2rem;

  &::after,
  &::before {
    content: "";
    flex: 1;
    background-color: var(--color-divider);
    height: 0.1rem;
  }
`;
