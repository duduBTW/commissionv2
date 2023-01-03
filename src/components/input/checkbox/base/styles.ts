import styled from "@emotion/styled";
import * as Checkbox from "@radix-ui/react-checkbox";

export const root = styled(Checkbox.Root)`
  background-color: var(--color-text-20);
  width: 2.4rem;
  height: 2.4rem;
  border-radius: 0.4rem;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: var(--color-primary-l);
  }
  &:focus {
    box-shadow: 0 0 0 2px black;
  }
`;

export const indicator = styled(Checkbox.Indicator)`
  color: var(--color-primary);
`;
