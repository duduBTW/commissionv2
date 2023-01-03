import Link from "next/link";
import * as s from "./styles";

const ArtistCard = ({
  id,
  banner,
  profilePicture,
  userName,
}: {
  id: string;
  userName: string | null;
  profilePicture: string | null;
  banner: string | null;
}) => {
  return (
    <Link passHref href={`/artist/${id}/commissions`}>
      <s.container>
        {banner ? <s.cover src={banner} /> : <s.cover_placeholder />}
        <s.userAvatar src={profilePicture ?? ""} />
        <s.userName variant="title-04">{userName}</s.userName>
      </s.container>
    </Link>
  );
};

export default ArtistCard;
