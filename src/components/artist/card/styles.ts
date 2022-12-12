import styled from "@emotion/styled";
import Typography from "components/typography";
import UserAvatar from "components/user/avatar";

export const container = styled.a`
  border-radius: 0.8rem;
  border: 0.3rem solid var(--color-content);
  background: var(--color-content);
  display: grid;
  align-items: center;
  grid-template-areas:
    "cover      cover"
    "userAvatar userName";
  grid-template-columns: auto 1fr;

  &:hover {
    box-shadow: 0px 4px 12px var(--color-primary-l);
  }
`;

export const cover = styled.img`
  grid-area: cover;
  height: 8rem;
  width: 100%;
  object-fit: cover;
  object-position: center;
  border-radius: 0.8rem;
`;

export const cover_placeholder = styled.div`
  grid-area: cover;
  height: 8rem;
  width: 100%;
  border-radius: 0.8rem;
  background-color: var(--color-primary-l);
`;

export const userAvatar = styled(UserAvatar)`
  grid-area: userAvatar;
  margin: 1.2rem;
`;

export const userName = styled(Typography)`
  grid-area: userName;
  margin: 1.2rem;
  text-align: right;
`;
