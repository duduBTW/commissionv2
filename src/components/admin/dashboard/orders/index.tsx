import services from "service";

// styles
import * as t from "components/tabs";

// components
import Grid from "components/grid";
import AdminSearch from "components/admin/search";
import Container from "components/container";
import OrderCard from "components/order/card";
import { AdminOrderListItemSchema } from "service/admin/order";
import Typography from "components/typography";

const DashBoardOrders = () => {
  const { data: ordersNotApproved, isLoading: isLoadingOrder } =
    services.admin.useOrderList({
      type: "not_approved",
    });
  const { data: orders, isLoading: isLoadingOrderNotApproved } =
    services.admin.useOrderList({
      exclude_type: "not_approved",
    });

  const hasApprovedOrders = orders && Boolean(orders.length > 0);
  const hasNotApprovedOrders =
    ordersNotApproved && Boolean(ordersNotApproved.length > 0);

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

  if (isLoadingOrder || isLoadingOrderNotApproved) {
    return <></>;
  }

  return (
    <t.content asChild value="orders">
      {!hasApprovedOrders && !hasNotApprovedOrders ? (
        <Container padding="3.2rem 0" mdPadding="3.2rem 2rem">
          <Typography variant="title-04" color="text.60">
            No orders yet {"~(>_<。)＼"}
          </Typography>
        </Container>
      ) : (
        <>
          {hasNotApprovedOrders && (
            <Container
              padding="3.2rem 0"
              mdPadding="3.2rem 2rem"
              variant="content"
            >
              <Grid orders={ordersNotApproved} label="Novos pedidos">
                {renderOrderCard}
              </Grid>
            </Container>
          )}
          {hasApprovedOrders && (
            <Container padding="3.2rem 0" mdPadding="3.2rem 2rem">
              <Grid orders={orders} header={<AdminSearch />}>
                {renderOrderCard}
              </Grid>
            </Container>
          )}
        </>
      )}
    </t.content>
  );
};

export default DashBoardOrders;
