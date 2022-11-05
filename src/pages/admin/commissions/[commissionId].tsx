import services from "service";
import { dehydrate, QueryClient, useMutation } from "@tanstack/react-query";
import { GetServerSideProps } from "next";

// styles
import * as t from "components/tabs";
import * as g from "styles/globalStyles";

// components
import AdminCommissionForm from "components/admin/commission/form";
import AdmindHeader from "components/admin/title";
import AdminImages from "components/admin/images";

const CommissionsEditPage = ({ commissionId }: { commissionId: string }) => {
  const { data: commission } = services.useCommission(commissionId);
  const { data: images, refetch: refetchImages } =
    services.useCommissionImageList(commissionId);
  const { mutate: insertImage, isLoading: insertingImages } = useMutation(
    services.insertImageCommission(commissionId),
    {
      onSuccess: () => {
        refetchImages();
      },
    }
  );
  const { mutate: updateImage, isLoading: updatingImages } = useMutation(
    services.updateImageCommission(commissionId),
    {
      onSuccess: () => {
        refetchImages();
      },
    }
  );
  const { mutate: deleteImage, isLoading: deletingImages } = useMutation(
    services.deleteImageCommission(commissionId),
    {
      onSuccess: () => {
        refetchImages();
      },
    }
  );

  const { mutate: updateCommission, isLoading: updatingCommission } =
    useMutation(services.updateCommission(commissionId));

  if (!commission) return <></>;
  return (
    <>
      <AdmindHeader backHref="/admin/dashboard/commissions">
        Editar commission
      </AdmindHeader>
      <t.root defaultValue="info">
        <g.paper_container>
          <t.list variant="background">
            <t.trigger value="info">Informacoes</t.trigger>
            <t.trigger value="images">Imagens</t.trigger>
          </t.list>
        </g.paper_container>
        <t.content value="info">
          <AdminCommissionForm
            loading={updatingCommission}
            onSubmit={(d) => updateCommission(d)}
            defaultValues={commission}
            submitLabel="Salvar"
          />
        </t.content>
        <t.content value="images">
          {images && (
            <AdminImages
              loading={insertingImages || updatingImages || deletingImages}
              insertImage={(d) => insertImage(d)}
              onUpdate={(d) => updateImage(d)}
              onDelete={(id) => deleteImage(id)}
              images={images}
            />
          )}
        </t.content>
      </t.root>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const commissionId = params?.["commissionId"];
  if (typeof commissionId !== "string")
    return {
      notFound: true,
    };

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(
    [services.useCommissionKey, commissionId],
    services.getCommission(commissionId)
  );

  return {
    props: {
      commissionId,
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default CommissionsEditPage;
