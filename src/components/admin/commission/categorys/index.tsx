import { SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import { CommissionCategoryCreateSchema } from "service/admin/commission";
import { useMutation } from "@tanstack/react-query";
import services from "service";
import { toast } from "react-hot-toast";

// components
import CloseLineIcon from "remixicon-react/CloseLineIcon";
import DeleteBin4LineIcon from "remixicon-react/DeleteBin4LineIcon";
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
  let content = <></>;
  const {
    data: categorys,
    refetch,
    isRefetching,
    isLoading,
  } = services.admin.useCommissionCategoryList(commissionId, {
    refetchOnMount: true,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });
  const { mutate: insertCategoryCommission, isLoading: isInserting } =
    useMutation(services.admin.insertCategoryCommission(commissionId), {
      onSuccess: () => {
        toast.success("Categoria adicionada com sucesso!");

        refetch();
        setCreateDialogOpen(false);
      },
    });

  const { mutate: updateCommissionCategory, isLoading: isUpdating } =
    useMutation(services.admin.updateCommissionCategory(commissionId), {
      onSuccess: () => {
        toast.success("Categoria editada com sucesso!");
      },
    });
  const { mutate: deleteCommissionCategory, isLoading: isDeleting } =
    useMutation(services.admin.deleteCommissionCategory(commissionId), {
      onSuccess: () => {
        toast.success("Categoria deletada com sucesso!");

        refetch();
      },
    });

  if (isLoading) return <></>;
  if (categorys && categorys.length > 0) {
    content = (
      <>
        <Button
          variant="secondary"
          onClick={() => setCreateDialogOpen(true)}
          fullWidth
        >
          Criar categoria
        </Button>

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
              <ButtonIcon
                onClick={() => deleteCommissionCategory(category.id)}
                type="button"
                variant="error"
              >
                <DeleteBin4LineIcon />
              </ButtonIcon>
            }
          />
        ))}
      </>
    );
  } else {
    content = (
      <div>
        <s.empty_title variant="title-02">Nenhuma categoria</s.empty_title>
        <s.empty_description variant="body-01" color="text.40">
          Cadastre categorias com as informacoes que voce precisa para realizar
          a commission (ex. cabelo, roupa, acessrios etc)
        </s.empty_description>

        <Button onClick={() => setCreateDialogOpen(true)} fullWidth>
          Criar categoria
        </Button>
      </div>
    );
  }

  return (
    <>
      <g.paper
        loading={isInserting || isUpdating || isDeleting || isRefetching}
      >
        {content}
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
              variant="background"
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
  variant = "content",
}: {
  onSubmit: SubmitHandler<CommissionCategoryCreateSchema>;
  defaultValues?: CommissionCategoryCreateSchema;
  autoFocus?: boolean;
  submitLabel: string;
  loading?: boolean;
  footer?: React.ReactNode;
  variant?: "content" | "background";
}) => {
  const { control, handleSubmit } = useForm<CommissionCategoryCreateSchema>({
    defaultValues,
  });

  return (
    <s.form_container variant={variant} onSubmit={handleSubmit(onSubmit)}>
      <InputText
        autoFocus={autoFocus}
        control={control}
        label="Nome *"
        name="name"
        variant={"outlined"}
      />
      <InputEditor
        control={control}
        label="Descricao *"
        name="description"
        variant={"outlined"}
      />
      <s.form_footer>
        {footer}
        <Button
          fullWidth={variant === "background"}
          loading={loading}
          type="submit"
        >
          {submitLabel}
        </Button>
      </s.form_footer>
    </s.form_container>
  );
};

export default AdminCommissionsCategorys;
