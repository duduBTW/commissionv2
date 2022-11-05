import * as s from "./styles";

const ArtistCard = () => {
  return (
    <s.container>
      <s.cover src="https://pbs.twimg.com/profile_banners/162625616/1637971734/1500x500" />
      <s.userAvatar src="https://pbs.twimg.com/profile_images/1381641804496297985/dR6pHY3S_400x400.jpg" />
      <s.userName variant="title-04">望月けい</s.userName>
    </s.container>
  );
};

export default ArtistCard;
