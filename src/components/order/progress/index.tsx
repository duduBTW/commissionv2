import Divider from "components/divider";
import Typography from "components/typography";
import { useMemo } from "react";

// styles
import * as s from "./styles";

const capitalizeFirstLetter = (value = "") => {
  return value.charAt(0).toUpperCase() + value.slice(1);
};

const OrderProgress = ({ currentStep }: { currentStep: string }) => {
  return (
    <s.container>
      <s.current_step>
        <Typography variant="subtitle-01" color="text.80">
          {capitalizeFirstLetter(currentStep)}
        </Typography>
        <Typography variant="subtitle-01" color="text.40">
          - Atualizado dia 12/12/2022
        </Typography>
      </s.current_step>
    </s.container>
  );
};

export default OrderProgress;
