import services from "service";

// components
import * as tabs from "components/tabs";
import PortfolioGrid from "components/portfolio/grid";
import CommissionsGrid from "components/commission/grid";

// styles
import * as s from "./styles";

const ArtistProfile = ({
  selectedTab,
  artistId,
}: {
  selectedTab: string;
  artistId: string;
}) => {
  const handleValueChange = (value: string) =>
    window.history.replaceState(window.history.state, "", `${value}`);
  const { data: commissions } = services.artist.useCommissionList(artistId);
  const { data: portfolio } = services.artist.usePortfolioList(artistId);
  const hasPortfolio = portfolio && Boolean(portfolio.length > 0);
  const hasCommissions = commissions && Boolean(commissions.length > 0);

  return (
    <tabs.root defaultValue={selectedTab} onValueChange={handleValueChange}>
      <s.container variant="transparent">
        <tabs.list>
          <tabs.trigger value="commissions">Commissions</tabs.trigger>
          <tabs.trigger value="portfolio">Portfolio</tabs.trigger>
        </tabs.list>
        <tabs.content value="portfolio">
          {hasPortfolio ? (
            <s.tab_content>
              <PortfolioGrid artistId={artistId} portfolio={portfolio} />
            </s.tab_content>
          ) : (
            <s.not_found variant="title-04" color="text.60">
              Nenhum item no portfolio （；´д｀）ゞ
            </s.not_found>
          )}
        </tabs.content>
        <tabs.content asChild value="commissions">
          {hasCommissions ? (
            <CommissionsGrid
              href={`/artist/${artistId}/commission/`}
              commissions={commissions}
            />
          ) : (
            <s.not_found variant="title-04" color="text.60">
              Nenhuma commission ( ＞﹏＜ )
            </s.not_found>
          )}
        </tabs.content>
      </s.container>
    </tabs.root>
  );
};

export default ArtistProfile;
