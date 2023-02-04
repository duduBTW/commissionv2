import { ArtistCommissionOrderParams } from "pages/artist/[artistId]/commission/[commissionId]/order";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import constate from "constate";
import services from "service";
import StarterKit from "@tiptap/starter-kit";
import { EditorOptions, JSONContent, useEditor } from "@tiptap/react";
import DOMPurify from "isomorphic-dompurify";
import { useSwipeable } from "react-swipeable";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Confirmation, confirmationSchema } from "service/artist/order";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";

// styles
import * as s from "./styles";

// components
import * as Tabs from "@radix-ui/react-tabs";
import * as radio from "components/radio";
import ArrowLeftLineIcon from "remixicon-react/ArrowLeftLineIcon";
import Typography from "components/typography";
import Button from "components/button";
import Nav from "components/Nav";
import Placeholder from "@tiptap/extension-placeholder";
import MobileMenu from "./mobile/menu";
import MobileDrawer from "./mobile/drawer";
import CategorysSidebar from "./sidebar";
import { CommissionCardVerticalDense } from "../card/vertical";
import InputText from "components/input/text";
import InputRadio from "components/input/radio";

const useArtistCommissionOrder = ({
  params,
}: {
  params: ArtistCommissionOrderParams;
}) => {
  const { push } = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const confirmationFormProps = useForm<Confirmation>({
    resolver: zodResolver(confirmationSchema),
  });
  const [categoryContent, setCategoryContent] = useState<
    Record<string, JSONContent>
  >({});
  const [selectedTab, setSelectedTab] = useState<string>();
  const [drawerMobileOpen, setDrawerMobileOpen] = useState(false);
  const { mutate: newOrder, isLoading } = useMutation(
    services.artist.newOrder(params.artistId, params.commissionId),
    {
      onSuccess: ({ id }) => {
        push(`/profile/order/${id}/complete`);
      },
    }
  );
  const swipeHandlers = useSwipeable({
    onSwipedRight: () => {
      setDrawerMobileOpen(true);
    },
  });

  const categorys = services.artist.useCategorys(
    params.artistId,
    params.commissionId
  );

  useEffect(() => {
    if (categorys.data && categorys.data[0] && !selectedTab) {
      setSelectedTab(categorys.data[0].id);
    }
  }, [categorys.data, selectedTab]);

  const canNavigateBack = useMemo(() => {
    if (!categorys.data || categorys.data.length <= 0 || !selectedTab) {
      return false;
    }

    const indexSelectedTab = categorys.data.findIndex(
      (category) => category.id === selectedTab
    );

    return indexSelectedTab !== 0;
  }, [categorys.data, selectedTab]);

  const navigate = useCallback(
    (to: "prev" | "next") => {
      if (!canNavigateBack && to === "prev") return;
      if (!categorys.data || categorys.data.length <= 0 || !selectedTab) return;
      if (to === "next" && selectedTab === "finish" && formRef.current) {
        formRef.current.dispatchEvent(
          new Event("submit", { cancelable: true, bubbles: true })
        );
        return;
      }

      if (to === "prev" && selectedTab === "finish") {
        const lastCategoryIndex = categorys.data.length - 1;
        const prevId = categorys.data[lastCategoryIndex]?.id;

        if (prevId) {
          setSelectedTab(prevId);
        }
        return;
      }

      const indexSelectedTab = categorys.data.findIndex(
        (category) => category.id === selectedTab
      );

      if (to === "next") {
        const nextId = categorys.data[indexSelectedTab + 1]?.id;

        if (nextId) {
          setSelectedTab(nextId);
        } else {
          setSelectedTab("finish");
        }
        return;
      }

      if (to === "prev") {
        const prevId = categorys.data[indexSelectedTab - 1]?.id;

        if (prevId) {
          setSelectedTab(prevId);
        }
        return;
      }
    },
    [canNavigateBack, categorys.data, selectedTab]
  );

  const send = useCallback(
    (user: Confirmation) => {
      newOrder({
        messages: Object.entries(categoryContent).reduce<
          Record<string, string>
        >(
          (messages, [id, content]) => ({
            ...messages,
            [id]: JSON.stringify(content),
          }),
          {}
        ),
        user,
      });
    },
    [categoryContent, newOrder]
  );

  return {
    drawerMobile: [
      drawerMobileOpen,
      setDrawerMobileOpen,
      swipeHandlers,
    ] as const,
    params,
    categorys,
    selectedTab: [
      selectedTab,
      setSelectedTab,
      navigate,
      canNavigateBack,
    ] as const,
    content: [categoryContent, setCategoryContent] as const,
    form: {
      confirmationFormProps,
      formRef,
      send,
      isLoading,
    },
  };
};

export const [
  Provider,
  useDrawerMobile,
  useParams,
  useCategorys,
  useSelectedTab,
  useContent,
  useConfirmationForm,
] = constate(
  useArtistCommissionOrder,
  (value) => value.drawerMobile,
  (value) => value.params,
  (value) => value.categorys,
  (value) => value.selectedTab,
  (value) => value.content,
  (value) => value.form
);

const ArtistCommissionCategory = ({
  ...params
}: ArtistCommissionOrderParams) => {
  return (
    <Provider params={params}>
      <ArtistCommissionContent />
    </Provider>
  );
};

const ArtistCommissionContent = () => {
  const [selectedTab, setSelectedTab] = useSelectedTab();
  const [, , swipeHandlers] = useDrawerMobile();

  return (
    <Tabs.Root value={selectedTab} onValueChange={setSelectedTab}>
      <s.container {...swipeHandlers}>
        <Nav />
        <DesktopCommissionCard />
        <MobileMenu />
        <Content />
      </s.container>

      <MobileDrawer />
    </Tabs.Root>
  );
};

//
const Content = () => {
  const { data: categorys } = useCategorys();
  const { isLoading } = useConfirmationForm();
  const [selectedTab, , navigate, canNavigateBack] = useSelectedTab();
  const isLastTab = selectedTab === "finish";

  if (!categorys) return <></>;
  return (
    <>
      <s.container_desktop loading={isLoading}>
        {/* Desktop */}
        <s.sidebar_container>
          <s.sidebar>
            <CategorysSidebar />
          </s.sidebar>
        </s.sidebar_container>

        {categorys.map((category) => (
          <CategoryTab
            {...category}
            html={category.descriptionHtml}
            key={category.id}
          />
        ))}
        <ConfirmationTab />
        <s.desktop_empty />
      </s.container_desktop>
      <s.actions>
        <Button
          disabled={!canNavigateBack}
          onClick={() => navigate("prev")}
          variant="secondary"
        >
          <ArrowLeftLineIcon size={20} />
        </Button>
        <Button loading={isLoading} onClick={() => navigate("next")} fullWidth>
          {isLastTab ? "Finalizar" : "Proximo"}
        </Button>
      </s.actions>
    </>
  );
};

const CategoryTab = ({
  id,
  name,
  html,
}: {
  id: string;
  name: string;
  html?: string | null;
}) => {
  const [contentMap, setContent] = useContent();
  const purifiedHtml = useMemo(() => {
    if (!html) return;

    return DOMPurify.sanitize(html);
  }, [html]);

  return (
    <s.tab_content key={id} value={id}>
      <Typography variant="title-03">{name}</Typography>
      <div style={{ height: "0.8rem" }} />
      {purifiedHtml && (
        <>
          <Typography variant="subtitle-02" color="text.40">
            <div
              dangerouslySetInnerHTML={{
                __html: purifiedHtml,
              }}
            />
          </Typography>
          <div style={{ height: "2.4rem" }} />
        </>
      )}

      <Editor
        content={contentMap[id]}
        onUpdate={({ editor }) => {
          setContent((c) => ({ ...c, [id]: editor.getJSON() }));
        }}
      />
    </s.tab_content>
  );
};

const ConfirmationTab = () => {
  const { confirmationFormProps, formRef, send } = useConfirmationForm();
  const { control, handleSubmit } = confirmationFormProps;

  return (
    <FormProvider {...confirmationFormProps}>
      <s.tab_content value="finish">
        <Typography variant="title-03">Finalizar pedido</Typography>
        <s.finish_form onSubmit={handleSubmit(send)} ref={formRef}>
          <InputText
            variant="outlined"
            control={control}
            label="Método de contato (discord, twitter ou outro)"
            name="contact"
            placeholder="usuario#1234"
          />
          <InputText
            variant="outlined"
            control={control}
            label="Nome completo"
            name="name"
          />
          <InputText
            variant="outlined"
            control={control}
            label="Data de nascimento"
            name="brith"
            placeholder="dia/mes/ano"
          />
          <InputRadio
            label="Quem realizara o pagamento"
            control={control}
            name="paying"
            defaultValue="me"
          >
            <radio.item_container>
              <radio.item value="me" id="me">
                <radio.indicator />
              </radio.item>
              <radio.label htmlFor="me">Eu</radio.label>
            </radio.item_container>

            <radio.item_container>
              <radio.item value="parent" id="parent">
                <radio.indicator />
              </radio.item>
              <radio.label htmlFor="parent">Parente</radio.label>
            </radio.item_container>

            <radio.item_container>
              <radio.item value="other" id="other">
                <radio.indicator />
              </radio.item>
              <radio.label htmlFor="other">Outro</radio.label>
            </radio.item_container>
          </InputRadio>
          <button type="submit" />
        </s.finish_form>
      </s.tab_content>
    </FormProvider>
  );
};

export const Editor = (editorOptions: Partial<EditorOptions>) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "Conteudo...",
      }),
    ],
    ...editorOptions,
  });

  return <s.editor editor={editor} />;
};

//
const DesktopCommissionCard = () => {
  const { artistId, commissionId } = useParams();
  const { data: commission } = services.artist.useCommission(
    artistId,
    commissionId
  );

  if (!commission) return <></>;
  return (
    <s.card_desktop>
      <CommissionCardVerticalDense
        name={commission.name}
        image={commission.images[0]?.url}
        price={commission.price}
      />
    </s.card_desktop>
  );
};

export default ArtistCommissionCategory;
