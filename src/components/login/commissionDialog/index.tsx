// components
import LoginMethods from "components/login/methods";
import Typography from "components/typography";
import ButtonIcon from "components/button/icon";
import CloseLineIcon from "remixicon-react/CloseLineIcon";

// styles
import * as dialog from "components/dialog";
import * as s from "./styles";
import Button from "components/button";
import { useRouter } from "next/router";

const LoginCommissionDialog = ({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange?(open: boolean): void;
}) => {
  const { asPath } = useRouter();

  return (
    <dialog.root open={open} onOpenChange={onOpenChange}>
      <dialog.portal>
        <dialog.overlay />
        <s.content>
          <s.header>
            <Typography variant="title-03">Continue purchase</Typography>
            <ButtonIcon
              onClick={() => onOpenChange?.(false)}
              variant="error"
              aria-label="Fechar"
            >
              <CloseLineIcon />
            </ButtonIcon>
          </s.header>
          <s.login_methods_container>
            <LoginMethods redirectUrl={`${asPath}/order`} />
          </s.login_methods_container>
          <s.divider>ou</s.divider>
          <Button variant="secondary" fullWidth>
            Continuar como visitante
          </Button>
        </s.content>
      </dialog.portal>
    </dialog.root>
  );
};

export default LoginCommissionDialog;
