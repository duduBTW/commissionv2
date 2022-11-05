import UserAvatar from "components/user/avatar";
import Link from "next/link";
import * as g from "styles/globalStyles";
import * as s from "./styles";

const AristHeader = () => {
  return (
    <g.container variant="content">
      <s.banner
        src="https://pbs.twimg.com/profile_banners/838395700131946500/1658481774/1500x500"
        alt=""
      />
      <UserAvatar
        src="https://pbs.twimg.com/profile_images/1554662305052315649/88VUtMxF_400x400.jpg"
        alt="Avatar misuo"
        size="large"
      />
      <s.user_name variant="title-02">misuo (ミソグ)</s.user_name>
    </g.container>
  );
};

export const AristHeaderDense = () => {
  return (
    <Link href="/artist/1/portfolio">
      <s.arist_header_dense_container>
        <UserAvatar
          src="https://pbs.twimg.com/profile_images/1554662305052315649/88VUtMxF_400x400.jpg"
          alt="Avatar misuo"
          size="medium"
        />
        <s.dense_user_name variant="title-04">misuo (ミソグ)</s.dense_user_name>
      </s.arist_header_dense_container>
    </Link>
  );
};

export default AristHeader;
