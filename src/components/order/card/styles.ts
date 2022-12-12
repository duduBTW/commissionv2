import styled from "@emotion/styled";
import Typography from "components/typography";

interface ContainerProps {
  backgroundImage: string;
}
export const container = styled.a<ContainerProps>`
  cursor: pointer;
  padding: 1.2rem;
  border-radius: 0.8rem;
  border: 0.1rem solid var(--color-divider);
  background: var(--color-content);
  overflow: hidden;

  &:hover,
  &:focus {
    transition: all 0.54s cubic-bezier(0.81, 0.52, 0.4, 0.75);
    &::before {
      background-size: clamp(12rem, 46%, 20rem);
      filter: blur(0);
      opacity: 1;
    }

    &::after {
      background: linear-gradient(
        312deg,
        rgba(255, 255, 255, 1) 0%,
        rgba(255, 255, 255, 0.54) 80%,
        rgba(255, 255, 255, 0.1) 100%
      );
    }
  }

  &:active {
    transition: all 0.02s cubic-bezier(0.81, 0.52, 0.4, 0.75);
    &::before {
      background-size: clamp(12rem, 42%, 20rem);
      filter: blur(0.8rem);
      opacity: 0.92;
    }
  }

  position: relative;
  &::before {
    transition: all 0.54s cubic-bezier(0.81, 0.52, 0.4, 0.75);

    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url(${({ backgroundImage }) => backgroundImage});
    background-size: clamp(12rem, 42%, 18rem);
    background-position: right 20%;
    z-index: 1;
    opacity: 0.62;
    filter: blur(0.18rem);
  }
  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgb(255, 255, 255);
    background: linear-gradient(
      312deg,
      rgba(255, 255, 255, 1) 0%,
      rgba(255, 255, 255, 0.54) 80%,
      rgba(255, 255, 255, 0.6) 100%
    );

    z-index: 1;
  }
`;
export const status = styled(Typography)`
  position: relative;
  z-index: 2;
`;
export const title = styled(Typography)`
  position: relative;
  z-index: 2;
  margin-top: 0.4rem;
  margin-bottom: 4rem;
`;
export const user = styled.div`
  position: relative;
  z-index: 2;
  display: grid;
  align-items: center;
  grid-template-columns: auto 1fr;
  gap: 0.8rem;
`;
