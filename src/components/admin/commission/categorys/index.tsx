import { SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import { CommissionCategoryCreateSchema } from "service/admin/commission";
import { useMutation } from "@tanstack/react-query";
import services from "service";

// components
import AdminSearch from "components/admin/search";
import CloseLineIcon from "remixicon-react/CloseLineIcon";
import InputText from "components/input/text";
import InputEditor from "components/input/editor";
import Button from "components/button";
import Typography from "components/typography";
import ButtonIcon from "components/button/icon";
import * as dialog from "components/dialog";

// styles
import * as g from "styles/globalStyles";
import * as s from "./styles";

export const AdminCommissionsCategorys = ({
  commissionId,
}: {
  commissionId: string;
}) => {
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const {
    data: categorys,
    refetch,
    isRefetching,
  } = services.admin.useCommissionCategoryList(commissionId, {
    refetchOnMount: true,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });
  const { mutate: insertCategoryCommission, isLoading: isInserting } =
    useMutation(services.admin.insertCategoryCommission(commissionId), {
      onSuccess: () => {
        refetch();
        setCreateDialogOpen(false);
      },
    });

  const { mutate: updateCommissionCategory, isLoading: isUpdating } =
    useMutation(services.admin.updateCommissionCategory(commissionId));
  const { mutate: deleteCommissionCategory, isLoading: isDeleting } =
    useMutation(services.admin.deleteCommissionCategory(commissionId), {
      onSuccess: () => refetch(),
    });

  if (!categorys) return <></>;
  return (
    <>
      <g.paper
        loading={isInserting || isUpdating || isDeleting || isRefetching}
      >
        <AdminSearch
          createButtonProps={{
            onClick: () => setCreateDialogOpen(true),
          }}
          createHref="#"
        />

        {categorys.map((category) => (
          <AdminCommissionsCategoryForm
            submitLabel="Salvar"
            key={category.id}
            defaultValues={category}
            onSubmit={(d) => {
              updateCommissionCategory({
                body: d,
                categoryId: category.id,
              });
            }}
            footer={
              <Button
                onClick={() => deleteCommissionCategory(category.id)}
                type="button"
                variant="secondary"
              >
                Excluir
              </Button>
            }
          />
        ))}
      </g.paper>

      <dialog.root open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
        <dialog.portal>
          <dialog.overlay />

          <dialog.content size="medium">
            <dialog.header>
              <Typography variant="title-03">Adicionar Categoria</Typography>
              <ButtonIcon
                onClick={() => setCreateDialogOpen(false)}
                variant="error"
                aria-label="Fechar"
              >
                <CloseLineIcon />
              </ButtonIcon>
            </dialog.header>
            <AdminCommissionsCategoryForm
              loading={isInserting}
              submitLabel="Adicionar"
              autoFocus
              onSubmit={(d) => insertCategoryCommission(d)}
            />
          </dialog.content>
        </dialog.portal>
      </dialog.root>
    </>
  );
};

export const AdminCommissionsCategoryForm = ({
  onSubmit,
  defaultValues,
  autoFocus = false,
  submitLabel,
  loading,
  footer,
}: {
  onSubmit: SubmitHandler<CommissionCategoryCreateSchema>;
  defaultValues?: CommissionCategoryCreateSchema;
  autoFocus?: boolean;
  submitLabel: string;
  loading?: boolean;
  footer?: React.ReactNode;
}) => {
  const { control, handleSubmit } = useForm<CommissionCategoryCreateSchema>({
    defaultValues,
  });

  return (
    <s.form_container onSubmit={handleSubmit(onSubmit)}>
      <InputText
        autoFocus={autoFocus}
        control={control}
        label="Nome *"
        name="name"
      />
      <InputEditor
        variant="contained"
        control={control}
        label="Descricao *"
        name="description"
      />
      <s.form_footer>
        <Button loading={loading} type="submit">
          {submitLabel}
        </Button>
        {footer}
      </s.form_footer>
    </s.form_container>
  );
};

export default AdminCommissionsCategorys;
