import OrderCategotys from "components/order/category";
import { AdminOrderItemPageParams } from "pages/admin/order/[orderId]";
import services from "service";

const AdminOrderCategorys = ({ orderId }: AdminOrderItemPageParams) => {
  const { data: messages, isLoading } =
    services.admin.useOrderMessages(orderId);

  if (isLoading || !messages) return <></>;
  return (
    <OrderCategotys
      categorys={messages.categorys}
      defaultValue={messages.categorys[0]?.id}
      content={messages.content}
    />
  );
};

export default AdminOrderCategorys;
