import Typography from "components/typography";
import { useCategorys, useSelectedTab, useContent } from "..";

// styles
import * as s from "./styles";

const CategorysSidebar = () => {
  const { data: categorys } = useCategorys();
  const [selectedTab] = useSelectedTab();
  const [contentMap] = useContent();
  const getVariant = (id: string) => {
    const isSelected = id === selectedTab;
    const isFilled = Boolean(contentMap[id]);

    if (isSelected) {
      return "selected";
    }

    if (isFilled) {
      return "filled";
    }

    return "default";
  };

  const getColor = (id: string) => {
    const variant = getVariant(id);

    switch (variant) {
      case "selected":
        return "primary.main";

      case "filled":
        return "success.main";

      default:
        return "text.40";
    }
  };

  if (!categorys) return <></>;
  return (
    <s.container>
      {categorys.map((category) => {
        const variant = getVariant(category.id);
        const color = getColor(category.id);

        return (
          <s.item value={category.id} key={category.id}>
            <s.indicator variant={variant} />
            <Typography color={color}> {category.name} </Typography>
          </s.item>
        );
      })}

      <s.item value="finish">
        <s.indicator variant={getVariant("finish")} />
        <Typography color={getColor("finish")}> Dados pessoais </Typography>
      </s.item>
    </s.container>
  );
};

export default CategorysSidebar;
