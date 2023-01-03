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
    fieldState: { error },
  } = useController({
    control,
    name,
    defaultValue: 0 as any,
  });

  return (
    <div>
      {label ? (
        <>
          <Typography
            variant="subtitle-02"
            color={error ? "error.main" : "text.40"}
          >
            {label}
          </Typography>
        </>
      ) : null}
      <s.input
        value={value || 0}
        onValueChange={(data) =>
          onChange(!isNaN(data.floatValue) ? data.floatValue : 0)
        }
        ref={ref}
        onBlur={onBlur}
        displayType={displayType}
        decimalSeparator={decimalSeparator}
        decimalScale={decimalScale}
        allowNegative={allowNegative}
        thousandSeparator={thousandSeparator}
        prefix={prefix}
        error={Boolean(error)}
      />
      {error ? (
        <Typography variant="caption" color="error.main">
          {error.message}
        </Typography>
      ) : null}
    </div>
  );
};

export default InputCurrency;
