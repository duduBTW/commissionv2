import styled from "@emotion/styled";
import { ContainerVariant } from "styles/globalStyles";
import { Blurhash } from "react-blurhash";
import { LazyLoadImage } from "react-lazy-load-image-component";

export const header = styled.form`
  display: flex;
  gap: 0.8rem;
  position: sticky;
  top: 0.8rem;
  z-index: 5;
`;

export const grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.2rem;
`;

interface ImageInputsItemProps {
  variant: ContainerVariant;
}
export const card = styled.div<ImageInputsItemProps>`
  border-radius: 0.8rem;
  overflow: hidden;
  background: ${({ variant }) =>
    variant === "background"
      ? "var(--color-background)"
      : "var(--color-content)"};
`;

interface ImageInputsImgProps {
  variant: ContainerVariant;
}
export const img_container = styled.div`
  position: relative;
  overflow: hidden;

  &:hover,
  &focus {
    img {
      transform: scale(1.12);
      opacity: 0.82;
    }

    &::after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: var(--color-primary);
      pointer-events: none;
    }
  }

  &:active {
    img {
      transition-duration: 0.2s;
      transform: scale(1);
    }
  }
`;

export const img = styled(LazyLoadImage)<ImageInputsImgProps>`
  width: 100%;
  object-fit: cover;
  /* border: 0.3rem solid
    ${({ variant }) =>
    variant === "background"
      ? "var(--color-background)"
      : "var(--color-content)"}; */
  cursor: pointer;

  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
  transition: transform 0.54s cubic-bezier(0.81, 0.52, 0.4, 0.75),
    opacity 1s ease;
`;

export const hash = styled(Blurhash)<ImageInputsImgProps>`
  width: 100%;
  object-fit: cover;
  border: 0.3rem solid
    ${({ variant }) =>
      variant === "background"
        ? "var(--color-background)"
        : "var(--color-content)"};
  position: absolute !important;
  top: 0 !important;
  left: 0 !important;
  height: 100% !important;

  z-index: 1 !important;
`;

export const info = styled.form`
  padding: 0.8rem 1.6rem;
  display: flex;
  align-items: center;
  gap: 1.6rem;
  z-index: 2;
`;
