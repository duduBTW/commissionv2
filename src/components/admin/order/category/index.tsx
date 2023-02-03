import services from "service";
import { AdminOrderItemPageParams } from "pages/admin/order/[orderId]";

// styles
import * as g from "styles/globalStyles";

// components
import Typography from "components/typography";
import { Editor } from "components/commission/categorys";
import Container from "components/container";

const AdminOrderCategorys = ({ orderId }: AdminOrderItemPageParams) => {
  const { data: messages, isLoading } =
    services.admin.useOrderMessages(orderId);

  if (isLoading || !messages) return <></>;
  return (
    <Container>
      {messages?.map((message) => (
        <g.paper key={message.id} align="left">
          <div>
            <Typography variant="subtitle-01" color="primary.main">
              {message.category.name}
            </Typography>
            <div
              style={{
                height: "1.2rem",
              }}
            />
            <Editor content={JSON.parse(message.content)} editable={false} />
          </div>
        </g.paper>
      ))}
    </Container>
  );
};

export default AdminOrderCategorys;
