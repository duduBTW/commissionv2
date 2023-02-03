import {
  Control,
  FieldValues,
  Path,
  PathValue,
  useController,
} from "react-hook-form";

// components
import * as radio from "components/radio";

const InputRadio = <T extends FieldValues = FieldValues>({
  label,
  control,
  name,
  children,
  defaultValue,
}: {
  label: string;
  control: Control<T>;
  name: Path<T>;
  children: React.ReactNode;
  defaultValue?: PathValue<T, Path<T>>;
}) => {
  const {
    field: { onChange, onBlur, value, ref },
  } = useController({
    control,
    name,
    defaultValue,
  });

  return (
    <radio.root
      onValueChange={onChange}
      onBlur={onBlur}
      value={value}
      ref={ref}
    >
      <radio.root_label>{label}</radio.root_label>
      {children}
    </radio.root>
  );
};

export default InputRadio;
