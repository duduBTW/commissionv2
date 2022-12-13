import React, { useCallback, useEffect, useState } from "react";
import services from "service";
import constate from "constate";
import { v4 as uuidv4 } from "uuid";
import { useForm, FormProvider, useFormContext } from "react-hook-form";
import { useRouter } from "next/router";
import { ArtistCommissionOrderParams } from "pages/artist/[artistId]/commission/[commissionId]/order";
import { useMutation } from "@tanstack/react-query";
import { User } from "next-auth";

// components
import Typography from "components/typography";
import SendPlane2LineIcon from "remixicon-react/SendPlane2LineIcon";
import Menu4LineIcon from "remixicon-react/Menu4LineIcon";
import * as dialog from "components/dialog";
import ButtonIcon from "components/button/icon";
import * as Tabs from "@radix-ui/react-tabs";
import InputText from "components/input/text";
import OrderCategotys, { Message } from "components/order/category";
import Button from "components/button";

// styles
import * as s from "./styles";

const scrollToBottom = () => window.scrollTo(0, document.body.scrollHeight);

const useArtistCommissionorder = ({
  params,
}: {
  params: ArtistCommissionOrderParams;
}) => {
  const { query, push } = useRouter();
  const [currentPage, setCurrentPage] = useState("");
  const [messages, setMessages] = useState<Record<string, Message[]>>({});
  const [imageDialog, setImageDialog] = useState<ImageDialogProps>({
    open: false,
    src: null,
  });
  const [tutorialDialog, setTutorialDialog] = useState(false);
  const { mutate: newOrder, ...newOrderStatus } = useMutation(
    services.artist.newOrder(params.artistId, params.commissionId),
    {
      onSuccess: ({ id }) => push(`/profile/order/${id}`),
    }
  );

  useEffect(() => {
    const { commissionId, artistId } = query;
    if (commissionId && artistId) {
      setMessages(
        JSON.parse(
          localStorage.getItem(`order_${artistId}_${commissionId}`) ?? "{}"
        )
      );
    }
  }, [query]);

  useEffect(() => {
    // scrollToBottom();

    const handleImageClick = (e: Event) => {
      setImageDialog({
        open: true,
        src: (e.target as HTMLImageElement).getAttribute("src"),
      });
    };

    const elements = document.querySelectorAll("#img_item");
    elements.forEach((image) =>
      image.addEventListener("click", handleImageClick)
    );

    // Opens tutorial dialog
    setTutorialDialog(true);

    return () => {
      elements.forEach((image) =>
        image.removeEventListener("click", handleImageClick)
      );
    };
  }, []);

  const postMessage = useCallback(
    (message: Omit<Message, "id">) => {
      const newMessages = {
        ...messages,
        [currentPage]: [
          ...(messages[currentPage] ?? []),
          {
            id: uuidv4(),
            ...message,
          },
        ],
      };

      setMessages(newMessages);

      // Saves offline
      const { commissionId, artistId } = query;
      if (commissionId && artistId) {
        localStorage.setItem(
          `order_${artistId}_${commissionId}`,
          JSON.stringify(newMessages)
        );
      }

      setTimeout(() => {
        scrollToBottom();
      }, 10);
    },
    [currentPage, messages, query]
  );

  const handleCurrentPageChange = (page: string) => setCurrentPage(page);

  const handleFinishSubmit = (user: Partial<User>) =>
    newOrder({
      messages,
      user,
    });

  return {
    message: {
      postMessage,
      handleCurrentPageChange,
      currentPage,
      messages,
      handleFinishSubmit,
    },
    params,
    status: newOrderStatus,
    dialog: {
      imageDialog,
      setImageDialog,
      tutorialDialog,
      setTutorialDialog,
    },
  };
};

export const [OrderProvider, useMessage, useParams, useOrderStatus, useDialog] =
  constate(
    useArtistCommissionorder,
    (value) => value.message,
    (value) => value.params,
    (value) => value.status,
    (value) => value.dialog
  );

const ArtistCommissionOrder = ({ ...params }: ArtistCommissionOrderParams) => {
  return (
    <OrderProvider params={params}>
      <ArtistCommissionOrderContent />
    </OrderProvider>
  );
};

const ArtistCommissionOrderContent = () => {
  const { commissionId } = useParams();
  const formMethods = useForm<Partial<User>>();

  const { messages, handleCurrentPageChange, currentPage, handleFinishSubmit } =
    useMessage();
  const { imageDialog, setImageDialog, setTutorialDialog, tutorialDialog } =
    useDialog();

  const { data: categorys } =
    services.admin.useCommissionCategoryList(commissionId);

  if (!categorys) return <></>;
  return (
    <>
      <FormProvider {...formMethods}>
        <OrderCategotys
          currentPage={currentPage}
          onValueChange={handleCurrentPageChange}
          categorys={[
            ...categorys,
            {
              name: "Confirmacao",
              id: "confirmacao",
            },
          ]}
          hideContent={currentPage === "confirmacao"}
          content={messages}
          footer={currentPage !== "confirmacao" ? <Footer /> : <></>}
        >
          <Tabs.Content
            style={{
              height: "100%",
            }}
            value="confirmacao"
            asChild
          >
            <OrderConfirmacaoForm onSubmit={handleFinishSubmit} />
          </Tabs.Content>
        </OrderCategotys>
      </FormProvider>
      <ImageDialog
        {...imageDialog}
        onOpenChange={(open) =>
          setImageDialog({
            open,
            src: null,
          })
        }
      />
      <TutorialDialog open={tutorialDialog} onOpenChange={setTutorialDialog} />
    </>
  );
};

const Footer = () => {
  const { control, handleSubmit, reset } = useForm<{
    message: string;
  }>();
  const { postMessage, currentPage } = useMessage();

  if (currentPage === "confirmacao") return <></>;
  return (
    <s.actions
      onSubmit={handleSubmit((data) => {
        postMessage({
          type: "text",
          value: data.message,
        });

        reset({
          message: "",
        });
      })}
    >
      <InputText
        control={control}
        name="message"
        placeholder="Digite o que você quer para o corpo..."
        variant="outlined"
      />
      <ButtonIcon type="submit">
        <SendPlane2LineIcon size="2rem" />
      </ButtonIcon>
    </s.actions>
  );
};

interface ImageDialogProps {
  open: boolean;
  src: string | null;
}

const ImageDialog = ({
  open,
  src,
  onOpenChange,
}: ImageDialogProps & {
  onOpenChange(open: boolean): void;
}) => {
  return (
    <dialog.root open={open} onOpenChange={onOpenChange}>
      <dialog.portal>
        <dialog.overlay />
        <s.dialog_content>
          {src && (
            <a href={src} target="_blank" rel="noreferrer">
              <s.image_content src={src} />
            </a>
          )}
        </s.dialog_content>
      </dialog.portal>
    </dialog.root>
  );
};

const TutorialDialog = ({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange(open: boolean): void;
}) => {
  return (
    <dialog.root open={open} onOpenChange={onOpenChange}>
      <dialog.portal>
        <dialog.overlay />
        <dialog.content
          size="medium"
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography variant="title-01">Preencha informações</Typography>
          <div
            style={{
              height: "1.2rem",
            }}
          />
          <Typography variant="body-01" color="text.40">
            Utilize essa area para nós falar o que você quer receber na sua
            commission.
          </Typography>
          <div
            style={{
              height: "0.4rem",
            }}
          />
          <Typography variant="body-01" color="text.40">
            Voce pode navegar entre diferentes categorias pelo o{" "}
            <span>
              <Menu4LineIcon
                size="1.6rem"
                color="var(--color-primary)"
                style={{
                  marginRight: "0.2rem",
                }}
              />
              <strong>menu</strong>
            </span>
            .
          </Typography>
          <s.tutorial_iniciar onClick={() => onOpenChange(false)}>
            Iniciar
          </s.tutorial_iniciar>
        </dialog.content>
      </dialog.portal>
    </dialog.root>
  );
};

const OrderConfirmacaoForm = ({
  onSubmit,
}: {
  onSubmit: (data: Partial<User>) => void;
}) => {
  const { control, setValue, handleSubmit, getValues } =
    useFormContext<Partial<User>>();
  const { data: session } = services.profile.useSession();
  const { isLoading } = useOrderStatus();

  useEffect(() => {
    if (session?.user) {
      const discord = getValues("discord");
      const twitter = getValues("twitter");
      const name = getValues("name");

      if (!discord) setValue("discord", session.user.discord);
      if (!twitter) setValue("twitter", session.user.twitter);
      if (!name) setValue("name", session.user.name);
    }
  }, [getValues, session?.user, setValue]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <Typography variant="title-01">Finalizar pedido</Typography>
      <div style={{ height: "0.8rem" }}></div>
      <Typography variant="body-01" color="text.40">
        Informe seu twitter ou discord para entrarmos em contato
      </Typography>
      <div style={{ height: "2.4rem" }}></div>
      <InputText
        control={control}
        label="Nome completo"
        name="name"
        variant="outlined"
      />
      <div style={{ height: "1.6rem" }}></div>
      <InputText
        control={control}
        label="Discord"
        name="discord"
        placeholder="username#0000"
        variant="outlined"
      />
      <div style={{ height: "1.6rem" }}></div>
      <InputText
        control={control}
        label="Twitter"
        name="twitter"
        placeholder="@username"
        variant="outlined"
      />
      <Button
        style={{
          marginTop: "auto",
        }}
        fullWidth
        loading={isLoading}
      >
        Finalizar
      </Button>
    </form>
  );
};

export default ArtistCommissionOrder;
