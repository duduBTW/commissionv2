// components
import CommissionCardVertical from "components/commission/card/vertical";
import Container from "components/container";
import Typography from "components/typography";
import UserAvatar from "components/user/avatar";

// styles
import * as s from "./styles";

const AdminOrderInformation = () => {
  return (
    <Container>
      <Commission />
      <User />
    </Container>
  );
};

const Commission = () => (
  <s.container noPadding>
    <CommissionCardVertical
      name="a"
      price={200}
      image="https://pbs.twimg.com/media/FjDXY95UoAARSYC?format=jpg&name=large"
    />
  </s.container>
);

const User = () => (
  <s.container_user>
    <UserAvatar src="https://pbs.twimg.com/profile_images/1538514775159689216/98aIeJqP_400x400.jpg" />
    <s.information_grid>
      <UserInfoItem label="Nome">Carlos Eduardo Alves</UserInfoItem>
      <UserInfoItem label="Email">carloseduardo108090@gmail.com</UserInfoItem>
      <UserInfoItem label="Discord">Dudu#3132</UserInfoItem>
      <UserInfoItem label="Twitter">@dudubtway</UserInfoItem>
    </s.information_grid>
  </s.container_user>
);

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
