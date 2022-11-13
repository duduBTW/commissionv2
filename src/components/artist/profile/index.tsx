// components
import PortfolioGrid from "components/portfolio/grid";
import CommissionsGrid from "components/commission/grid";

// styles
import * as t from "components/tabs";
import * as s from "./styles";
import services from "service";

const ArtistProfile = ({ defaultValue }: { defaultValue: string }) => {
  const handleValueChange = (value: string) =>
    window.history.replaceState(window.history.state, "", `${value}`);
  const { data } = services.useCommissionList();

  return (
    <t.root defaultValue={defaultValue} onValueChange={handleValueChange}>
      <s.container variant="transparent">
        <t.list>
          <t.trigger value="commissions">Commissions</t.trigger>
          <t.trigger value="portfolio">Portfolio</t.trigger>
        </t.list>
        <t.content value="portfolio">
          <PortfolioGrid />
        </t.content>
        <t.content value="commissions">
          {data && (
            <CommissionsGrid href="/artist/1/commission/" commissions={data} />
          )}
        </t.content>
      </s.container>
    </t.root>
  );
};

export default ArtistProfile;
