import { useState } from "react";
import services from "service";
import { useMutation } from "@tanstack/react-query";
import { AdminOrderItemPageParams } from "pages/admin/order/[orderId]";
import { useForm } from "react-hook-form";

// components
import Button from "components/button";
import Container from "components/container";
import Typography from "components/typography";
import * as dialog from "components/dialog";
import CloseLineIcon from "remixicon-react/CloseLineIcon";
import ButtonIcon from "components/button/icon";
import InputText from "components/input/text";
import InputEditor from "components/input/editor";

// styles
import * as g from "styles/globalStyles";
import * as s from "./styles";
import { OrderProgressCreateSchema } from "pages/api/admin/order/[orderId]/progress";
import { Message } from "components/order/category";

const AdminOrderProgress = ({ orderId }: AdminOrderItemPageParams) => {
  const [open, setOpen] = useState(false);
  const { refetch, data: order } = services.admin.useOrder(orderId);
  const { data: session } = services.profile.useSession();
  const { mutate: updateOrderType, isLoading: isUpdating } = useMutation(
    services.admin.updateOrderType(orderId),
    {
      onSuccess: () => refetch(),
    }
  );

  if (!order) return <></>;
  if (order.type === "recuse") {
    return (
      <Container>
        <Typography variant="title-02">Pedido recusado.</Typography>
      </Container>
    );
  }

  if (order.type === "not_approved") {
    return (
      <Container>
        <g.paper loading={isUpdating} align="left" dense>
          <s.approve_message>
            <Typography variant="title-02">Aguardando aprovação...</Typography>
            <Typography variant="body-01" color="text.40">
              Aprove para aceitar essa commission.
            </Typography>
          </s.approve_message>
          <s.approve_actions>
            <Button
              loading={isUpdating}
              onClick={() => updateOrderType("recuse")}
              variant="secondary"
            >
              Recusar
            </Button>
            <Button
              loading={isUpdating}
              onClick={() => updateOrderType("approved")}
              fullWidth
            >
              Aprovar
            </Button>
          </s.approve_actions>
        </g.paper>
      </Container>
    );
  }

  if (order.type === "approved") {
    return (
      <Container>
        <g.paper loading={isUpdating} align="left" dense>
          <Typography variant="title-02">Pedido aprovado</Typography>
          <div />
          <Button onClick={() => setOpen(true)} fullWidth>
            Atualizar o cliente
          </Button>
        </g.paper>
        <UpdateClientModal
          open={open}
          onOpenChange={setOpen}
          orderId={orderId}
        />
      </Container>
    );
  }

  return (
    <Container>
      <g.paper align="left" size="medium" dense>
        {order.progress.map((progress) => (
          <Message
            key={progress.id}
            profilePicture={session?.user?.profilePicture ?? ""}
            userName={progress.type}
            html={progress.html}
          />
        ))}
        <Button onClick={() => setOpen(true)} fullWidth>
          Atualizar o cliente
        </Button>
      </g.paper>
      <UpdateClientModal open={open} onOpenChange={setOpen} orderId={orderId} />
    </Container>
  );
};

const UpdateClientModal = ({
  open,
  onOpenChange,
  orderId,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
} & AdminOrderItemPageParams) => {
  const { control, handleSubmit } = useForm<OrderProgressCreateSchema>();
  const { refetch: refetchOrder } = services.admin.useOrder(orderId);
  const { mutate: postProgress, isLoading: isPostingProgress } = useMutation(
    services.admin.postProgress(orderId),
    {
      onSuccess: () => {
        onOpenChange(false);
        refetchOrder();
      },
    }
  );

  return (
    <dialog.root open={open} onOpenChange={onOpenChange}>
      <dialog.portal>
        <dialog.overlay />
        <dialog.content size="medium">
          <dialog.header>
            <Typography variant="title-03">Atualizar o cliente</Typography>
            <dialog.close>
              <ButtonIcon
                onClick={() => onOpenChange(false)}
                variant="error"
                aria-label="Fechar"
              >
                <CloseLineIcon />
              </ButtonIcon>
            </dialog.close>
          </dialog.header>
          <s.form onSubmit={handleSubmit((d) => postProgress(d))}>
            <InputText
              autoFocus
              control={control}
              label="Proximo passo *"
              name="type"
              variant="outlined"
            />
            <InputEditor
              control={control}
              label="Conteudo *"
              name="content"
              variant="outlined"
            />
            <Button loading={isPostingProgress} fullWidth>
              Atualizar o cliente
            </Button>
          </s.form>
        </dialog.content>
      </dialog.portal>
    </dialog.root>
  );
};

export default AdminOrderProgress;
