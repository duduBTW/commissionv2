import {
  Control,
  FieldValues,
  Path,
  PathValue,
  useController,
} from "react-hook-form";

// styles
import * as s from "./styles";

// components
import Typography from "components/typography";
import { SwitchProps } from "@radix-ui/react-switch";

interface InputTextProps<T extends FieldValues = FieldValues>
  extends SwitchProps {
  label?: string;
  name: Path<T>;
  control: Control<T>;
}

const InputSwitch = <T extends FieldValues = FieldValues>({
  label,
  control,
  name,
  ...switchProps
}: InputTextProps<T>) => {
  const {
    field: { onChange, onBlur, value, ref },
    fieldState: { error },
  } = useController({
    control,
    name,
    defaultValue: false as PathValue<T, Path<T>>,
  });

  return (
    <>
      <div>
        {label ? (
          <>
            <Typography
              variant="subtitle-02"
              color={error ? "error.main" : "text.40"}
            >
              {label}
            </Typography>
            <div style={{ height: "0.4rem" }} />
          </>
        ) : null}
        <s.switch_root
          {...switchProps}
          checked={value}
          onCheckedChange={onChange}
          ref={ref}
          onBlur={onBlur}
        >
          <s.switch_thumb />
        </s.switch_root>
      </div>
      {error ? (
        <Typography variant="caption" color="error.main">
          {error.message}
        </Typography>
      ) : null}
    </>
  );
};

export default InputSwitch;
