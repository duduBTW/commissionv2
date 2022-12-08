// styles
import Button from "components/button";
import InputText from "components/input/text";
import Typography from "components/typography";
import { useForm } from "react-hook-form";
import * as s from "./styles";

export const OrderConfirmacao = () => {
  return (
    <>
      <s.container>
        <s.image src="https://pbs.twimg.com/media/Fb4DpfSVUAEDsS9?format=jpg&name=large" />
        <s.figure_name variant="title-02">Drawing - Full Body</s.figure_name>
        <s.figure_price variant="price" color="success.main">
          R$200,00
        </s.figure_price>
      </s.container>
      <OrderConfirmacaoForm />
    </>
  );
};

const OrderConfirmacaoForm = () => {
  const { control } = useForm();

  return (
    <div
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
      >
        Finalizar
      </Button>
    </div>
  );
};

export default OrderConfirmacao;
