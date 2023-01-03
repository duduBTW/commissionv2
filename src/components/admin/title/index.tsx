// components
import ButtonIcon from "components/button/icon";
import Link from "next/link";
import ArrowLeftLineIcon from "remixicon-react/ArrowLeftLineIcon";

// styles
import * as s from "./styles";

const AdminHeader = ({
  children,
  backHref,
}: {
  children: React.ReactNode;
  backHref?: string;
}) => {
  return (
    <s.container>
      {backHref && (
        <Link href={backHref}>
          <ButtonIcon size="small">
            <ArrowLeftLineIcon color="var(--color-text-60)" />
          </ButtonIcon>
        </Link>
      )}
      <s.title variant="title-04" color="text.60">
        {children}
      </s.title>
    </s.container>
  );
};

export default AdminHeader;
