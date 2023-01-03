import services from "service";

// styles
import * as t from "components/tabs";

// components
import Grid from "components/grid";
import AdminSearch from "components/admin/search";
import Container from "components/container";
import OrderCard from "components/order/card";
import { AdminOrderListItemSchema } from "service/admin/order";

const DashBoardOrders = () => {
  const { data: ordersNotApproved } = services.admin.useOrderList({
    type: "not_approved",
  });
  const { data: orders } = services.admin.useOrderList({
    exclude_type: "not_approved",
  });

  const renderOrderCard = ({
    id,
    commission,
    type,
    user,
  }: AdminOrderListItemSchema) => (
    <OrderCard
      type={type}
      name={commission.name}
      key={id}
      user={user}
      href={`/admin/order/${id}`}
    />
  );

  return (
    <t.content asChild value="orders">
      <>
        {ordersNotApproved && Boolean(ordersNotApproved.length > 0) && (
          <Container variant="content">
            <Grid orders={ordersNotApproved} label="Novos pedidos">
              {renderOrderCard}
            </Grid>
          </Container>
        )}
        {orders && Boolean(orders.length > 0) && (
          <Container>
            <Grid orders={orders} header={<AdminSearch />}>
              {renderOrderCard}
            </Grid>
          </Container>
        )}
      </>
    </t.content>
  );
};

export default DashBoardOrders;
