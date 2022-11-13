// styles
import * as s from "./styles";

export type ContainerVariant = "content" | "background" | "transparent";

const Container = ({
  children,
  variant = "background",
  className,
}: {
  children: React.ReactNode;
  variant?: ContainerVariant;
  className?: string;
}) => {
  return (
    <s.container className={className} variant={variant}>
      <s.content className="content">{children}</s.content>
    </s.container>
  );
};

export default Container;
