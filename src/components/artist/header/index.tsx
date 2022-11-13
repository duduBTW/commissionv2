// components
import Container from "components/container";
import UserAvatar from "components/user/avatar";
import Link from "next/link";

// styles
import * as s from "./styles";

const AristHeader = () => {
  return (
    <Container variant="content">
      <Banner />
      <UserAvatar
        src="https://pbs.twimg.com/profile_images/1586703300279554050/l6_h_Az1_400x400.jpg"
        alt="Avatar misuo"
        size="large"
      />
      <s.user_name variant="title-02">misuo (ミソグ)</s.user_name>
    </Container>
  );
};

interface BannerProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  noMargin?: boolean;
}
export const Banner = (props: BannerProps) => {
  return (
    <s.banner
      src="https://pbs.twimg.com/profile_banners/838395700131946500/1658481774/1500x500"
      {...props}
      alt=""
    />
  );
};

export const AristHeaderDense = ({ hrefBack }: { hrefBack: string }) => {
  return (
    <Link href={hrefBack} passHref>
      <s.arist_header_dense_container>
        <UserAvatar
          src="https://pbs.twimg.com/profile_banners/838395700131946500/1658481774/1500x500"
          alt="Avatar misuo"
          size="medium"
        />
        <s.dense_user_name variant="title-04">misuo (ミソグ)</s.dense_user_name>
      </s.arist_header_dense_container>
    </Link>
  );
};

export default AristHeader;
