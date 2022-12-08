import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { PropsWithChildren } from "react";

const slideUpAndFade = keyframes`
  from {
    opacity: 0;
    transform: translateY(0.4rem);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const slideRightAndFade = keyframes`
  from {
    opacity: 0;
    transform: translateX(-0.4rem);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const slideDownAndFade = keyframes`
  from {
    opacity: 0;
    transform: translateY(-0.4rem);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const slideLeftAndFade = keyframes`
  from {
    opacity: 0;
    transform: translateX(0.4rem);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const StyledContent = styled(DropdownMenuPrimitive.Content)`
  min-width: 16rem;
  z-index: 5;
  background-color: var(--color-content);
  border-radius: 0.8rem;
  padding: 0.8rem;
  box-shadow: 0px 0px 38px 12px var(--color-primary-l),
    0px 8px 20px -15px var(--color-primary-d);
  animation-duration: 400ms;
  animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);

  &[data-side="top"] {
    animation-name: ${slideDownAndFade};
  }

  &[data-side="bottom"] {
    animation-name: ${slideUpAndFade};
  }

  &[data-side="left"] {
    animation-name: ${slideRightAndFade};
  }

  &[data-side="right"] {
    animation-name: ${slideLeftAndFade};
  }
`;

const StyledArrow = styled(DropdownMenuPrimitive.Arrow)({
  fill: "white",
});

const StyledItem = styled(DropdownMenuPrimitive.Item)`
  all: unset;
  border-radius: 0.4rem;
  display: flex;
  align-items: center;
  gap: 0.8rem;
  padding: 0.4rem 0.8rem;
  position: relative;
  user-select: none;
  font-family: "Nunito";
  font-style: normal;
  font-weight: 400;
  font-size: 1.5rem;
  line-height: 2rem;

  &[data-disabled] {
    color: var(--color-divider);
    pointer-events: none;
  }

  &[data-highlighted] {
    background-color: var(--color-primary);
    color: var(--color-content);
  }
`;

const Trigger = styled(DropdownMenuPrimitive.Trigger)`
  cursor: pointer;
  & > * {
    border: 0.1rem solid var(--color-divider);
  }

  &:active,
  &:focus,
  &:hover {
    & > * {
      border-color: var(--color-primary);
    }
  }
`;

function Content({
  children,
  ...props
}: PropsWithChildren<DropdownMenuPrimitive.MenuContentProps>) {
  return (
    <DropdownMenuPrimitive.Portal>
      <StyledContent {...props}>
        {children}
        <StyledArrow />
      </StyledContent>
    </DropdownMenuPrimitive.Portal>
  );
}

// Exports
export const root = DropdownMenuPrimitive.Root;
export const trigger = Trigger;
export const content = Content;
export const item = StyledItem;
export const radio_group = DropdownMenuPrimitive.RadioGroup;
export const sub = DropdownMenuPrimitive.Sub;
