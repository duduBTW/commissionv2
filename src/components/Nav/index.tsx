import services from "service";
import { signOut } from "next-auth/react";

// styles
import * as s from "./styles";
import * as menu from "components/menu";

// components
import UserAvatar, { UserAvatarSize } from "components/user/avatar";
import ButtonIcon from "components/button/icon";
import Search2LineIcon from "remixicon-react/Search2LineIcon";
import Link from "next/link";
import Button from "components/button";
import { useState } from "react";

const Nav = () => {
  return (
    <s.nav>
      <Logo />
      <s.user>
        <ButtonIcon variant="primary">
          <Search2LineIcon />
        </ButtonIcon>
        <UserNav />
      </s.user>
    </s.nav>
  );
};

export type LogoSize = "medium" | "small";
export const Logo = ({ size = "medium" }: { size?: LogoSize }) => (
  <Link href="/">
    <a>
      <s.logo size={size} src="/logo.svg" />
    </a>
  </Link>
);

export const UserNav = ({
  size,
  align = "end",
}: {
  size?: UserAvatarSize;
  align?: "start" | "center" | "end" | undefined;
}) => {
  const [open, setOpen] = useState(false);
  const { data: session } = services.profile.useSession();

  if (!session?.user?.image) {
    return (
      <Link href="/login">
        <Button variant="secondary">Entrar</Button>
      </Link>
    );
  }

  return (
    <menu.root open={open} onOpenChange={setOpen}>
      <menu.trigger>
        <UserAvatar
          size={size}
          src={
            session.user.profilePicture ??
            session.user.image ??
            "https://placewaifu.com/image/100/100"
          }
        />
      </menu.trigger>
      <menu.content onClick={() => setOpen(false)} sideOffset={8} align={align}>
        {session.user.admin ? (
          <Link href="/admin/dashboard/home">
            <menu.item>Dashboard</menu.item>
          </Link>
        ) : null}
        <Link href="/profile">
          <menu.item>Minha conta</menu.item>
        </Link>
        <Link href="/profile/order">
          <menu.item>Meus pedidos</menu.item>
        </Link>
        <menu.item onClick={() => signOut()}>Sair</menu.item>
      </menu.content>
    </menu.root>
  );
};

export default Nav;
