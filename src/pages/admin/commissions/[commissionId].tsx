import services from "service";
import { dehydrate, QueryClient, useMutation } from "@tanstack/react-query";
import { GetServerSideProps } from "next";

// styles
import * as t from "components/tabs";
import * as g from "styles/globalStyles";

// components
import AdminCommissionForm from "components/admin/commission/form";
import AdminCommissionsCategorys from "components/admin/commission/categorys";
import AdminImages from "components/admin/images";
import AdminHeader from "components/admin/title";

const CommissionsEditPage = ({ commissionId }: { commissionId: string }) => {
  const { data: commission, refetch } =
    services.admin.useCommission(commissionId);
  const { mutate: updateCommission, isLoading: updatingCommission } =
    useMutation(services.admin.updateCommission(commissionId), {
      onSuccess: () => {
        refetch();
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
  const { data: images, refetch: refetchImages } =
    services.admin.useCommissionImageList(commissionId);
  const { mutate: insertImage, isLoading: insertingImages } = useMutation(
    services.admin.insertImageCommission(commissionId),
    {
      onSuccess: () => {
        refetchImages();

        setTimeout(() => {
          window.scrollTo(0, document.body.scrollHeight);
        }, 100);
      },
    }
  );
  const { mutate: updateImage, isLoading: updatingImages } = useMutation(
    services.admin.updateImageCommission(commissionId),
    {
      onSuccess: () => {
        refetchImages();
      },
    }
  );
  const { mutate: deleteImage, isLoading: deletingImages } = useMutation(
    services.admin.deleteImageCommission(commissionId),
    {
      onSuccess: () => {
        refetchImages();
      },
    }
  );
  if (!images) return <></>;

  return (
    <AdminImages
      loading={insertingImages || updatingImages || deletingImages}
      insertImage={(d) => insertImage(d)}
      onUpdate={(d) => updateImage(d)}
      onDelete={(id) => deleteImage(id)}
      images={images}
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
