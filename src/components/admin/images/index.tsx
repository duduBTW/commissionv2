import { useState } from "react";

// components
import SendPlane2LineIcon from "remixicon-react/SendPlane2LineIcon";
import DeleteBin4LineIcon from "remixicon-react/DeleteBin4LineIcon";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import Button from "components/button";
import InputBase from "components/input/base";
import Typography from "components/typography";
import ButtonIcon from "components/button/icon";

// styles
import * as g from "styles/globalStyles";
import * as s from "./styles";
import { CommissionImageSchema } from "service/commission";
import encodeImageToBlurhash from "utils/encodeImageToBlurhash";
import {
  LazyComponentProps,
  trackWindowScroll,
} from "react-lazy-load-image-component";
import validURL from "utils/validUrl";

interface Image {
  id?: string;
  url: string;
  hash: string;
  width: number;
  height: number;
}

interface Props extends LazyComponentProps {
  container?: React.ElementType;
  variant?: g.ContainerVariant;
  columnsCountBreakPoints?: {
    [key: number]: number;
  };
  images: Image[];
  insertImage: (data: CommissionImageSchema) => void;
  loading?: boolean;
  onUpdate?: (data: CommissionImageSchema) => void;
  onDelete?: (id: string) => void;
}

const AdminImages = ({
  container,
  variant = "background",
  columnsCountBreakPoints = { 440: 1, 768: 2 },
  images,
  insertImage,
  loading,
  scrollPosition,
  onUpdate,
  onDelete,
}: Props) => {
  const [loadingInternal, setLoadingInternal] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const Container = container ?? g.paper;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (validURL(inputValue)) {
        setLoadingInternal(true);
        insertImage({
          url: inputValue,
          ...(await encodeImageToBlurhash(inputValue)),
        });

        setInputValue("");
      }
    } finally {
      setLoadingInternal(false);
    }
  };

  return (
    <Container loading={loading}>
      <s.header onSubmit={handleSubmit}>
        <InputBase
          variant={variant === "content" ? "contained" : "outlined"}
          disabled={loading || loadingInternal}
          value={inputValue}
          onChange={({ target: { value } }) => setInputValue(value)}
          placeholder="Adicionar imagem..."
        />
        <Button
          loading={loading || loadingInternal}
          type="submit"
          variant="secondary"
        >
          <SendPlane2LineIcon />
        </Button>
      </s.header>

      {images.length > 0 ? (
        <ResponsiveMasonry columnsCountBreakPoints={columnsCountBreakPoints}>
          <Masonry gutter="1.2rem">
            {images.map((image) => (
              <ImageCard
                onDelete={onDelete}
                onUpdate={onUpdate}
                scrollPosition={scrollPosition}
                variant={variant}
                image={image}
                key={image.id}
              />
            ))}
          </Masonry>
        </ResponsiveMasonry>
      ) : null}
    </Container>
  );
};

const ImageCard = ({
  image: { url, hash, width, height, id },
  variant,
  scrollPosition,
  onUpdate,
  onDelete,
}: {
  image: Image;
  variant: g.ContainerVariant;
  scrollPosition: LazyComponentProps["scrollPosition"];
  onUpdate?: (data: CommissionImageSchema) => void;
  onDelete?: (id: string) => void;
}) => {
  const [inputValue, setInputValue] = useState("");
  const [isLoaded, setLoaded] = useState(false);
  const [isLoadStarted, setLoadStarted] = useState(false);

  const handleLoad = () => setLoaded(true);
  const handleLoadStarted = () => setLoadStarted(true);

  const updateImage = async () => {
    if (url !== inputValue && id && validURL(inputValue)) {
      onUpdate?.({
        id,
        url: inputValue,
        ...(await encodeImageToBlurhash(inputValue)),
      });
    }
  };

  return (
    <s.card variant={variant}>
      <s.img_container
        style={{
          aspectRatio: width / height,
        }}
      >
        <s.img
          key={id}
          onLoad={handleLoad}
          beforeLoad={handleLoadStarted}
          loading="lazy"
          src={url}
          variant={variant}
          scrollPosition={scrollPosition}
        />
        {!isLoaded && isLoadStarted && (
          <s.hash
            width={"100%"}
            resolutionY={32}
            punch={1}
            hash={hash}
            variant={variant}
          />
        )}
      </s.img_container>
      <s.info
        onSubmit={(e) => {
          e.preventDefault();

          updateImage();
        }}
      >
        <InputBase
          onChange={({ target: { value } }) => setInputValue(value)}
          onBlur={updateImage}
          placeholder="https://example.com/"
          defaultValue={url}
          variant={variant === "background" ? "contained" : "outlined"}
        />

        <ButtonIcon
          variant="error"
          type="button"
          onClick={() => id && onDelete?.(id)}
        >
          <DeleteBin4LineIcon size={20} />
        </ButtonIcon>
      </s.info>
    </s.card>
  );
};

export default trackWindowScroll<Props>(AdminImages);
