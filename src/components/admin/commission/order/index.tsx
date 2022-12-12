import React, { useCallback, useEffect, useState } from "react";
import services from "service";
import constate from "constate";
import { useSwipeable } from "react-swipeable";
import { v4 as uuidv4 } from "uuid";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { ArtistCommissionOrderParams } from "pages/artist/[artistId]/commission/[commissionId]/order";
import { useMutation } from "@tanstack/react-query";
import { User } from "next-auth";

// components
import Button from "components/button";
import Typography from "components/typography";
import SendPlane2LineIcon from "remixicon-react/SendPlane2LineIcon";
import ArrowLeftLineIcon from "remixicon-react/ArrowLeftLineIcon";
import ArrowRightLineIcon from "remixicon-react/ArrowRightLineIcon";
import Menu4LineIcon from "remixicon-react/Menu4LineIcon";
import CloseLineIcon from "remixicon-react/CloseLineIcon";
import ArrowDropRightLineIcon from "remixicon-react/ArrowDropRightLineIcon";
import * as dialog from "components/dialog";
import { Logo, UserNav } from "components/Nav";
import Link from "next/link";
import ButtonIcon from "components/button/icon";
import UserAvatar from "components/user/avatar";
import * as Tabs from "@radix-ui/react-tabs";
import InputText from "components/input/text";
import OrderConfirmacao from "./confirmacao";

// styles
import * as s from "./styles";
import OrderCategotys from "components/order/category";
import Container from "components/container";

export type Message = {
  id: string;
  value: string;
  type: "text" | "image";
};

const scrollToBottom = () => window.scrollTo(0, document.body.scrollHeight);

const useArtistCommissionorder = ({
  params,
}: {
  params: ArtistCommissionOrderParams;
}) => {
  const { query, push } = useRouter();
  const [currentPage, setCurrentPage] = useState("");
  const [messages, setMessages] = useState<Record<string, Message[]>>({});
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

  const handleCurrentPageChange = (page: string) => {
    setCurrentPage(page);
  };

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
      newOrder,
      handleFinishSubmit,
    },
    params,
    status: newOrderStatus,
  };
};

export const [OrderProvider, useMessage, useParams, useOrderStatus] = constate(
  useArtistCommissionorder,
  (value) => value.message,
  (value) => value.params,
  (value) => value.status
);

const ArtistCommissionOrder = ({ ...params }: ArtistCommissionOrderParams) => {
  return (
    <OrderProvider params={params}>
      <Container>
        <OrderCategotys />
      </Container>
    </OrderProvider>
  );
};

const ArtistCommissionOrderContent = () => {
  const { commissionId } = useParams();
  const { handleCurrentPageChange, currentPage } = useMessage();
  const { isLoading } = services.admin.useCommissionCategoryList(commissionId, {
    onSuccess: (categorys) => {
      if (!currentPage && categorys?.[0]?.id)
        handleCurrentPageChange(categorys[0].id);
    },
  });
  const [imageDialog, setImageDialog] = useState<ImageDialogProps>({
    open: false,
    src: null,
  });
  const [tutorialDialog, setTutorialDialog] = useState(false);
  const [drawerDialog, setDrawerDialog] = useState(false);

  const swipeHandlers = useSwipeable({
    onSwipedRight: () => setDrawerDialog(true),
  });

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

  if (isLoading) return <></>;
  return (
    <Tabs.Root
      value={currentPage}
      onValueChange={handleCurrentPageChange}
      orientation="vertical"
    >
      <s.container {...swipeHandlers}>
        <s.side_nav>
          <SideBarContent />
        </s.side_nav>

        <s.content>
          {/* <MobileNav openMobileDialog={() => setDrawerDialog(true)} /> */}
          <DesktopNav />
          <MessageList />
        </s.content>
        <Footer />
      </s.container>
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
      <MobileDrawer onOpenChange={setDrawerDialog} open={drawerDialog} />
    </Tabs.Root>
  );
};

export const SideBarContent = () => {
  const { commissionId } = useParams();
  const { data: categorys } =
    services.admin.useCommissionCategoryList(commissionId);

  if (!categorys) return null;

  return (
    <s.category_list>
      {/* <s.nav>
        <Logo size="small" />
      </s.nav> */}
      {categorys.map(({ id, name }) => (
        <s.category_item key={id} value={id}>
          {name}
        </s.category_item>
      ))}
      <s.category_item value="outro">Outras</s.category_item>
      <s.divider />
      <s.category_item value="confirmacao">Confirmacão</s.category_item>
    </s.category_list>
  );
};

const DesktopNav = () => {
  const { artistId, commissionId } = useParams();
  const { data: commission, isLoading } = services.artist.useCommission(
    artistId,
    commissionId
  );
  const { currentPage } = useMessage();

  if (isLoading) return <></>;
  if (!commission) return <></>;
  return (
    <s.nav>
      {currentPage !== "confirmacao" ? (
        <Link href={`/artist/${artistId}/commission/${commissionId}`}>
          <a>
            <Typography variant="title-04">{commission.name}</Typography>
          </a>
        </Link>
      ) : (
        <div />
      )}
      <UserNav size="default" />
    </s.nav>
  );
};

export const MessageList = () => {
  const { artistId, commissionId } = useParams();
  const { data: categorys } =
    services.admin.useCommissionCategoryList(commissionId);
  const { messages, handleFinishSubmit } = useMessage();

  return (
    <>
      {categorys?.map(({ id, description }) => (
        <Tabs.Content asChild value={id} key={id}>
          <>
            {description?.html && description.html !== "<p></p>" && (
              <Message
                profilePicture="https://pbs.twimg.com/profile_images/1454223867862728704/dY0A-50X_400x400.jpg"
                userName="Teste"
                html={description?.html}
              />
            )}
            {messages[id]?.map((message) => (
              <Message
                key={message.id}
                profilePicture="https://pbs.twimg.com/profile_images/1431139911608909828/Qgq6Ixmt_400x400.jpg"
                userName="yUikw"
                message={message.value}
              />
            ))}
          </>
        </Tabs.Content>
      ))}
      <Tabs.Content asChild value="outro"></Tabs.Content>
      <Tabs.Content asChild value="confirmacao">
        <OrderConfirmacao
          onSubmit={handleFinishSubmit}
          commissionId={commissionId}
          artistId={artistId}
        />
      </Tabs.Content>
    </>
  );
};

const Message = ({
  userName,
  message,
  html,
  profilePicture,
}: {
  userName: string;
  html?: string;
  message?: string;
  profilePicture: string;
}) => {
  return (
    <s.message_container>
      <UserAvatar src={profilePicture} />
      <div>
        <Typography variant="subtitle-01" color="primary.main">
          {userName}
        </Typography>
        {html && (
          <s.message_content
            dangerouslySetInnerHTML={{
              __html: html,
            }}
          />
        )}
        {message && <s.message_content>{message}</s.message_content>}
      </div>
    </s.message_container>
  );
};

const Footer = () => {
  const { control, handleSubmit, reset } = useForm<{
    message: string;
  }>();
  const { postMessage, currentPage } = useMessage();

  if (currentPage === "confirmacao") return <></>;
  return (
    <s.footer>
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
      <s.divider />
      <s.actions>
        <Button variant="secondary">
          <ArrowLeftLineIcon />
        </Button>
        <s.button_next variant="secondary">
          <ArrowRightLineIcon />
        </s.button_next>
      </s.actions>
    </s.footer>
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

const MobileDrawer = ({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) => {
  return (
    <dialog.root open={open} onOpenChange={onOpenChange}>
      <dialog.portal>
        <dialog.overlay />
        <s.drawer_content>
          <dialog.close>
            <s.drawer_header>
              <ButtonIcon>
                <CloseLineIcon size="2rem" />
              </ButtonIcon>
            </s.drawer_header>
          </dialog.close>
          <SideBarContent />

          <s.drawer_footer>
            <UserNav align="start" />
            <Logo />
          </s.drawer_footer>
        </s.drawer_content>
      </dialog.portal>
    </dialog.root>
  );
};

export default ArtistCommissionOrder;
