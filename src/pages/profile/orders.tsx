import OrderCard from "components/order/card";
import ProfileLayout from "components/profile/layout";

// styles
import * as g from "styles/globalStyles";

const ProfileOrdersPage = () => {
  return (
    <ProfileLayout>
      <g.paper>
        <OrderCard />
        <OrderCard />
        <OrderCard />
      </g.paper>
    </ProfileLayout>
  );
};

export default ProfileOrdersPage;
