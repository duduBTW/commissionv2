import services from "service";

// components
import OrderCard from "components/order/card";
import ProfileLayout from "components/profile/layout";
import Typography from "components/typography";

// styles
import * as g from "styles/globalStyles";

const ProfileOrdersPage = () => {
  const { data: orders, isLoading } = services.profile.useOrderList();

  if (isLoading) return <></>;
  if (!orders) return <></>;
  return (
    <ProfileLayout>
      <g.paper>
        <Typography variant="subtitle-01">Pedidos</Typography>
        {orders.map(({ id, commission, type, artist }) => (
          <OrderCard
            href={`/profile/order/${id}`}
            backgroundImage={commission.images[0]?.url}
            type={type}
            name={commission.name}
            key={id}
            user={artist.user}
          />
        ))}
      </g.paper>
    </ProfileLayout>
  );
};

export default ProfileOrdersPage;
