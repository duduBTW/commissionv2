import { useState } from "react";
import Button from "components/button";
import Typography from "components/typography";
import ArrowDownSLineIcon from "remixicon-react/ArrowDownSLineIcon";
import ArrowUpSLineIcon from "remixicon-react/ArrowUpSLineIcon";
import { Swiper, SwiperSlide } from "swiper/react";
import { Thumbs, Lazy, Mousewheel } from "swiper";
import "swiper/css/navigation";

import { Swiper as SwiperClass } from "swiper/types";
import "swiper/css";
import "swiper/css/thumbs";
import "swiper/css/navigation";
import { css } from "@emotion/css";

// styles
import * as g from "styles/globalStyles";
import * as s from "./styles";
import ButtonIcon from "components/button/icon";
import { mq } from "styles/theme";

const CommissionOrder = () => {
  return (
    <g.paper
      className={css`
        min-height: calc(100vh - 6rem);

        ${mq.fromTabletSm} {
          min-height: auto;
        }
      `}
    >
      <Typography variant="title-01">Drawing - Full Body</Typography>
      <CommissionOrderImages />
      <Typography variant="body-01" color="text.40">
        Arte de corpo todo do personagem selecionado.
      </Typography>
      <div
        className={css`
          margin-top: auto;

          ${mq.fromTabletSm} {
            margin-bottom: 0rem;
          }
        `}
      />
      <Typography variant="title-03" color="success.main">
        R$ 150,00
      </Typography>
      <Button fullWidth>Falar com o artista</Button>
    </g.paper>
  );
};

const CommissionOrderImages = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);
  const [mainSwiper, setMainSwiper] = useState<SwiperClass | undefined>();

  console.log("mainSwiper?.isEnd", mainSwiper?.isEnd);

  return (
    <s.images_container>
      <Swiper
        loop
        thumbs={{ swiper: thumbsSwiper }}
        modules={[Thumbs, Lazy]}
        autoHeight
        slidesPerView={1}
        onSwiper={setMainSwiper}
        lazy={true}
        onSlideNextTransitionStart={() => {
          thumbsSwiper?.slideNext();
        }}
        onSlidePrevTransitionStart={() => {
          thumbsSwiper?.slidePrev();
        }}
      >
        <SwiperSlide>
          <s.image_main src="https://pbs.twimg.com/media/FZNGHRbacAAo5sy?format=jpg&name=large" />
        </SwiperSlide>
        <SwiperSlide>
          <s.image_main src="https://pbs.twimg.com/media/FYqNgiKVUAEY0Tj?format=jpg&name=4096x4096" />
        </SwiperSlide>
        <SwiperSlide>
          <s.image_main src="https://pbs.twimg.com/media/FXooLX8acAEGz5Q?format=jpg&name=large" />
        </SwiperSlide>
        <SwiperSlide>
          <s.image_main src="https://pbs.twimg.com/media/FW3wMJMaIAE_rz6?format=jpg&name=large" />
        </SwiperSlide>
        <SwiperSlide>
          <s.image_main src="https://pbs.twimg.com/media/FUeFfOPaIAA4L2H?format=jpg&name=large" />
        </SwiperSlide>
      </Swiper>

      <s.image_selector>
        <s.image_swiper
          onSwiper={(s) => {
            setThumbsSwiper(s);
          }}
          direction={"vertical"}
          spaceBetween={12}
          slidesPerView={4}
          modules={[Thumbs, Mousewheel]}
          mousewheel
          watchSlidesProgress
        >
          <s.image_miniature_container>
            <s.image_miniature
              active
              src="https://pbs.twimg.com/media/FZNGHRbacAAo5sy?format=jpg&name=large"
            />
          </s.image_miniature_container>
          <s.image_miniature_container>
            <s.image_miniature src="https://pbs.twimg.com/media/FYqNgiKVUAEY0Tj?format=jpg&name=4096x4096" />
          </s.image_miniature_container>
          <s.image_miniature_container>
            <s.image_miniature src="https://pbs.twimg.com/media/FXooLX8acAEGz5Q?format=jpg&name=large" />
          </s.image_miniature_container>
          <s.image_miniature_container>
            <s.image_miniature src="https://pbs.twimg.com/media/FW3wMJMaIAE_rz6?format=jpg&name=large" />
          </s.image_miniature_container>
          <s.image_miniature_container>
            <s.image_miniature src="https://pbs.twimg.com/media/FUeFfOPaIAA4L2H?format=jpg&name=large" />
          </s.image_miniature_container>
        </s.image_swiper>
        <Controls swiper={mainSwiper} />
      </s.image_selector>
    </s.images_container>
  );
};

const Controls = ({ swiper }: { swiper?: SwiperClass }) => {
  return (
    <s.image_controls>
      <ButtonIcon
        onClick={() => {
          swiper?.slideNext();
        }}
        size="small"
      >
        <ArrowDownSLineIcon />
      </ButtonIcon>
      <ButtonIcon
        onClick={() => {
          swiper?.slidePrev();
        }}
        size="small"
      >
        <ArrowUpSLineIcon />
      </ButtonIcon>
    </s.image_controls>
  );
};

export default CommissionOrder;
