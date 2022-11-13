// components
import ButtonIcon from "components/button/icon";
import Link from "next/link";
import ArrowLeftLineIcon from "remixicon-react/ArrowLeftLineIcon";

// styles
import * as s from "./styles";

const AdmindHeader = ({
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
          <ButtonIcon>
            <ArrowLeftLineIcon />
          </ButtonIcon>
        </Link>
      )}
      <s.title variant="title-03">{children}</s.title>
    </s.container>
  );
};

export default AdmindHeader;
