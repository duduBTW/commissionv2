import * as portfolioCommission from "./artist/portfolio";
import * as artistCommission from "./artist/commission";
import * as adminOrder from "./admin/order";
import * as order from "./artist/order";
import * as artistStore from "./artist/store";
import * as commission from "./admin/commission";
import * as portfolio from "./admin/portfolio";
import * as adminContract from "./admin/contract";
import * as adminStore from "./admin/store";
import * as profile from "./profile";
import * as profileOrder from "./profile/order";
import * as artist from "./artist";

const services = {
  admin: {
    ...commission,
    ...portfolio,
    ...adminOrder,
    ...adminContract,
    ...adminStore,
  },
  artist: {
    ...artistCommission,
    ...portfolioCommission,
    ...order,
    ...artistStore,
  },
  profile: {
    ...profile,
    ...profileOrder,
  },
  ...artist,
};

export default services;
