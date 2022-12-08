import { useEffect, useRef, useState } from "react";

// components
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import SendPlane2LineIcon from "remixicon-react/SendPlane2LineIcon";
import DeleteBin4LineIcon from "remixicon-react/DeleteBin4LineIcon";
import Button from "components/button";
import InputBase from "components/input/base";
import ButtonIcon from "components/button/icon";

// styles
import * as g from "styles/globalStyles";
import * as s from "./styles";
import { CommissionImageSchema } from "service/admin/commission";
import encodeImageToBlurhash, {
  getEncodeProps,
} from "utils/encodeImageToBlurhash";
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
  children?: React.ReactNode;
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
  children,
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
  const workerRef = useRef<Worker>();

  const Container = container ?? g.paper;

  useEffect(() => {
    workerRef.current = new Worker(
      new URL("../../../../worker.ts", import.meta.url)
    );
    workerRef.current.onmessage = (
      event: MessageEvent<{
        type: string;
        url: string;
        hash: string;
        width: number;
        height: number;
        id: string;
      }>
    ) => {
      console.log(`WebWorker Response => ${event.data}`);
      switch (event.data.type) {
        case "insert":
          insertImage({
            url: event.data.url,
            width: event.data.width,
            height: event.data.height,
            hash: event.data.hash,
          });

          setLoadingInternal(false);
          break;
        case "update":
          onUpdate?.({
            url: event.data.url,
            width: event.data.width,
            height: event.data.height,
            hash: event.data.hash,
            id: event.data.id,
          });

          setLoadingInternal(false);
          break;

        default:
          break;
      }
    };
    return () => {
      workerRef.current?.terminate();
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoadingInternal(true);
    setInputValue("");

    const encodeProps = await getEncodeProps(inputValue);
    workerRef.current?.postMessage({
      payload: encodeProps,
      info: {
        url: inputValue,
        type: "insert",
      },
    });
  };

  const handleUpdate = async (
    inputValue: string,
    previusUrl: string,
    id?: string | undefined
  ) => {
    if (previusUrl === inputValue || !id || !validURL(inputValue)) return;
    setLoadingInternal(true);

    const encodeProps = await getEncodeProps(inputValue);
    workerRef.current?.postMessage({
      payload: encodeProps,
      info: {
        url: inputValue,
        type: "update",
        id,
      },
    });
  };

  return (
    <Container loading={loading || loadingInternal}>
      <s.header onSubmit={handleSubmit}>
        <InputBase
          variant={"outlined"}
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
        {children}
      </s.header>

      {!!(images.length > 0) && (
        <ResponsiveMasonry columnsCountBreakPoints={columnsCountBreakPoints}>
          <Masonry gutter="1.2rem">
            {images.map((image) => (
              <ImageCard
                handleUpdate={handleUpdate}
                onDelete={onDelete}
                scrollPosition={scrollPosition}
                variant={variant}
                image={image}
                key={image.id}
              />
            ))}
          </Masonry>
        </ResponsiveMasonry>
      )}
    </Container>
  );
};

export const ImageCard = ({
  image,
  variant,
  scrollPosition,
  handleUpdate,
  onDelete,
}: {
  image: Image;
  variant: g.ContainerVariant;
  scrollPosition?: LazyComponentProps["scrollPosition"];
  handleUpdate?: (
    inputValue: string,
    previusUrl: string,
    id: string | undefined
  ) => void;
  onDelete?: (id: string) => void;
}) => {
  const { url, id } = image;
  const [inputValue, setInputValue] = useState("");

  return (
    <s.card variant={variant}>
      <LazyImage
        scrollPosition={scrollPosition}
        variant={variant}
        image={image}
        onClick={() => window.open(url, "_blank")}
      />
      <s.info
        onSubmit={(e) => {
          e.preventDefault();

          handleUpdate?.(inputValue, url, id);
        }}
      >
        <InputBase
          onChange={({ target: { value } }) => setInputValue(value)}
          onBlur={() => handleUpdate?.(inputValue, url, id)}
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

export const LazyImage = ({
  image: { hash, height, url, width, id },
  variant,
  scrollPosition,
  onClick,
  children,
}: {
  image: Image;
  variant: g.ContainerVariant;
  scrollPosition?: LazyComponentProps["scrollPosition"];
  onClick?: React.MouseEventHandler<HTMLImageElement>;
  children?: React.ReactNode;
}) => {
  const [isLoaded, setLoaded] = useState(false);
  const [isLoadStarted, setLoadStarted] = useState(false);

  const handleLoad = () => setLoaded(true);
  const handleLoadStarted = () => setLoadStarted(true);

  return (
    <s.img_container
      style={{
        aspectRatio: width / height,
      }}
    >
      {children}
      <s.img
        key={id}
        onLoad={handleLoad}
        beforeLoad={handleLoadStarted}
        loading="lazy"
        src={url}
        variant={variant}
        scrollPosition={scrollPosition}
        onClick={onClick}
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
  );
};

export default trackWindowScroll<Props>(AdminImages);
