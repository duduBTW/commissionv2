import styled from "@emotion/styled";
import { Blurhash } from "react-blurhash";
import { mq } from "styles/theme";
import { Swiper, SwiperSlide } from "swiper/react";
import { LazyLoadImage } from "react-lazy-load-image-component";

export const images_container = styled.div`
  --swiper-navigation-color: var(--color-primary);

  display: flex;
  gap: 2.4rem;
  width: 100%;
`;
export const image_main_container = styled.div`
  position: relative;
  min-height: 20rem;
`;
export const image_main = styled(LazyLoadImage)`
  width: 100%;
  height: max-content;
  border-radius: 0.8rem;

  object-fit: contain;
  object-position: left top;
  margin-right: auto;
`;

export const image_main_hash = styled(Blurhash)`
  width: 100%;
  object-fit: cover;
  border-radius: 0.8rem;
  position: absolute !important;
  top: 0 !important;
  left: 0 !important;
  height: 100% !important;

  z-index: 1 !important;
`;

export const image_selector = styled.div`
  width: 8rem;
  height: min-content;
  position: sticky;
  top: 0.8rem;
  display: none;

  ${mq.fromMobileLg} {
    display: unset;
  }
`;

export const image_controls = styled.div`
  display: flex;
  gap: 0.8rem;
  justify-content: center;
  margin: 1.6rem 0;
`;

export const image_swiper = styled(Swiper)`
  width: 8rem;
  height: 35.6rem;
  margin: 0;
`;

export const image_miniature_container = styled(SwiperSlide)`
  cursor: pointer;
  width: 8rem;
  height: 8rem;

  &.swiper-slide-thumb-active {
    cursor: default;
    img {
      opacity: 1;
      border: 0.3rem solid var(--color-divider);
    }

    &:hover {
      img {
        opacity: 1;
      }
    }
  }

  &:hover {
    img {
      opacity: 0.82;
    }
  }
`;

interface ImageMiniatureProps {
  active?: boolean;
}
export const image_miniature = styled.img<ImageMiniatureProps>`
  width: 100%;
  height: 100%;

  object-fit: cover;
  object-position: top;
  border-radius: 0.4rem;
  opacity: 0.4;
  border: 0.2rem solid transparent;
`;
