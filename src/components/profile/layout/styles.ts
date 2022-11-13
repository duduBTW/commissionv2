import styled from "@emotion/styled";
import { mq } from "styles/theme";

export const container = styled.div`
  display: flex;
  gap: 2rem;
  width: 100%;
  justify-content: center;
  padding-bottom: 5.6rem;

  ${mq.fromDesktopSm} {
    padding-bottom: 0rem;
    margin-left: -8rem;
  }
`;
export const content = styled.div`
  width: 100%;

  ${mq.fromTabletSm} {
    max-width: 64rem;
  }
`;
export const side_nav = styled.aside`
  z-index: 2;
  background-color: var(--color-content);
  display: flex;
  position: fixed;
  bottom: 0;
  width: 100%;
  left: 0;

  ${mq.fromTabletSm} {
    position: relative;
    width: min-content;
    margin: 2rem 0;
    padding: 1.2rem;
    height: min-content;
    border-radius: 0.8rem;
    flex-direction: column;
    gap: 0.4rem;
  }
`;
export const side_nav_item = styled.button`
  user-select: none;
  flex: 1;
  padding: 0.6rem 1.2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  cursor: pointer;
  font-family: "Poppins";
  font-style: normal;
  font-size: 1.4rem;
  line-height: 2.2rem;
  color: var(--color-text-60);

  &:hover,
  &:focus {
    background-color: var(--color-text-20);
    color: var(--color-text-80);
  }

  &.active {
    background-color: var(--color-primary-l);
    color: var(--color-primary);
    font-weight: 500;
  }

  ${mq.fromTabletSm} {
    flex-direction: row;
    gap: 0.8rem;
    justify-content: start;
    position: relative;
    font-size: 1.6rem;
    line-height: 2.4rem;
    padding: 0.8rem 1.2rem;
    width: 18rem;
    border-radius: 0.8rem;
  }
`;

export const side_nav_icon = styled.div``;
