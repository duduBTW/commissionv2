import { useDrawerMobile, useCategorys, useParams } from "../..";

// styles
import * as s from "./styles";

// components
import * as dialog from "components/dialog";
import Typography from "components/typography";
import CategorysSidebar from "../../sidebar";
import services from "service";
import usePrice from "utils/usePrice";

const MobileDrawer = () => {
  const { artistId, commissionId } = useParams();
  const [open, setDrawerMobileOpen] = useDrawerMobile();
  const { data: commission } = services.artist.useCommission(
    artistId,
    commissionId
  );
  const { data: categorys } = useCategorys();
  const price = usePrice(commission?.price);

  if (!categorys) return <></>;
  return (
    <dialog.root open={open} onOpenChange={setDrawerMobileOpen}>
      <dialog.portal>
        <dialog.overlay />
        <s.drawer_content>
          {commission && (
            <div>
              <Typography variant="title-03">{commission.name}</Typography>
              <div style={{ height: "0.4rem" }} />
              <Typography color="success.main">{price}</Typography>
            </div>
          )}
          <CategorysSidebar />
        </s.drawer_content>
      </dialog.portal>
    </dialog.root>
  );
};

export default MobileDrawer;
