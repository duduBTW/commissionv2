import styled from "@emotion/styled";
import { UserAvatarSize } from ".";

export const styledAvatar = styled.img<{
  size: UserAvatarSize;
}>`
  border-radius: 222rem;
  object-fit: cover;
  object-position: center;

  width: ${({ size }) => {
    switch (size) {
      case "large":
        return "6rem";

      case "medium":
        return "4rem";

      case "small":
        return "2.4rem";
    }
  }};
  aspect-ratio: 1 / 1;
`;
