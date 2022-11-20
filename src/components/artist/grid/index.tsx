import { ArtistListItemSchema } from "service/artist";

// styles
import * as s from "./styles";

// components
import Typography from "components/typography";
import ArtistCard from "../card";

const ArtistGrid = ({
  label,
  artists,
}: {
  label?: string;
  artists: ArtistListItemSchema[];
}) => {
  return (
    <>
      {label ? <Typography variant="subtitle-01">{label}</Typography> : null}
      <s.grid>
        {artists.map((artist) => (
          <ArtistCard {...artist} key={artist.id} />
        ))}
      </s.grid>
    </>
  );
};

export default ArtistGrid;
