import { useCategorys, useDrawerMobile, useSelectedTab } from "../..";

// styles
import * as s from "./styles";

// components
import ButtonIcon from "components/button/icon";
import Menu4LineIcon from "remixicon-react/Menu4LineIcon";
import ArrowDropRightLineIcon from "remixicon-react/ArrowDropRightLineIcon";
import Typography from "components/typography";

const MobileMenu = () => {
  const [, setDrawerMobile] = useDrawerMobile();
  const { data: categorys } = useCategorys();

  const openMobileDrawer = () => {
    setDrawerMobile(true);
  };

  if (!categorys) return <></>;
  return (
    <s.mobile_nav>
      <ButtonIcon onClick={openMobileDrawer}>
        <Menu4LineIcon color="var(--color-primary)" size="2rem" />
      </ButtonIcon>

      <s.mobile_nav_conent>
        {categorys.map((category) => (
          <MobileItem key={category.id} id={category.id}>
            {category.name}
          </MobileItem>
        ))}

        <MobileItem id="finish" hideNextArrow>
          Dados pessoais
        </MobileItem>
      </s.mobile_nav_conent>
    </s.mobile_nav>
  );
};

const MobileItem = ({
  id,
  children,
  hideNextArrow,
}: {
  id: string;
  hideNextArrow?: boolean;
  children: React.ReactNode;
}) => {
  const [selectedTab] = useSelectedTab();
  const isSelected = selectedTab === id;

  return (
    <>
      <s.mobile_nav_tab value={id}>
        <Typography color={isSelected ? "primary.main" : "text.40"}>
          {children}
        </Typography>
      </s.mobile_nav_tab>
      {!hideNextArrow && (
        <ArrowDropRightLineIcon color="var(--color-text-40)" size="2rem" />
      )}
    </>
  );
};

export default MobileMenu;
