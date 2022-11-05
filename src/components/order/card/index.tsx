// components
import Typography from "components/typography";
import UserAvatar from "components/user/avatar";

// styles
import * as s from "./styles";

const OrderCard = () => {
  return (
    <s.container>
      <s.status color="primary.main" variant="subtitle-02">
        Aguardando aprovação
      </s.status>
      <s.title variant="title-04">Drawing - Pog</s.title>
      <s.user>
        <UserAvatar
          size="small"
          src="https://pbs.twimg.com/profile_images/1563859347855343616/vqTnT94-_400x400.png"
        />
        <Typography variant="caption" color="text.60">
          iltusa (いっさ)
        </Typography>
      </s.user>
    </s.container>
  );
};

export default OrderCard;
