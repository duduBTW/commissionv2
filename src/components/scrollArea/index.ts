import styled from "@emotion/styled";
import * as ScrollArea from "@radix-ui/react-scroll-area";

export const root = styled(ScrollArea.Root)`
  width: 200px;
  height: 225px;
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0 2px 10px red;
  background-color: white;
  --scrollbar-size: 10px;
`;
