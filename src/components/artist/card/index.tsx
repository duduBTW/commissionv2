import Link from "next/link";
import * as s from "./styles";

const ArtistCard = ({
  id,
  banner,
  profilePicture,
  userName,
}: {
  id: string;
  banner?: string;
  profilePicture: string;
  userName: string;
}) => {
  return (
    <Link href={`/artist/${id}/commissions`}>
      <a>
        <s.container>
          {banner ? <s.cover src={banner} /> : <s.cover_placeholder />}
          <s.userAvatar src={profilePicture} />
          <s.userName variant="title-04">{userName}</s.userName>
        </s.container>
      </a>
    </Link>
  );
};

export default ArtistCard;
