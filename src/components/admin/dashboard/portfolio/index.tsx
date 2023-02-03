import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import services from "service";

// styles
import * as t from "components/tabs";
import * as menu from "components/menu";
import * as s from "./styles";

// components
import AdminImages from "components/admin/images";
import Button from "components/button";
import FileCopy2LineIcon from "remixicon-react/FileCopy2LineIcon";
import ShoppingBagLineIcon from "remixicon-react/ShoppingBagLineIcon";
import * as dialog from "components/dialog";
import Typography from "components/typography";
import ButtonIcon from "components/button/icon";
import CloseLineIcon from "remixicon-react/CloseLineIcon";
import ArrowRightSLineIcon from "remixicon-react/ArrowRightSLineIcon";
import { toast } from "react-hot-toast";

const DashBoardPortfolio = () => {
  const [vinculatingCommission, setVinculatingCommission] = useState<string>();

  const { data: images, refetch, isLoading } = services.admin.usePortfolio();
  const { mutate: insertPortfolio, isLoading: isInserting } = useMutation(
    services.admin.insertPortfolio,
    {
      onSuccess: () => {
        refetch();

        setTimeout(() => {
          window.scrollTo(0, document.body.scrollHeight);
        }, 100);
      },
    }
  );

  const { mutate: updatePortfolio, isLoading: isUpdating } = useMutation(
    services.admin.updatePortfolio,
    {
      onSuccess: () => {
        refetch();
      },
    }
  );

  const { mutate: deletePortfolio, isLoading: isDeleting } = useMutation(
    services.admin.deletePortfolio,
    {
      onSuccess: () => {
        refetch();
      },
    }
  );

  const { mutate: copyCommToPort, isLoading: isCopyingCommToPort } =
    useMutation(services.admin.copyCommToPort, {
      onSuccess: () => {
        refetch();
      },
    });

  if (isLoading) return <></>;
  return (
    <>
      <AdminImages
        images={images}
        loading={isInserting || isUpdating || isDeleting}
        insertImage={(d) => insertPortfolio(d)}
        onUpdate={(d) => updatePortfolio(d)}
        onDelete={(id) => deletePortfolio(id)}
        columnsCountBreakPoints={{ 400: 1, 680: 2, 1000: 3 }}
        variant="content"
        container={PortfolioContainer}
        chip={({ id }) => {
          const commission = images?.find(
            (image) => image.id === id
          )?.commission;

          if (!commission)
            return (
              <s.chip onClick={() => setVinculatingCommission(id)}>
                Vincular commission
              </s.chip>
            );

          return (
            <s.chip onClick={() => setVinculatingCommission(id)}>
              {commission.name}
            </s.chip>
          );
        }}
        actions={({ id }) => (
          <menu.item onClick={() => setVinculatingCommission(id)}>
            <ShoppingBagLineIcon size={15} color="var(--color-text-40)" />
            Vincular commission
          </menu.item>
        )}
      >
        <Button
          disabled={isInserting || isUpdating || isDeleting}
          loading={isCopyingCommToPort}
          type="button"
          variant="secondary"
          onClick={() => copyCommToPort()}
        >
          <FileCopy2LineIcon />
        </Button>
      </AdminImages>

      <PortfolioLinkCommissionModal
        selectedImageId={vinculatingCommission}
        onClose={() => setVinculatingCommission(undefined)}
      />
    </>
  );
};

const PortfolioContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <t.content mobileMargin="2.4rem 2rem" value="portfolio" asChild>
      <s.portfolio_container>{children}</s.portfolio_container>
    </t.content>
  );
};

const PortfolioLinkCommissionModal = ({
  selectedImageId,
  onClose,
}: {
  selectedImageId: string | undefined;
  onClose: () => void;
}) => {
  const { refetch } = services.admin.usePortfolio();
  const { data: commissions } = services.admin.useCommissionList();
  const { mutate: linkCommToPort, isLoading: isLinkingCommToPort } =
    useMutation(services.admin.linkCommToPort, {
      onSuccess: () => {
        refetch();
        onClose();

        toast.success("Commission vinculada com sucesso!");
      },
    });

  return (
    <dialog.root
      open={Boolean(selectedImageId)}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <dialog.portal>
        <dialog.overlay />

        <dialog.content size="small" loading={isLinkingCommToPort}>
          <dialog.header>
            <Typography variant="title-03">Vincular commission</Typography>
            <dialog.close>
              <ButtonIcon as="div" variant="error" aria-label="Fechar">
                <CloseLineIcon />
              </ButtonIcon>
            </dialog.close>
          </dialog.header>
          <s.portfolio_link_commission_list>
            {commissions?.map((commission) => (
              <s.portfolio_item
                onClick={() =>
                  selectedImageId &&
                  linkCommToPort({
                    commissionId: commission.id,
                    portfolioId: selectedImageId,
                  })
                }
                key={commission.id}
              >
                <Typography variant="body-01">Drawing - Full Body</Typography>
                <ArrowRightSLineIcon color="var(--color-text-40)" />
              </s.portfolio_item>
            ))}
          </s.portfolio_link_commission_list>
        </dialog.content>
      </dialog.portal>
    </dialog.root>
  );
};

export default DashBoardPortfolio;
