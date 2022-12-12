import { useState } from "react";
import { useSwipeable } from "react-swipeable";

// components
import { SideBarContent } from "components/admin/commission/order";
import Button from "components/button";
import ButtonIcon from "components/button/icon";
import Typography from "components/typography";
import ArrowDropRightLineIcon from "remixicon-react/ArrowDropRightLineIcon";
import Menu4LineIcon from "remixicon-react/Menu4LineIcon";
import ArrowLeftLineIcon from "remixicon-react/ArrowLeftLineIcon";
import ArrowRightLineIcon from "remixicon-react/ArrowRightLineIcon";
import * as dialog from "components/dialog";
import * as tabs from "components/tabs";
import CloseLineIcon from "remixicon-react/CloseLineIcon";

// styles
import * as s from "./styles";

const OrderCategotys = () => {
  const [first, setfirst] = useState();
  const [drawerDialog, setDrawerDialog] = useState(false);
  const swipeHandlers = useSwipeable({
    onSwipedRight: () => setDrawerDialog(true),
  });

  return (
    <tabs.root>
      <s.container {...swipeHandlers}>
        <s.sidebar>
          <SideBarContent />
        </s.sidebar>
        <s.content>
          <MobileNav openMobileDialog={() => setDrawerDialog(true)} />
          <s.message_list_container>
            <div>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia
              eligendi necessitatibus reprehenderit expedita explicabo alias
              voluptatibus ullam repellendus vitae quia? Nemo earum quae
              explicabo, rem odio minima praesentium nobis reprehenderit
              doloremque ad eum velit aliquid quisquam ipsum iste deleniti quia
              nulla maiores non sapiente labore. Consequuntur temporibus qui
              repellat? Harum quia alias est iure veritatis totam facilis
            </div>
          </s.message_list_container>

          <Footer />
        </s.content>
      </s.container>
      <MobileDrawer onOpenChange={setDrawerDialog} open={drawerDialog} />
    </tabs.root>
  );
};

const MobileNav = ({ openMobileDialog }: { openMobileDialog: () => void }) => {
  return (
    <s.mobile_nav>
      <ButtonIcon
        onClick={openMobileDialog}
        style={{
          marginRight: "0rem",
        }}
      >
        <Menu4LineIcon color="var(--color-primary)" size="2rem" />
      </ButtonIcon>
      <Typography color="primary.main" variant="title-04">
        Corpo
      </Typography>
      <ArrowDropRightLineIcon color="var(--color-text-40)" size="2rem" />
      <Typography color="text.40">Cabelo</Typography>
      <ArrowDropRightLineIcon color="var(--color-text-40)" size="2rem" />
      <Typography color="text.40">...</Typography>
    </s.mobile_nav>
  );
};

const Footer = () => (
  <s.footer>
    <s.actions>
      <Button variant="secondary">
        <ArrowLeftLineIcon />
      </Button>
      <Button variant="secondary">
        <ArrowRightLineIcon />
      </Button>
    </s.actions>
  </s.footer>
);

const MobileDrawer = ({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) => (
  <dialog.root open={open} onOpenChange={onOpenChange}>
    <dialog.portal>
      <dialog.overlay />
      <s.drawer_content>
        <dialog.close>
          <s.drawer_header>
            <ButtonIcon>
              <CloseLineIcon size="2rem" />
            </ButtonIcon>
          </s.drawer_header>
        </dialog.close>
        <SideBarContent />

        {/* <s.drawer_footer>
            <UserNav align="start" />
            <Logo />
          </s.drawer_footer> */}
      </s.drawer_content>
    </dialog.portal>
  </dialog.root>
);

export default OrderCategotys;
