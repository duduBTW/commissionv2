// components
import CommissionCard from "components/commission/card";
import { CommissionListSchema } from "service/commission";

// styles
import * as s from "./styles";

const CommissionsGrid = ({
  commissions,
  href,
}: {
  commissions: CommissionListSchema[];
  href: string;
}) => {
  return (
    <s.container>
      {commissions.map((commission) => (
        <CommissionCard href={href} key={commission.id} {...commission} />
      ))}
    </s.container>
  );
};

export default CommissionsGrid;
