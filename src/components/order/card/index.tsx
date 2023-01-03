// components
import Typography from "components/typography";
import UserAvatar from "components/user/avatar";

// styles
import * as s from "./styles";
import Link from "next/link";

export const getTypeLabel = (type: string) => {
  switch (type) {
    case "not_approved":
      return "Aguardando aprovação";
    case "approved":
      return "Aprovado";

    default:
      return type;
  }
};

const OrderCard = ({
  type,
  name,
  backgroundImage,
  user,
  href,
}: {
  type: string;
  name: string;
  backgroundImage?: string;
  user?: {
    userName: string;
    profilePicture: string;
  };
  href: string;
}) => {
  return (
    <Link passHref href={href}>
      <s.container backgroundImage={backgroundImage ?? ""}>
        <s.status color="primary.main" variant="subtitle-02">
          {getTypeLabel(type)}
        </s.status>
        <s.title variant="title-04">{name}</s.title>
        {user && (
          <s.user>
            <UserAvatar size="small" src={user.profilePicture} />
            <Typography variant="caption" color="text.60">
              {user.userName}
            </Typography>
          </s.user>
        )}
      </s.container>
    </Link>
  );
};

export default OrderCard;
