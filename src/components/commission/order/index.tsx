import { useRouter } from "next/router";
import { useState } from "react";
import usePrice from "utils/usePrice";
import services from "service";
import { mq } from "styles/theme";
import { CommissionItemSchema } from "service/artist/commission";
import { Thumbs, Lazy, Mousewheel, Keyboard, Navigation } from "swiper";
import { Swiper as SwiperClass } from "swiper/types";
import { css } from "@emotion/css";

// components
import Button from "components/button";
import Typography from "components/typography";
import ArrowDownSLineIcon from "remixicon-react/ArrowDownSLineIcon";
import ArrowUpSLineIcon from "remixicon-react/ArrowUpSLineIcon";
import { Swiper, SwiperSlide } from "swiper/react";
import ButtonIcon from "components/button/icon";

// styles
import * as g from "styles/globalStyles";
import * as s from "./styles";

const CommissionOrder = ({
  commission,
  isMobile = false,
  onLoginDialogOpenChange,
}: {
  commission: CommissionItemSchema;
  isMobile?: boolean;
  onLoginDialogOpenChange?(open: boolean): void;
}) => {
  const { push, asPath } = useRouter();
  const { data: session } = services.profile.useSession();
  const formattedPrice = usePrice(commission.price);

  const handleSpeakWithArtistClick = () => {
    if (!session?.user) {
      onLoginDialogOpenChange?.(true);
      return;
    }

    push(`${asPath}/order`);
  };

  return (
    <g.paper
      className={css`
        min-height: calc(100vh - 6rem);

        ${mq.fromTabletSm} {
          min-height: auto;
        }
      `}
    >
      <CommissionOrderImages isMobile={isMobile} images={commission.images} />
      <div>
        <Typography variant="title-01">{commission.name}</Typography>
        <div
          className={css`
            height: 0.4rem;
          `}
        />
        <Typography variant="body-01" color="text.40">
          <div
            dangerouslySetInnerHTML={{
              __html: commission.descriptionHtml,
            }}
          />
        </Typography>
      </div>
      <div
        className={css`
          margin-top: auto;

          ${mq.fromTabletSm} {
            margin-bottom: 0rem;
          }
        `}
      />
      <Typography variant="price" color="success.main">
        {formattedPrice}
      </Typography>
      <Button onClick={handleSpeakWithArtistClick} fullWidth>
        Falar com o artista
      </Button>
    </g.paper>
  );
};

const CommissionOrderImages = ({
  images,
  isMobile,
}: {
  images: CommissionItemSchema["images"];
  isMobile: boolean;
}) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);
  const [mainSwiper, setMainSwiper] = useState<SwiperClass | undefined>();

  return (
    <s.images_container>
      <Swiper
        loop
        thumbs={{ swiper: thumbsSwiper }}
        modules={[Thumbs, Lazy, Keyboard, Navigation]}
        autoHeight
        slidesPerView={1}
        onSwiper={setMainSwiper}
        navigation={isMobile}
        lazy={true}
        keyboard={{
          enabled: true,
        }}
        onSlideNextTransitionStart={() => {
          thumbsSwiper?.slideNext();
        }}
        onSlidePrevTransitionStart={() => {
          thumbsSwiper?.slidePrev();
        }}
        spaceBetween={12}
      >
        {images.map((image) => (
          <SwiperSlide key={image.id}>
            <ImageMain {...image} />
          </SwiperSlide>
        ))}
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
          {images.map(({ id, url }) => (
            <s.image_miniature_container key={id}>
              <s.image_miniature active src={url} />
            </s.image_miniature_container>
          ))}
        </s.image_swiper>
        <Controls swiper={mainSwiper} />
      </s.image_selector>
    </s.images_container>
  );
};

const ImageMain = ({
  id,
  url,
  height,
  width,
  hash,
}: CommissionItemSchema["images"][0]) => {
  const [isLoaded, setLoaded] = useState(false);
  const [isLoadStarted, setLoadStarted] = useState(false);

  const handleLoad = () => setLoaded(true);
  const handleLoadStarted = () => setLoadStarted(true);

  return (
    <s.image_main_container
      style={{
        aspectRatio: width / height,
      }}
    >
      <s.image_main
        key={id}
        src={url}
        loading="lazy"
        onLoad={handleLoad}
        beforeLoad={handleLoadStarted}
      />

      {!isLoaded && isLoadStarted && (
        <s.image_main_hash
          width={"100%"}
          resolutionY={32}
          punch={1}
          hash={hash}
        />
      )}
    </s.image_main_container>
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
