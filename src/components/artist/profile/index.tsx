// components
import PortfolioGrid from "components/portfolio/grid";
import CommissionsGrid from "components/commission/grid";

// styles
import * as t from "components/tabs";
import * as s from "./styles";
import services from "service";

const ArtistProfile = ({
  defaultValue,
  artistId,
}: {
  defaultValue: string;
  artistId: string;
}) => {
  const handleValueChange = (value: string) =>
    window.history.replaceState(window.history.state, "", `${value}`);
  const { data: commissions } = services.artist.useCommissionList(artistId);
  const { data: portfolio } = services.artist.usePortfolioList(artistId);

  return (
    <t.root defaultValue={defaultValue} onValueChange={handleValueChange}>
      <s.container variant="transparent">
        <t.list>
          <t.trigger value="commissions">Commissions</t.trigger>
          <t.trigger value="portfolio">Portfolio</t.trigger>
        </t.list>
        <t.content value="portfolio">
          {portfolio && (
            <PortfolioGrid artistId={artistId} portfolio={portfolio} />
          )}
        </t.content>
        <t.content value="commissions">
          {commissions && (
            <CommissionsGrid
              href={`/artist/${artistId}/commission/`}
              commissions={commissions}
            />
          )}
        </t.content>
      </s.container>
    </t.root>
  );
};

export default ArtistProfile;
