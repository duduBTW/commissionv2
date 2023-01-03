import styled from "@emotion/styled";
import * as Switch from "@radix-ui/react-switch";

export const switch_root = styled(Switch.Root)`
  width: 5.2rem;
  height: 2.8rem;
  background-color: var(--color-divider);
  border-radius: 9999px;
  position: relative;

  &:focus {
    border-color: var(--color-primary);
    box-shadow: 0 0 0.2rem var(--color-primary);
  }
  &[data-state="checked"] {
    background-color: var(--color-primary-l);
  }
`;

export const switch_thumb = styled(Switch.Thumb)`
  display: block;
  width: 2.2rem;
  height: 2.2rem;
  background-color: var(--color-text-60);
  border-radius: 9999px;
  transition: transform 100ms;
  transform: translateX(0.4rem);
  will-change: transform;

  &[data-state="checked"] {
    transform: translateX(2.6rem);
    background-color: var(--color-primary-d);
  }
`;
