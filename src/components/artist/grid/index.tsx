// styles
import * as s from "./styles";

// components
import Typography from "components/typography";
import ArtistCard from "../card";

const ArtistGrid = ({ label }: { label?: string }) => {
  return (
    <>
      {label ? <Typography variant="subtitle-01">{label}</Typography> : null}
      <s.grid>
        <ArtistCard />
      </s.grid>
    </>
  );
};

export default ArtistGrid;
