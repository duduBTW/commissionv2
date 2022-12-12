import { Control, FieldValues, Path, useController } from "react-hook-form";

// styles
import * as g from "styles/globalStyles";

// components
import Typography from "components/typography";
import InputBase, { InputBaseProps } from "../base";

interface InputImageProps<T extends FieldValues = FieldValues>
  extends Omit<InputBaseProps, "children"> {
  label?: string;
  name: Path<T>;
  control: Control<T>;
  children: (src: string) => React.ReactNode;
}

const InputImage = <T extends FieldValues = FieldValues>({
  label,
  control,
  name,
  children,
  ...inputBaseProps
}: InputImageProps<T>) => {
  const {
    field: { onChange, onBlur, value, ref },
  } = useController({
    control,
    name,
  });

  return (
    <div>
      {label ? (
        <>
          <Typography variant="subtitle-02" color="text.40">
            {label}
          </Typography>
          <div style={{ height: "1.2rem" }} />
        </>
      ) : null}
      {children(value)}
      <div style={{ height: "2rem" }} />
      <InputBase
        {...inputBaseProps}
        name={name}
        onBlur={onBlur}
        ref={ref}
        onChange={(e) => onChange(e.target.value)}
        value={value}
      />
      <div style={{ height: "2rem" }} />
      <g.paper_divider />
    </div>
  );
};

export default InputImage;
