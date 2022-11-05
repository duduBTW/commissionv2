import styled from "@emotion/styled";
import * as Tabs from "@radix-ui/react-tabs";

export const container = styled(Tabs.Content)``;

export const imagem_container = styled.a`
  overflow: hidden;
  border-radius: 0.4rem;
  cursor: pointer;

  &:hover {
    img {
      transform: scale(1.28);
    }
  }

  &:active {
    img {
      transition-duration: 0.2s;
      transform: scale(1);
    }
  }
`;

export const header = styled.div`
  margin-bottom: 2rem;
`;

export const img = styled.img`
  width: 100%;
  overflow: hidden;
  transition: transform 0.6s cubic-bezier(0.81, 0.52, 0.4, 0.75);
  user-select: none;
  pointer-events: none;
`;
