// components
import Container from "components/container";
import UserAvatar from "components/user/avatar";
import Link from "next/link";

// styles
import * as s from "./styles";

const AristHeader = ({
  banner,
  profilePicture,
  userName,
}: {
  id: string;
  banner: string;
  profilePicture: string;
  userName: string;
}) => {
  return (
    <Container variant="content">
      <Banner noMargin={false} src={banner} alt={`${userName} banner`} />
      <UserAvatar src={profilePicture} alt="Avatar misuo" size="large" />
      <s.user_name variant="title-02">{userName}</s.user_name>
    </Container>
  );
};

interface BannerProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  noMargin?: boolean;
}
export const Banner = ({ src, ...props }: BannerProps) => {
  if (!src) return <s.banner_placeholder {...props} />;

  return <s.banner src={src} {...props} />;
};

export const AristHeaderDense = ({
  hrefBack,
  userName,
  profilePicture,
}: {
  hrefBack: string;
  userName: string;
  profilePicture: string;
}) => {
  return (
    <Link href={hrefBack} passHref>
      <s.arist_header_dense_container>
        <UserAvatar src={profilePicture} alt="Avatar misuo" size="medium" />
        <s.dense_user_name variant="title-04">{userName}</s.dense_user_name>
      </s.arist_header_dense_container>
    </Link>
  );
};

export default AristHeader;
