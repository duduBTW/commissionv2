import styled from "@emotion/styled";
import Typography from "components/typography";
import { mq } from "styles/theme";

export const banner = styled.img`
  height: 12rem;
  width: calc(100% + 4rem);
  margin: -2rem -2rem 2rem;
  object-fit: cover;

  ${mq.fromTabletSm} {
    height: 18rem;
  }

  ${mq.fromDesktopSm} {
    margin: 0 0 2rem;
    width: 100%;
    height: 20rem;
    border-radius: 0.8rem;
  }
`;

export const user_name = styled(Typography)`
  margin-top: 1.2rem;
`;

export const arist_header_dense_container = styled.a`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  text-underline-offset: 0.4rem;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

export const dense_user_name = styled(Typography)``;
