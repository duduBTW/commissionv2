// components
import Link from "next/link";
import Button, { ButtonProps } from "components/button";
import InputBase from "../../input/base";
import AddLineIcon from "remixicon-react/AddLineIcon";

// styles
import * as s from "./styles";

const AdminSearch = ({
  createHref,
  createButtonProps,
}: {
  createHref?: string;
  createButtonProps?: Partial<ButtonProps>;
}) => {
  return (
    <s.container>
      <InputBase
        variant="outlined"
        placeholder="Search..."
        type="text"
        name=""
        id=""
      />
      {createHref && (
        <Link href={createHref}>
          <Button variant="secondary" {...createButtonProps}>
            <AddLineIcon />
          </Button>
        </Link>
      )}
    </s.container>
  );
};

export default AdminSearch;
