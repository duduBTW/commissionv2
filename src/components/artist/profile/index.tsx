// components
import PortfolioGrid from "components/portfolio/grid";
import CommissionsGrid from "components/commission/grid";

// styles
import * as Tabs from "@radix-ui/react-tabs";
import * as t from "components/tabs";
import * as g from "styles/globalStyles";

const ArtistProfile = ({ defaultValue }: { defaultValue: string }) => {
  const Container = g.container.withComponent(Tabs.Root);

  const handleValueChange = (value: string) =>
    window.history.replaceState(window.history.state, "", `${value}`);

  return (
    <Container defaultValue={defaultValue} onValueChange={handleValueChange}>
      <t.list>
        <t.trigger value="commissions">Commissions</t.trigger>
        <t.trigger value="portfolio">Portfolio</t.trigger>
      </t.list>
      <PortfolioGrid />
      <CommissionsGrid />
    </Container>
  );
};

export default ArtistProfile;
