// styles
import * as s from "./styles";

export type UserAvatarSize = "small" | "medium" | "large";
interface Props extends React.ImgHTMLAttributes<HTMLImageElement> {
  size?: UserAvatarSize;
}

const UserAvatar = ({ size = "medium", ...imgProps }: Props) => {
  return <s.styledAvatar size={size} {...imgProps} />;
};

export default UserAvatar;
