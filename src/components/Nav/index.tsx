import services from "service";
import { signOut } from "next-auth/react";

// styles
import * as s from "./styles";
import * as menu from "components/menu";

// components
import UserAvatar from "components/user/avatar";
import ButtonIcon from "components/button/icon";
import Search2LineIcon from "remixicon-react/Search2LineIcon";
import Link from "next/link";
import Button from "components/button";

const Nav = () => {
  const { data: session } = services.useSession();

  return (
    <s.nav>
      <Link href="/">
        <a>
          <s.logo src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/No-logo.svg/1024px-No-logo.svg.png" />
        </a>
      </Link>
      <s.user>
        <ButtonIcon variant="primary">
          <Search2LineIcon />
        </ButtonIcon>
        {session?.user?.image ? (
          <menu.root>
            <menu.trigger>
              <UserAvatar
                src={
                  session.user.profilePicture ??
                  session.user.image ??
                  "https://placewaifu.com/image/100/100"
                }
              />
            </menu.trigger>
            <menu.content sideOffset={8} align="end">
              {session.user.admin ? (
                <Link href="/admin/dashboard/home">
                  <menu.item>Dashboard</menu.item>
                </Link>
              ) : null}
              <Link href="/profile">
                <menu.item>Minha conta</menu.item>
              </Link>
              <Link href="/profile/orders">
                <menu.item>Meus pedidos</menu.item>
              </Link>
              <menu.item onClick={() => signOut()}>Sair</menu.item>
            </menu.content>
          </menu.root>
        ) : (
          <Link href="/login">
            <Button variant="secondary" fullWidth>
              Sing in
            </Button>
          </Link>
        )}
      </s.user>
    </s.nav>
  );
};

export default Nav;
