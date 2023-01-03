import styled from "@emotion/styled";
import Typography from "components/typography";
import UserAvatar from "components/user/avatar";
import { mq } from "styles/theme";

interface BannerProps {
  noMargin?: boolean;
}

export const banner = styled.img<BannerProps>`
  height: 16rem;
  width: calc(100% + 4rem);
  margin: ${({ noMargin }) => (noMargin ? "0" : "0 0 2rem")};
  object-fit: cover;

  ${mq.fromTabletSm} {
    height: 20rem;
  }

  ${mq.fromDesktopSm} {
    margin: ${({ noMargin }) => (noMargin ? "0" : "0 0 2rem")};
    width: 100%;
    height: 24rem;
    border-radius: 1.2rem;
  }
`;

export const banner_placeholder = styled.div<BannerProps>`
  background-color: var(--color-primary-l);

  height: 16rem;
  width: calc(100% + 4rem);
  margin: ${({ noMargin }) => (noMargin ? "0" : "0 0 2rem")};

  ${mq.fromTabletSm} {
    height: 20rem;
  }

  ${mq.fromDesktopSm} {
    margin: ${({ noMargin }) => (noMargin ? "0" : "0 0 2rem")};
    width: 100%;
    height: 24rem;
    border-radius: 1.2rem;
  }
`;

export const user_name = styled(Typography)`
  margin-top: 1.2rem;
  padding-bottom: 2rem;
  margin-left: 1.6rem;

  ${mq.fromDesktopSm} {
    margin-left: 0;
  }
`;

export const arist_header_dense_container = styled.a`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  text-underline-offset: 0.4rem;
  cursor: pointer;

  &:hover,
  &:focus {
    text-decoration: underline;
  }
`;

export const dense_user_name = styled(Typography)``;

export const user_avatar = styled(UserAvatar)`
  margin-left: 1.6rem;

  ${mq.fromDesktopSm} {
    margin-left: 0;
  }
`;
