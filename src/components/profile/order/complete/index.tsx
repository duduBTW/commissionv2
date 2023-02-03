import services from "service";

// components
import Typography from "components/typography";
import CommissionCardVertical from "components/commission/card/vertical";

// styles
import * as s from "./styles";
import * as g from "styles/globalStyles";
import Button from "components/button";
import Link from "next/link";

const ProfileOrderComplete = ({ orderId }: { orderId: string }) => {
  const { data: order } = services.profile.useOrder(orderId);

  return (
    <>
      <s.container>
        <s.background_order_finished />
      </s.container>
      <g.paper_container>
        <Typography color="content" variant="title-03">
          Pedido finalizado
        </Typography>
      </g.paper_container>
      <g.paper dense>
        <Typography>
          Taka entrara em contato com você no <strong>{order?.contact}</strong>{" "}
          para finalizar o pedido.
        </Typography>
      </g.paper>
      {order && (
        <s.commission_container>
          <CommissionCardVertical
            {...order.commission}
            image={order.commission.images[0]?.url}
          />
        </s.commission_container>
      )}
      <g.paper_container>
        <Link href="/">
          <Button autoFocus fullWidth>
            Voltar para o inicio
          </Button>
        </Link>
      </g.paper_container>
    </>
  );
};

export default ProfileOrderComplete;
