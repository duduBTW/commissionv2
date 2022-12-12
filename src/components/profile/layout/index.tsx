import UserLineIcon from "remixicon-react/UserLineIcon";
import Image2LineIcon from "remixicon-react/Image2LineIcon";

// styles
import LinkActive from "components/link/active";
import * as s from "./styles";

const ProfileLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <s.container>
      <s.side_nav>
        <LinkActive href={"/profile"} activeClassName="active">
          <s.side_nav_item>
            <s.side_nav_icon>
              <UserLineIcon size="2rem" />
            </s.side_nav_icon>
            <span>Minha conta</span>
          </s.side_nav_item>
        </LinkActive>
        <LinkActive href="/profile/order" activeClassName="active">
          <s.side_nav_item>
            <s.side_nav_icon>
              <Image2LineIcon size="2rem" />
            </s.side_nav_icon>
            <span>Pedidos</span>
          </s.side_nav_item>
        </LinkActive>
      </s.side_nav>
      <s.content>{children}</s.content>
    </s.container>
  );
};

export default ProfileLayout;
