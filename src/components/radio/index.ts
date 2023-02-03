import * as RadioGroup from "@radix-ui/react-radio-group";
import styled from "@emotion/styled";
import { body01, subtitle2 } from "components/typography/styles";

export const root = styled(RadioGroup.Root)`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
`;

export const root_label = styled.div`
  ${subtitle2}
  color: var(--color-text-40);
`;

export const item_container = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
`;

export const item = styled(RadioGroup.Item)`
  background-color: var(--color-text-20);
  width: 2.4rem;
  height: 2.4rem;
  border-radius: 100%;

  &:hover {
    background-color: var(--color-primary-l);
  }
`;

export const indicator = styled(RadioGroup.Indicator)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  position: relative;

  &::after {
    content: "";
    display: block;
    width: 1.2rem;
    height: 1.2rem;
    border-radius: 50%;
    background-color: var(--color-primary);
  }
`;

export const label = styled.label`
  ${body01}
`;
