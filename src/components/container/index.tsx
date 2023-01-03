// styles
import * as s from "./styles";

export type ContainerVariant = "content" | "background" | "transparent";

const Container = ({
  children,
  variant = "background",
  ...rest
}: {
  children: React.ReactNode;
  variant?: ContainerVariant;
  dense?: boolean;
  className?: string;
  padding?: string;
  mdPadding?: string;
}) => {
  return (
    <s.container {...rest} variant={variant}>
      <s.content className="content">{children}</s.content>
    </s.container>
  );
};

export default Container;
