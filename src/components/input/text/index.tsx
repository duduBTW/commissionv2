import { Control, FieldValues, Path, useController } from "react-hook-form";

// components
import Typography from "components/typography";
import InputBase, { InputBaseProps } from "../base";

interface InputTextProps<T extends FieldValues = FieldValues>
  extends InputBaseProps {
  label?: string;
  name: Path<T>;
  control: Control<T>;
}

const InputText = <T extends FieldValues = FieldValues>({
  label,
  control,
  name,
  ...inputBaseProps
}: InputTextProps<T>) => {
  const {
    field: { onChange, onBlur, value, ref },
    fieldState: { error },
  } = useController({
    control,
    name,
  });

  return (
    <div
      style={{
        width: "100%",
      }}
    >
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
      <InputBase
        onBlur={onBlur}
        {...inputBaseProps}
        name={name}
        ref={ref}
        onChange={(e) => onChange(e.target.value)}
        value={value}
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

export default InputText;
