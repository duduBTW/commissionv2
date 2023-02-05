import { AdminOrderItemPageParams } from "pages/admin/order/[orderId]";
import services from "service";

// components
import CommissionCardVertical from "components/commission/card/vertical";
import Container from "components/container";
import Typography from "components/typography";
import UserAvatar from "components/user/avatar";

// styles
import * as s from "./styles";

const AdminOrderInformation = ({ orderId }: AdminOrderItemPageParams) => {
  return (
    <Container padding="2.4rem 0">
      <Commission orderId={orderId} />
      <User orderId={orderId} />
    </Container>
  );
};

const Commission = ({ orderId }: AdminOrderItemPageParams) => {
  const { data: order, isLoading } = services.admin.useOrder(orderId);

  if (!order || isLoading) return <></>;
  return (
    <s.order_commission_container align="left" noPadding>
      <CommissionCardVertical
        {...order.commission}
        image={order.commission.images[0]?.url}
      />
    </s.order_commission_container>
  );
};

const User = ({ orderId }: AdminOrderItemPageParams) => {
  const { data: order, isLoading } = services.admin.useOrder(orderId);

  if (!order || isLoading) return <></>;
  return (
    <s.container_user>
      {order.user?.profilePicture && (
        <UserAvatar src={order.user.profilePicture} />
      )}
      <s.information_grid>
        {order.user?.userName && (
          <UserInfoItem label="Nome completo">{order.fullName}</UserInfoItem>
        )}
        {order.contact && (
          <UserInfoItem label="Contato">{order.contact}</UserInfoItem>
        )}
        {order.birthDate && (
          <UserInfoItem label="Data de nascimento">
            {order.birthDate}
          </UserInfoItem>
        )}
        {order.payingType && (
          <UserInfoItem label="Quem realizara o pagamento">
            {order.payingType}
          </UserInfoItem>
        )}
      </s.information_grid>
    </s.container_user>
  );
};

const UserInfoItem = ({
  children,
  label,
}: {
  label: string;
  children: React.ReactNode;
}) => (
  <s.information_item>
    <Typography color="text.40" variant="subtitle-02">
      {label}
    </Typography>
    <Typography variant="body-01">{children}</Typography>
  </s.information_item>
);

export default AdminOrderInformation;
