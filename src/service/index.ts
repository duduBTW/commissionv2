import * as portfolioCommission from "./artist/portfolio";
import * as artistCommission from "./artist/commission";
import * as commission from "./admin/commission";
import * as portfolio from "./admin/portfolio";
import * as profile from "./profile";
import * as artist from "./artist";

const services = {
  admin: {
    ...commission,
    ...portfolio,
  },
  artist: {
    ...artistCommission,
    ...portfolioCommission,
  },
  ...profile,
  ...artist,
};

export default services;
