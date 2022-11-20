// components
import CommissionCard from "components/commission/card";
import { AdminCommissionListSchema } from "service/admin/commission";

// styles
import * as s from "./styles";

const CommissionsGrid = ({
  commissions,
  href,
}: {
  commissions: AdminCommissionListSchema[];
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
