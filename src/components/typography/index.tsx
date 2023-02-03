import { colors } from "styles/theme";
import * as s from "./styles";

// https://stackoverflow.com/questions/58434389/typescript-deep-keyof-of-a-nested-object
type DotPrefix<T extends string> = T extends "" ? "" : `.${T}`;
type DotNestedKeys<T> = (
  T extends object
    ? {
        [K in Exclude<keyof T, symbol>]: `${K}${DotPrefix<
          DotNestedKeys<T[K]>
        >}`;
      }[Exclude<keyof T, symbol>]
    : ""
) extends infer D
  ? Extract<D, string>
  : never;

export type TextVariant =
  | "title-01"
  | "title-02"
  | "title-03"
  | "title-04"
  | "subtitle-01"
  | "subtitle-02"
  | "caption"
  | "price"
  | "body-01";

export type TextColorVariant = DotNestedKeys<typeof colors>;

export interface Props {
  variant?: TextVariant;
  color?: TextColorVariant;
  children: React.ReactNode;
  as?: "label" | "h1" | "h2" | "h3" | "p";
  ml?: number;
  className?: string;
  center?: boolean;
}

const Typography = ({
  variant = "body-01",
  children,
  as,
  color = "text.80",
  ml = 0,
  ...rest
}: Props) => {
  return (
    <s.styledText {...rest} as={as} color={color} variant={variant} ml={ml}>
      {children}
    </s.styledText>
  );
};

export default Typography;
