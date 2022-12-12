import { useEffect } from "react";
import { User } from "next-auth";
import { useForm } from "react-hook-form";
import services from "service";
import { useOrderStatus } from "..";
import { ArtistCommissionOrderParams } from "pages/artist/[artistId]/commission/[commissionId]/order";

// components
import Button from "components/button";
import InputText from "components/input/text";
import Typography from "components/typography";
import CommissionCardVertical from "components/commission/card/vertical";

// styles
import * as s from "./styles";

type OnSubmit = (data: Partial<User>) => void;

export const OrderConfirmacao = ({
  onSubmit,
  ...params
}: { onSubmit: OnSubmit } & ArtistCommissionOrderParams) => {
  return (
    <>
      <OrderCommissionItem {...params} />
      <OrderConfirmacaoForm onSubmit={onSubmit} />
    </>
  );
};

const OrderCommissionItem = ({
  artistId,
  commissionId,
}: ArtistCommissionOrderParams) => {
  const { data: commission, isLoading } = services.artist.useCommission(
    artistId,
    commissionId
  );
  if (isLoading) return <></>;
  if (!commission) return <></>;
  return (
    <s.container>
      <CommissionCardVertical {...commission} />
    </s.container>
  );
};

const OrderConfirmacaoForm = ({ onSubmit }: { onSubmit: OnSubmit }) => {
  const { data: session } = services.profile.useSession();
  const { control, setValue, handleSubmit } = useForm<Partial<User>>();
  const { isLoading } = useOrderStatus();

  useEffect(() => {
    if (session?.user) {
      setValue("discord", session.user.discord);
      setValue("twitter", session.user.twitter);
      //
    }
  }, [session?.user, setValue]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
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

export default OrderConfirmacao;
