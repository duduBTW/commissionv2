import { StrictProps } from "react-currency-format";
import { Control, FieldValues, Path, useController } from "react-hook-form";

// components
import Typography from "components/typography";

// styles
import * as s from "./styles";

interface InputCurrencyProps<T extends FieldValues = FieldValues> {
  label?: string;
  name: Path<T>;
  control: Control<T>;
}

const InputCurrency = <T extends FieldValues = FieldValues>({
  label,
  name,
  control,
  prefix = "R$",
  thousandSeparator = ".",
  allowNegative = false,
  decimalScale = 2,
  decimalSeparator = ",",
  displayType = "input",
}: InputCurrencyProps<T> & StrictProps) => {
  const {
    field: { onChange, onBlur, value, ref },
  } = useController({
    control,
    name,
    defaultValue: 0 as any,
  });

  return (
    <div>
      {label ? (
        <>
          <Typography variant="subtitle-02" color="text.40">
            {label}
          </Typography>
        </>
      ) : null}
      <s.input
        value={value || 0}
        onValueChange={(data) => onChange(data.floatValue)}
        ref={ref}
        onBlur={onBlur}
        displayType={displayType}
        decimalSeparator={decimalSeparator}
        decimalScale={decimalScale}
        allowNegative={allowNegative}
        thousandSeparator={thousandSeparator}
        prefix={prefix}
      />
    </div>
  );
};

export default InputCurrency;
