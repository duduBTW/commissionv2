import styled from "@emotion/styled";
import { mq } from "styles/theme";
import { Swiper, SwiperSlide } from "swiper/react";

export const images_container = styled.div`
  display: flex;
  gap: 4rem;
  width: 100%;
`;
export const image_main = styled.img`
  width: 100%;
  border-radius: 4px;

  object-fit: contain;
  object-position: left top;
  margin-right: auto;
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
      border: 0.2rem solid var(--color-divider);
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
  opacity: 0.6;
  border: 0.2rem solid transparent;
`;
