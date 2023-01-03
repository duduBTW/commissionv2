import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useSwipeable } from "react-swipeable";

// components
import Button from "components/button";
import ButtonIcon from "components/button/icon";
import Typography from "components/typography";
import ArrowDropRightLineIcon from "remixicon-react/ArrowDropRightLineIcon";
import Menu4LineIcon from "remixicon-react/Menu4LineIcon";
import ArrowLeftLineIcon from "remixicon-react/ArrowLeftLineIcon";
import ArrowRightLineIcon from "remixicon-react/ArrowRightLineIcon";
import * as dialog from "components/dialog";
import * as tabs from "components/tabs";
import CloseLineIcon from "remixicon-react/CloseLineIcon";

// styles
import * as s from "./styles";
import UserAvatar from "components/user/avatar";

export type Message = {
  id: string;
  value: string;
  type: "text" | "image";
};

export type Category = {
  id: string;
  name: string;
  description?:
    | {
        json?: string | null;
        html?: string | null;
      }
    | null
    | undefined;
};

const scrollToBottom = () =>
  window.scrollTo({
    top: document.body.scrollHeight,
    behavior: "smooth",
  });

const OrderCategotys = ({
  content = {},
  categorys = [],
  children,
  footer,
  onValueChange,
  currentPage,
  hideContent,
  defaultValue,
}: {
  hideContent?: boolean;
  categorys: Category[];
  content: Record<string, Message[]>;
  children?: React.ReactElement;
  footer?: React.ReactElement;
  currentPage?: string;
  onValueChange?: ((value: string) => void) | undefined;
  defaultValue?: string;
}) => {
  const [currentPageInternal, setCurrentPageInternal] = useState(defaultValue);
  const [drawerDialog, setDrawerDialog] = useState(false);
  const swipeHandlers = useSwipeable({
    onSwipedRight: () => setDrawerDialog(true),
  });

  const handleValueChange = useCallback(
    (value: string) => {
      setCurrentPageInternal(value);
      onValueChange?.(value);
    },
    [onValueChange]
  );

  const nextId = useMemo(() => {
    if (!currentPageInternal) return;
    const currentPageCategoryIndex = categorys.findIndex(
      (category) => category.id === currentPageInternal
    );

    return categorys[currentPageCategoryIndex + 1]?.id;
  }, [categorys, currentPageInternal]);

  const previusId = useMemo(() => {
    if (!currentPageInternal) return;
    const currentPageCategoryIndex = categorys.findIndex(
      (category) => category.id === currentPageInternal
    );

    return categorys[currentPageCategoryIndex - 1]?.id;
  }, [categorys, currentPageInternal]);

  useEffect(() => {
    scrollToBottom();
    if (categorys[0]?.id && !currentPageInternal)
      handleValueChange(categorys[0]?.id);
  }, [categorys, currentPageInternal, handleValueChange]);

  useEffect(() => {
    setCurrentPageInternal(currentPage);
  }, [currentPage]);

  return (
    <tabs.root
      defaultValue={defaultValue}
      orientation="vertical"
      value={currentPageInternal}
      onValueChange={handleValueChange}
    >
      <s.container {...swipeHandlers}>
        <s.sidebar>
          <SideBarContent categorys={categorys} />
        </s.sidebar>
        <s.content>
          <MobileNav openMobileDialog={() => setDrawerDialog(true)} />
          <s.message_list_container hideContent={hideContent}>
            {hideContent
              ? children
              : categorys.map((category) => {
                  const messages = content[category.id];

                  return (
                    <tabs.content asChild value={category.id} key={category.id}>
                      <>
                        {category &&
                          category.description?.html &&
                          category.description?.html !== "<p></p>" && (
                            <Message
                              profilePicture="https://pbs.twimg.com/profile_images/1454223867862728704/dY0A-50X_400x400.jpg"
                              userName="Teste"
                              html={category.description.html}
                            />
                          )}
                        {messages?.map((message) => (
                          <Message
                            key={message.id}
                            profilePicture="https://pbs.twimg.com/profile_images/1431139911608909828/Qgq6Ixmt_400x400.jpg"
                            userName="yUikw"
                            message={message.value}
                          />
                        ))}
                      </>
                    </tabs.content>
                  );
                })}
          </s.message_list_container>

          {footer}
          {!hideContent && (
            <Footer
              handleValueChange={handleValueChange}
              previusId={previusId}
              nextId={nextId}
            />
          )}
        </s.content>
      </s.container>
      <MobileDrawer
        categorys={categorys}
        onOpenChange={setDrawerDialog}
        open={drawerDialog}
      />
    </tabs.root>
  );
};

export const Message = ({
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

const MobileNav = ({ openMobileDialog }: { openMobileDialog: () => void }) => {
  return (
    <s.mobile_nav>
      <ButtonIcon
        onClick={openMobileDialog}
        style={{
          marginRight: "0rem",
        }}
      >
        <Menu4LineIcon color="var(--color-primary)" size="2rem" />
      </ButtonIcon>
      <Typography color="primary.main" variant="title-04">
        Corpo
      </Typography>
      <ArrowDropRightLineIcon color="var(--color-text-40)" size="2rem" />
      <Typography color="text.40">Cabelo</Typography>
      <ArrowDropRightLineIcon color="var(--color-text-40)" size="2rem" />
      <Typography color="text.40">...</Typography>
    </s.mobile_nav>
  );
};

const Footer = ({
  nextId,
  previusId,
  handleValueChange,
}: {
  previusId: string | undefined;
  nextId: string | undefined;
  handleValueChange: (value: string) => void;
}) => {
  if (!previusId && !nextId) return <></>;

  return (
    <s.footer>
      <s.actions>
        <Button
          onClick={() => previusId && handleValueChange(previusId)}
          type="button"
          disabled={!previusId}
          variant="secondary"
        >
          <ArrowLeftLineIcon />
        </Button>
        <Button
          type="button"
          onClick={() => nextId && handleValueChange(nextId)}
          disabled={!nextId}
          variant="secondary"
        >
          <ArrowRightLineIcon />
        </Button>
      </s.actions>
    </s.footer>
  );
};

export const SideBarContent = ({ categorys }: { categorys: Category[] }) => {
  return (
    <s.category_list>
      {categorys.map(({ id, name }) => (
        <s.category_item key={id} value={id}>
          {name}
        </s.category_item>
      ))}
    </s.category_list>
  );
};

const MobileDrawer = ({
  open,
  onOpenChange,
  categorys,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  categorys: Category[];
}) => (
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
        <SideBarContent categorys={categorys} />
      </s.drawer_content>
    </dialog.portal>
  </dialog.root>
);

export default OrderCategotys;
