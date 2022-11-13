import styled from "@emotion/styled";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { PropsWithChildren } from "react";

const contentStyles = {
  minWidth: "16rem",
  zIndex: 2,
  backgroundColor: "white",
  borderRadius: 6,
  padding: 8,
  boxShadow:
    "0px 12px 38px -10px rgba(31, 0, 0, 0.34), 0px 8px 20px -15px rgba(24, 22, 22, 0.2)",
};

const StyledContent = styled(DropdownMenuPrimitive.Content)({
  ...contentStyles,
});

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

  &:active,
  &:focus,
  &:hover {
    opacity: 0.62;
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
