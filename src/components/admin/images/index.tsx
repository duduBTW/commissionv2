import { useEffect, useRef, useState } from "react";

// components
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import SendPlane2LineIcon from "remixicon-react/SendPlane2LineIcon";
import More2FillIcon from "remixicon-react/More2FillIcon";
import DeleteBin4LineIcon from "remixicon-react/DeleteBin4LineIcon";
import Button from "components/button";
import InputBase from "components/input/base";
import ButtonIcon from "components/button/icon";
import * as menu from "components/menu";
import * as dialog from "components/dialog";

// styles
import * as g from "styles/globalStyles";
import * as s from "./styles";
import { CommissionImageSchema } from "service/admin/commission";
import { getEncodeProps } from "utils/encodeImageToBlurhash";
import {
  LazyComponentProps,
  trackWindowScroll,
} from "react-lazy-load-image-component";
import validURL from "utils/validUrl";
import Typography from "components/typography";

interface Image {
  id?: string;
  url: string;
  hash: string;
  width: number;
  height: number;
  isMiniature?: boolean;
}

interface Props extends LazyComponentProps {
  container?: React.ElementType;
  children?: React.ReactNode;
  variant?: g.ContainerVariant;
  columnsCountBreakPoints?: {
    [key: number]: number;
  };
  images?: Image[];
  insertImage: (data: CommissionImageSchema) => void;
  loading?: boolean;
  onUpdate?: (data: CommissionImageSchema) => void;
  onDelete?: (id: string) => void;
  actions?: (image: Image) => React.ReactElement | false;
  chip?: (
    image: Image
  ) => React.ReactElement | string | null | undefined | false;
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
  ...rest
}: Props) => {
  const [loadingInternal, setLoadingInternal] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [deleting, setDeleting] = useState({
    open: false,
    id: "",
  });
  const workerRef = useRef<Worker>();

  const hasImages = images && Boolean(images.length > 0);
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
    <>
      <Container loading={loading || loadingInternal}>
        {!hasImages && (
          <div>
            <s.empty_title variant="title-02">Nenhuma imagem</s.empty_title>
            <s.empty_description variant="body-01" color="text.40">
              Clique com o botão direito em uma imagem, selecione “Copiar
              endereço da imagem...” e cole esse endereço abaixo.
            </s.empty_description>
          </div>
        )}
        <s.header onSubmit={handleSubmit}>
          <InputBase
            variant={"outlined"}
            disabled={loading || loadingInternal}
            value={inputValue}
            onChange={({ target: { value } }) => setInputValue(value)}
            placeholder="http://example.com/"
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

        {hasImages && (
          <ResponsiveMasonry columnsCountBreakPoints={columnsCountBreakPoints}>
            <Masonry gutter="1.2rem">
              {images.map((image) => (
                <ImageCard
                  handleUpdate={handleUpdate}
                  onDelete={(id) =>
                    setDeleting({
                      open: true,
                      id,
                    })
                  }
                  scrollPosition={scrollPosition}
                  variant={variant}
                  image={image}
                  key={image.id}
                  {...rest}
                />
              ))}
            </Masonry>
          </ResponsiveMasonry>
        )}
      </Container>

      <dialog.root
        open={deleting.open}
        onOpenChange={(open) =>
          setDeleting({
            id: "",
            open,
          })
        }
      >
        <dialog.portal>
          <dialog.overlay />

          <dialog.content size="small">
            <dialog.header>
              <Typography variant="title-03">
                Deseja deletar essa imagem?
              </Typography>
            </dialog.header>

            <s.delete_actions>
              <Button
                onClick={() =>
                  setDeleting({
                    id: "",
                    open: false,
                  })
                }
                variant="secondary"
              >
                Cancelar
              </Button>
              <Button
                onClick={() => {
                  onDelete?.(deleting.id);

                  setDeleting({
                    id: "",
                    open: false,
                  });
                }}
              >
                Deletar
              </Button>
            </s.delete_actions>
          </dialog.content>
        </dialog.portal>
      </dialog.root>
    </>
  );
};

export const ImageCard = ({
  image,
  variant,
  scrollPosition,
  handleUpdate,
  onDelete,
  actions,
  chip,
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
  actions?: Props["actions"];
  chip?: Props["chip"];
}) => {
  const { url, id } = image;
  const [inputValue, setInputValue] = useState("");
  const chipContent = chip?.(image);

  return (
    <s.card variant={variant}>
      {chipContent && <s.chip>{chipContent}</s.chip>}
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

        <menu.root>
          <menu.trigger>
            <ButtonIcon as="div">
              <More2FillIcon size={20} />
            </ButtonIcon>
          </menu.trigger>
          <menu.content sideOffset={8}>
            <menu.item onClick={() => id && onDelete?.(id)}>
              <DeleteBin4LineIcon size={15} color="var(--color-text-40)" />
              Deletar
            </menu.item>
            {id && actions?.(image)}
          </menu.content>
        </menu.root>
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
