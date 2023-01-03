import Typography from "components/typography";
import { useMemo } from "react";

// styles
import * as s from "./styles";

const capitalizeFirstLetter = (value = "") => {
  return value.charAt(0).toUpperCase() + value.slice(1);
};

const OrderProgress = ({
  steps,
  currentStep,
}: {
  steps: string;
  currentStep: string;
}) => {
  const stepsList = useMemo(
    () =>
      `not_approved,approved,${steps},finished`
        .split(",")
        .map((step) => step.trim()),
    [steps]
  );
  const indexCurrentStep = useMemo(
    () => stepsList.indexOf(currentStep),
    [stepsList, currentStep]
  );

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
      <s.steps>
        {stepsList.map((step, index) => (
          <s.step active={index <= indexCurrentStep} key={step} />
        ))}
      </s.steps>
    </s.container>
  );
};

export default OrderProgress;
