// styles
import * as s from "./styles";

export type UserAvatarSize = "small" | "default" | "medium" | "large";
interface Props extends React.ImgHTMLAttributes<HTMLImageElement> {
  size?: UserAvatarSize;
}

const UserAvatar = ({ size = "medium", src, ...imgProps }: Props) => {
  return (
    <s.styledAvatar
      size={size}
      src={src ?? "/waifu-placeholder.png"}
      {...imgProps}
    />
  );
};

export default UserAvatar;
