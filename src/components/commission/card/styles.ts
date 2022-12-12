import styled from "@emotion/styled";
import Typography from "components/typography";
import { mq } from "styles/theme";

export const container = styled.a`
  background: var(--color-content);
  border-radius: 0.8rem;
  padding: 1.2rem;
  cursor: pointer;
  min-width: 0;
  height: 100%;
  display: flex;
  flex-direction: column;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.82;
  }
`;

export const miniature = styled.img`
  object-position: top;
  border: 0.3rem solid var(--color-content);
  border-radius: 0.8rem;
  height: 36rem;
  width: calc(100% + 2.4rem);
  object-fit: cover;
  object-position: center 20%;
  margin: -1.2rem -1.2rem 0;

  ${mq.fromDesktopSm} {
    height: 40rem;
  }
`;

export const title = styled(Typography)`
  margin-top: 1.2rem;
`;
export const description = styled(Typography)`
  margin-top: 0.4rem;
  text-overflow: ellipsis;
  overflow: hidden;
  width: 80%;
  flex: 1;

  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const price = styled(Typography)`
  margin-top: 2.4rem;
`;
