import services from "service";
import { dehydrate, QueryClient, useMutation } from "@tanstack/react-query";
import { GetServerSideProps } from "next";
import toast from "react-hot-toast";

// styles
import * as t from "components/tabs";
import * as g from "styles/globalStyles";

// components
import AdminCommissionForm from "components/admin/commission/form";
import AdminCommissionsCategorys from "components/admin/commission/categorys";
import AdminImages from "components/admin/images";
import AdminHeader from "components/admin/title";
import * as menu from "components/menu";
import GalleryUploadLineIcon from "remixicon-react/GalleryUploadLineIcon";

const CommissionsEditPage = ({ commissionId }: { commissionId: string }) => {
  const { data: commission, refetch } =
    services.admin.useCommission(commissionId);
  const { mutate: updateCommission, isLoading: updatingCommission } =
    useMutation(services.admin.updateCommission(commissionId), {
      onSuccess: () => {
        refetch();
        toast.success("Commission editada com sucesso!");
      },
    });

  if (!commission) return <></>;
  return (
    <>
      <AdminHeader backHref="/admin/dashboard/commissions">
        {commission.name}
      </AdminHeader>
      <t.root defaultValue="info">
        <g.paper_container>
          <t.list variant="background">
            <t.trigger value="info">Informacoes</t.trigger>
            <t.trigger value="images">Imagens</t.trigger>
            <t.trigger value="categorias">Categorias</t.trigger>
          </t.list>
        </g.paper_container>
        <t.content asChild value="info">
          <AdminCommissionForm
            loading={updatingCommission}
            onSubmit={(d) => updateCommission(d)}
            defaultValues={commission}
            submitLabel="Salvar"
          />
        </t.content>
        <t.content asChild value="images">
          <CommissionsEditImages commissionId={commissionId} />
        </t.content>
        <t.content asChild value="categorias">
          <AdminCommissionsCategorys commissionId={commissionId} />
        </t.content>
      </t.root>
    </>
  );
};

const CommissionsEditImages = ({ commissionId }: { commissionId: string }) => {
  const {
    data: images,
    refetch: refetchImages,
    isLoading,
  } = services.admin.useCommissionImageList(commissionId);
  const { mutate: insertImage, isLoading: insertingImages } = useMutation(
    services.admin.insertImageCommission(commissionId),
    {
      onSuccess: () => {
        refetchImages();
        toast.success("Imagem adicionada com sucesso!");

        setTimeout(() => {
          window.scrollTo(0, document.body.scrollHeight);
        }, 100);
      },
      onError: () => {
        toast.error("Falha ao adicionar imagem.");
      },
    }
  );
  const { mutate: updateImage, isLoading: updatingImages } = useMutation(
    services.admin.updateImageCommission(commissionId),
    {
      onSuccess: () => {
        toast.success("Imagem atualizada com sucesso!");

        refetchImages();
      },
      onError: () => {
        toast.error("Falha ao editar imagem.");
      },
    }
  );
  const { mutate: deleteImage, isLoading: deletingImages } = useMutation(
    services.admin.deleteImageCommission(commissionId),
    {
      onSuccess: () => {
        toast.success("Imagem deletada com sucesso!");

        refetchImages();
      },
      onError: () => {
        toast.error("Falha ao deletar imagem.");
      },
    }
  );

  const {
    mutate: makeImageCommissionMiniature,
    isLoading: isSettingMiniature,
  } = useMutation(services.admin.setImageCommissionMiniature(commissionId), {
    onSuccess: () => {
      toast.success("Miniatura atualizada com sucesso!");

      refetchImages();
    },
    onError: () => {
      toast.error("Falha tornar miniatura.");
    },
  });

  if (isLoading) return <></>;
  return (
    <AdminImages
      loading={
        insertingImages ||
        updatingImages ||
        deletingImages ||
        isSettingMiniature
      }
      insertImage={(d) => insertImage(d)}
      onUpdate={(d) => updateImage(d)}
      onDelete={(id) => deleteImage(id)}
      images={images}
      chip={({ isMiniature }) => isMiniature && "Miniatura"}
      actions={({ id, isMiniature }) =>
        !isMiniature &&
        !!id && (
          <menu.item onClick={() => makeImageCommissionMiniature(id)}>
            <GalleryUploadLineIcon size={15} color="var(--color-text-40)" />
            Tornar miniatura
          </menu.item>
        )
      }
    />
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  params,
  req,
}) => {
  const commissionId = params?.["commissionId"];
  if (typeof commissionId !== "string")
    return {
      notFound: true,
    };

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(
    [services.admin.useCommissionKey, commissionId],
    services.admin.getCommission(commissionId, req.headers)
  );

  return {
    props: {
      commissionId,
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default CommissionsEditPage;
